<template>
	<div class="flex-1 act-sec box-con">
		<p class="com-title bg-pri">绑定或修改邮箱</p>
		<p class="tip line-h-25">邮件是系统登录时可使用的用户名或找回密码，为了您的账户安全，请先填写您的登录密码后绑定/修改邮件。</p>
		<div class="set-email-form clearfix">
			<el-form v-if="this.step == '1'" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-col :span="10" :offset="7">
					<el-form-item label="原电子邮箱" required v-show="email_or">
						<el-input  placeholder="请输入邮箱" v-model="ruleForm.oldEmail"></el-input>
					</el-form-item>
					<el-form-item label="新电子邮箱" prop="newEmail">
						<el-input  placeholder="请输入邮箱" v-model="ruleForm.newEmail"></el-input>
					</el-form-item>
					<el-form-item label="登录密码" prop="pwd">
						<el-input  placeholder="请输入密码" type="password" v-model="ruleForm.pwd"></el-input>
					</el-form-item>
					<el-form-item label="">
						<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
					</el-form-item>
				</el-col>
			</el-form>
			<div v-if="this.step == '2'" class="set-mob-suc"><span>验证码已发送至邮箱,请前往邮箱验证</span></div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {reg} from '@/assets/commjs/validator.js'
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	export default{
		data(){
			return{
				step: '1',
				email_or: '',
				ruleForm: {
					oldEmail: '',
					newEmail: '',
					pwd: ''
				},
				rules: {
					oldEmail: [
					    {validator: reg.email, message: '请输入正确的邮箱地址', trigger: 'blur,change' }
					],
					newEmail: [
					    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
					    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
					],
					pwd: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				}
			}
		},
		created(){
			const params = {}
			this.$http.get(this.$root.urlPath.MJK+'/account/safetyInfo',{params:params}).then(function(res){
				if(res.body.success){
					if(res.body.data.email){
						this.email_or = true
					};
	
				}
			},function(res){
				
			})
		},
		methods: {
			submitForm :function(formName){
				this.$refs[formName].validate((valid) => {
					if(valid){
//						const params = {
//		        			oldEmail : this.ruleForm.oldEmail,
//		        			newEmail : this.ruleForm.newEmail,
//		        			pwd : this.ruleForm.pwd
//		        		}
						this.$http.post(this.$root.urlPath.MJK+'/account/bindEmail',this.ruleForm).then(function(res){
							console.log(res.body);
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
			}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>