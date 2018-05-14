<template>
	<div class="flex-1 act-sec box-con">
		<p class="com-title bg-pri">修改登录密码</p>
		<p class="tip line-h-25">密码是系统登录时使用的，为了您的账户安全，请先填写您的登录密码后修改密码。</p>
		<div class="set-phone bg-white">
			<div class="steps clearfix">
				<div :class="step=='1'?'current step step1':'step step1'">
					<span>1</span>
					<p>验证登录密码</p>
				</div>
				<div :class="step=='2'?'current step step2':'step step2'">
					<span>2</span>
					<p>重置登录密码</p>
				</div>
				<div :class="step=='3'?'current step step3':'step step3'">
					<span>3</span>
					<p>重置成功</p>
				</div>
			</div>
			<p v-if="step == '1'" class="tip">您在使用“登录密码”进行校验</p>
			<el-form v-if="this.step == '1'" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-row>							
					<el-col :span="10" :offset="7">
						<el-form-item label="登录密码" prop="password">
							<el-input type="password" v-model="ruleForm.password"  placeholder="请输入密码"></el-input>
						</el-form-item>
						<el-form-item label="">
							<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-form v-if="step == '2'" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				<el-col :span="10" :offset="7">
					<el-form-item label="矿业账号">
						<el-input  placeholder="请输入账号" v-model="userName" disabled></el-input>
					</el-form-item>
					<el-form-item label="输入新密码" prop="newPwd">
						<el-tooltip placement="right" effect="light">
  							<div slot="content">密码长度为6~21个字符，包含<br />数字字母，不能为纯数字、纯字母</div>
							<el-input type="password"  placeholder="请输入密码" v-model="ruleForm2.newPwd"></el-input>
						</el-tooltip>
					</el-form-item>
					<el-form-item label="确认新密码" prop="confirmPwd">
						<el-input type="password" placeholder="请确认密码" v-model="ruleForm2.confirmPwd"></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="submitForm2('ruleForm2')">确定</el-button>
					</el-form-item>
				</el-col>
			</el-form>
			<div v-if="step == '3'" class="set-mob-suc">
				<span>重置密码成功</span>
				<p>{{count}}s后自动跳转登录页，<a href="/login" class="col-pri">去登录</a></p>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	import { mapState } from 'vuex'
	import {setCookie} from '@/assets/commjs/util.js'
	import {delCookie} from '@/assets/commjs/util.js'
	
	import {reg} from '@/assets/commjs/validator.js'
	
	export default{
		data(){
			var validatePass2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.ruleForm2.newPwd) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		     };
			return{
				step: '1',
				count: 5,
				ruleForm: {
					password: ''
				},
				rules: {
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				ruleForm2: {
					account: '',
					newPwd: '',
					confirmPwd: ''
				},				
				rules2: {
					newPwd: [
					    { required: true, message: '请输入新的密码', trigger: 'blur' },
					    { validator: reg.pwd , trigger: 'change' },
					],
					confirmPwd: [
						{ required: true, message: '请再次输入密码', trigger: 'blur' },
						{ validator: validatePass2, message: '两次密码不一致', trigger: 'blur'}
					]
				}
			}
		},
		computed: mapState({
			userName: state => state.userInfo.userName
		}),
		methods: {
			submitForm(formName) {
		        this.$refs[formName].validate((valid) => {
		          if (valid) {
		            const params = {
		            	pwd: this.ruleForm.password
		            };
		            this.$http.get(this.$root.urlPath.MJK+'/account/validatePwd?',{params:params}).then(function(res){
		            	console.log(res);
		            	if(res.body.success){
		            		this.step = "2"
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
		    submitForm2 :function(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
						const params = {
		        			pwd : this.ruleForm2.newPwd,
		        		}
						this.$http.get(this.$root.urlPath.MJK+'/account/updatePwd?',{params:params}).then(function(res){
							console.log(res.body);
							if(res.body.success){
								var self = this;
								this.step = "3";
								var count = this.count;
								delCookie('MC_PC_UID');//删除cookie
								var time = setInterval(function(){
				        			self.time = count;
				        			Vue.set([self.time],'time',count)
				        			count--
				        			if(count<1){
				        				clearInterval(time);
				        				self.$router.push({path:'/login'});
				        			}
				        			self.count = count;
				        		},1000)
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
			}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>