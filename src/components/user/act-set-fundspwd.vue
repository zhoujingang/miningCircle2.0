<template>
	<div class="flex-1 act-sec box-con">
		<p class="com-title bg-pri">修改资金密码</p>
		<!--<p class="tip line-h-25">邮件是系统登录时可使用的用户名或找回密码，为了您的账户安全，请先填写您的登录密码后绑定/修改邮件。</p>-->
		<div class="set-pwd clearfix set-phone">
			<div class="steps clearfix">
				<div :class="step=='1'?'current step step1':'step step1'">
					<span>1</span>
					<p>验证用户身份</p>
				</div>
				<div :class="step=='2'?'current step step2':'step step2'">
					<span>2</span>
					<p>修改或设置资金密码</p>
				</div>
				<div :class="step=='3'?'current step step3':'step step3'">
					<span>3</span>
					<p>设置成功</p>
				</div>
			</div>
			<p v-if="step == '1'" class="tip">需要通过手机号验证您的身份</p>
			<el-form v-if="this.step == '1'" :model="ruleForm1" :rules="rules1" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
				<el-row>							
					<el-col :span="12" :offset="6">							
						<el-row>
							<el-col :span="20">
								<el-form-item label="手机号码:">
									<el-input v-model="mobile" readonly  placeholder="请输入手机号码"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4" class="pt-5" v-show="!mobile">
								<router-link to="/user/act_security/act_set_phone" class="col-pri ml-15 line-h-25">去绑定</router-link>								
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="短信验证码:" prop="msgCode">
									<el-input v-model="ruleForm1.msgCode" placeholder="请输入短信验证码" :maxlength="6"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
									<el-button type="" v-show="show_time" class="code-time">重新获取({{this.count}}s)</el-button>
									<el-button type="warning" v-show="!show_time" class="get-code" @click="get_code">获取验证码</el-button>									
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="图形验证码:" prop="captcha">
									<el-input v-model="ruleForm1.captcha" :maxlength="4" placeholder="请输入图形验证码"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<!--<el-form-item label="">-->
									<img class="ml-15" style="width:102px;max-width:none;height: 36px;" :src="imgCode" alt="" @click="reset_code"/>								
								<!--</el-form-item>-->
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="20">
								<el-form-item label="">
									<el-button type="primary"  @click="submitForm('ruleForm1')">确定</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</el-col>
				</el-row>
			</el-form>
			<el-form v-if="step == '2'" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-col :span="10" :offset="7">
					<!--<el-form-item label="输入旧密码" prop="oldPwd" v-if="isFundsPwd">
						<el-input type="password"  placeholder="请输入旧密码" v-model="ruleForm2.oldPwd"></el-input>
					</el-form-item>-->
					<el-form-item label="输入新密码" prop="assetPwd">
						<el-tooltip placement="right" effect="light">
							<div slot="content">密码长度为6~21个字符，包含<br />数字字母，不能为纯数字、纯字母</div>							
							<el-input type="password"  placeholder="请输入新密码" v-model="ruleForm2.assetPwd"></el-input>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="确认新密码" prop="confirmPwd">
						<el-input type="password" placeholder="请确认新密码" v-model="ruleForm2.confirmPwd"></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="submitForm2('ruleForm2')">确定</el-button>
					</el-form-item>
				</el-col>
			</el-form>
			<div v-if="step == '3'" class="set-mob-suc">
				<span>设置资金密码成功</span>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {setCookie} from '@/assets/commjs/util.js';
	import {reg} from "@/assets/commjs/validator.js";
	var time = null;	
	
	export default{
		data(){
			var confirmPwd = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm2.assetPwd) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		     };
			return{
				step: '1',
				imgCode: '',//图形验证码
				count : 120,
				show_time: false,
				mobile: '',
				mc_cap: '',
				ruleForm1: {
					mobile: '',
					captcha: '',
					msgCode: ''
				},
				ruleForm2: {
					assetPwd: '',
					confirmPwd: ''
				},
				rules1: {
					captcha: [
					    { required: true, message: '请输入图形验证码', trigger: 'blur' }
					],
					msgCode: [
						{ required: true, message: '请输入短信验证码', trigger: 'blur' }
//						{ maxlength: true, message: '请输入短信验证码', trigger: 'blur' }						
					]
				},
				rules2: {
					assetPwd: [
						{ required: true, message: '请输入新密码', trigger: 'blur' },
					    { validator: reg.pwd , trigger: 'change' }						
					],
					confirmPwd: [
						{ required: true, message: '请输入新密码', trigger: 'blur' },
						{ validator: confirmPwd, message:'输入密码不一致', trigger: 'change'}
					]
				}
			}
		},
		created() {
			this.getCaptcha()
			this.$http.get(this.$root.urlPath.MJK+'/account/safetyInfo').then(function(res){
				if(res.body.success){
					var mobile = res.body.data.mobile;
					this.mobile = mobile.substring(3,0)+'****'+mobile.substring(7);
					this.ruleForm1.mobile = mobile;
				}
			},function(res){
				
			})
		},
		methods: {
			submitForm :function(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						const params = Object.assign(this.ruleForm1, {
							MC_CAPTCHA: this.mc_cap
						})
						this.$http.get(this.$root.urlPath.MJK + '/account/mobile?type=1',{params:params}).then(function(res){
							this.reset_code();
							if(res.body.success){
		        				this.step = '2';
		        			}else{
		        				if(res.body.errCode == '001001148'){
									this.show_time = false;						
								}
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
			submitForm2 :function(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						const params = this.ruleForm2;
						this.$http.post(this.$root.urlPath.MJK + '/account/bindUserAssetPwd',params).then(function(res){
							if(res.body.success){
								this.step = '3';
							}else{
								this.$message({
						          	showClose: true,
						          	message: res.body.errMsg,
						          	type: 'error'
						        });
							}
						},function(res){
							
						})
					}
				})
			},
			get_code() {
				console.log(this.show_time)
				if(!this.ruleForm1.mobile){
        			return false;
        		}
        		var self = this;
        		if(time){        			
        			window.clearInterval(time);
					this.count = 120;      		
        		}   
        		var count = this.count;
        		this.show_time = true;
        		this.$http.get(this.$root.urlPath.MJK+'/common/getSmsPre?type=5&mobile='+this.ruleForm1.mobile).then(function(res){
        			if (res.body.success) {
        				setCookie('MC_SMS', res.body.data)
        				this.$http.get(this.$root.urlPath.MJK + '/common/sms?type=5&mobile='+this.ruleForm1.mobile).then(function(res){
        					console.log(res)
        				})
        			}
        		},function(res){        			
        		})
        		time = setInterval(function(){
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
			getCaptcha(){
        		this.$http.get(this.$root.urlPath.MJK+'/common/getCaptchaPre?type=6').then(function (res) {
	        		if (res.body.success) {
        				this.mc_cap = res.body.data           				
						this.imgCode = this.$root.urlPath.MJK+'/common/captcha?type=6&MC_CAPTCHA=' + this.mc_cap
	        		}
	        	})
        	},
			reset_code() {//刷新验证码
        		this.getCaptcha()
        	}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>