<template>
	<div class="flex-1 act-sec box-con">
		<p class="com-title bg-pri">绑定或修改手机号码</p>
		<p class="tip line-h-25">手机号码是系统登录时可使用的用户名或找回密码，为了您的账户安全，请先填写您的登录密码后修改手机号码。</p>
		<div class="set-phone bg-white">
			<div class="steps clearfix">
				<div :class="step=='1'?'current step step1':'step step1'">
					<span>1</span>
					<p>验证登录密码</p>
				</div>
				<div :class="step=='2'?'current step step2':'step step2'">
					<span>2</span>
					<p>输入新的手机号</p>
				</div>
				<div :class="step=='3'?'current step step3':'step step3'">
					<span>3</span>
					<p>设置成功</p>
				</div>
			</div>
			<p class="tip">手机号变更后，您的联系信息均变化。</p>
			<el-form v-if="this.step == '1'" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>							
					<el-col :span="10" :offset="7">
						<el-form-item label="登录密码" prop="password">
							<el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="">
							<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-form v-if="this.step == '2'" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-row>							
					<el-col :span="12" :offset="6">							
						<el-row>
							<el-col :span="20">
								<el-form-item label="新手机号码:" prop="mobile">
									<el-input v-model="ruleForm2.mobile"  placeholder="请输入手机号码"></el-input>
									<p class="el-form-item__error" v-show="mobileIsEixt">该手机号已存在！</p>	
								</el-form-item>								
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="验证码:" prop="code">
									<el-input v-model="ruleForm2.code" :maxlength="6"  placeholder="请输入验证码"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<!--<el-form-item label="">-->
									<el-button type="" v-if="show_time" class="code-time">重新获取({{this.count}}s)</el-button>
									<el-button type="warning" v-else class="get-code" @click="get_code">获取验证码</el-button>									
								<!--</el-form-item>-->
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="">
									<el-button type="primary"  @click="submitForm2('ruleForm2')">确定</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-form>
			<div v-if="this.step == '3'" class="set-mob-suc"><span>设置手机号成功</span></div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {setCookie} from '@/assets/commjs/util.js'
	
	export default{
		data(){
			return{
        		mobileIsEixt: false,				
				step: '1',
				show_time: false,
				count: 120,
				ruleForm: {
					password: ''
				},
				ruleForm2: {
					mobile: '',
					code: ''
				},
				rules: {
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				rules2: {				
					
					mobile:[
						{ required: true, message: '请输入手机号', trigger: 'blur'},
						{validator:(rule,value,callback)=>{
			                if(/^^1[34578]\d{9}$/.test(value) == false){
			                    callback(new Error("请输入正确的手机号"));
			                }else{
			                    callback();
			                }
			            }, trigger:'blur'}
					],
					code: [
						{ required: true, message: '请输入验证码', trigger: 'blur' }
					]
				}
			}
		},
		watch: {
			['ruleForm2.mobile'](val) {
        		this.mobileIsEixt = false;				
				if(/^^1[34578]\d{9}$/.test(val) == true){
					this.$http.get(this.$root.urlPath.MJK + '/account/mobileIsEixt?mobile='+this.ruleForm2.mobile).then(function(res){
        				if(res.body.data){
        					this.mobileIsEixt = true;
        				}
        			},function(){
        				
        			})
				}
			}
		},
		methods: {
			submitForm: function(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            const params = {
		            	pwd: this.ruleForm.password
		            };
		            this.$http.get(this.$root.urlPath.MJK+'/account/validatePwd',{params:params}).then(function(res){
		            	if(res.body.success){
		            		this.step = "2";
		            	}else{
		            		this.$message({
					          	showClose: true,
					          	message: res.body.errMsg,
					          	type: 'error'
					        });
		            	}
		            },function(res){
		            	
		            })
		          } else {
		            console.log('error submit!!');
		            return false;
		          }
		        });
		    },
		    get_code: function(){//验证码倒计时
		    	console.log(1)
		    	if(!this.ruleForm2.mobile||this.mobileIsEixt){
		    		return false
		    	}
        		var self = this;
        		var count = this.count;
        		this.$http.get(this.$root.urlPath.MJK+'/common/getSmsPre?type=4&mobile='+this.ruleForm2.mobile).then(function(res){
        			if (res.body.success) {
        				setCookie('MC_SMS', res.body.data)
        				this.$http.get(this.$root.urlPath.MJK + '/common/sms?type=4&mobile='+this.ruleForm2.mobile).then(function(res){
        					if(res.body.success){
		        				this.show_time = true
		        			}else{
		        				this.$message({
						          	showClose: true,
						          	message: res.body.errMsg,
						          	type: 'error'
						        })
		        			}
        				})
        			}
        		},function(res){        			
        		})
//      		this.$http.get(this.$root.urlPath.MJK+'/common/sms?type=4&mobile='+this.ruleForm2.mobile).then(function(res){
//      			if(res.body.success){
//      				this.show_time = true;
//      			}else{
//      				this.$message({
//				          	showClose: true,
//				          	message: res.body.errMsg,
//				          	type: 'error'
//				        });      				
//      			}
//      		},function(res){     			
//      		})
        		var time = setInterval(function(){
        			self.time = count;
        			Vue.set([self.time],'time',count)
        			count--
        			if(count<1){
        				count = 120;
        				self.show_time = false;
        				clearInterval(time);
        			}
        			self.count = count;
        		},1000)
        	},
        	submitForm2 : function(formName){
        		this.$refs[formName].validate((valid) => {
        			if(valid){
		        		const params = {
		        			mobile : this.ruleForm2.mobile,
		        			msgCode : this.ruleForm2.code		        		}
		        		this.$http.get(this.$root.urlPath.MJK+'/account/updateMobile?',{params:params}).then(function(res){
		        			if(res.body.success){
		        				this.step = "3";
		        			}else{
		        				this.$message({
						          	showClose: true,
						          	message: res.body.errMsg,
						          	type: 'error'
						        });
		        			}
		        		},function(res){
		        			
		        		})
	        		} else {
	        			console.log('error submit!!');
	        			return false;
	        		}
        		})
        	}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>