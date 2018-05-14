<template>
	<div>
		<mc-header></mc-header>
		<div class="forget">
			<div class="bor-b-ccc pt-20 pb-20">
				<div class="container pd-0">
					<div class="dis-tab full-w">
						<div class="dis-tabc vert-m col-sm-2 col-xs-3 pull-none">
							<a href="http://www.miningcircle.com">								
								<img src="static/img/reg/logo.png" alt="">
							</a>
						</div>
						<div class="dis-tabc vert-m col-sm-10 col-xs-9 pull-none">
							<p class="reg-tit pl-20 clearfix mb-0"><span class="f-20 pull-left f-w">找回密码</span><span class="pull-right line-h-30">我已有账户，<a href="/login" class="col-pri">点此登录</a></span></p>
						</div>
					</div>
				</div>
			</div>
			<div class="form-out overflow-h">
				<div class="">
					<div class="forget-form" v-if="step == '1'">
						<p class="col-pri tit f-24 mb-20">找回密码</p>
						<el-row class="mb-15">
							<el-col :span="18" :offset="3">						
							  	<el-radio v-model="way" class="pull-left way" label="1">手机找回</el-radio>
	  							<el-radio v-model="way" class="pull-right way" label="2">邮箱找回</el-radio>
							</el-col>
						</el-row>	
						<div v-show="way == 1">						
							<label class="pos-r full-w mb-15">
								<span class="icon name"></span>
								<input type="text" v-model="setinfo.mobile" name="iphone" class="ipt-text" placeholder="请您输入您注册的手机号">
								<p class="col-red mb-0 mt-5 pl-5" v-show="mobError">请输入正确手机号</p>
								<p class="col-red mb-0 mt-5 pl-5" v-show="mobileIsEixt">该手机号尚未注册！</p>								
							</label>
							
							<div class="dis-fl mb-10">
								<label class="pos-r full-w">
									<span class="icon password"></span>
									<input type="text" v-model="setinfo.msgcode" name="msg_code" class="ipt-text" placeholder="请输入短信验证码">
									<p class="col-red mb-0 mt-5 pl-5" v-show="msgError">请输入短信验证码</p>										
								</label>
								<div class="ml-10">
									<input type="button" value="获取验证码" class="ipt-text pd-5 bg-pri get-code" v-on:click = 'get_code' v-show="show_time">
									<input type="button" :value="'重新发送('+count+'S)'" class="ipt-text pd-5 get-code-again" v-show="!show_time">
								</div>
							</div>
							<div class="dis-fl mb-15">
								<label class="pos-r full-w">
									<span class="icon code"></span>
									<input type="text" v-model="setinfo.code" name="code" class="ipt-text" placeholder="请输入图形验证码" maxlength="4">
									<p class="col-red mb-0 mt-5 pl-5" v-show="codeError">请输入图形验证码</p>																			
								</label>
								<div class="ml-10">
									<img class="code-img" :src="this.code_url" alt="">
								</div>
									<span class=" change-code col-pri cur-p" v-on:click="reset_code">看不清<br>换一张</span>
							</div>
							<p class="hint">温馨提示 : 如果没有收到短信，请稍后再试</p>
							<div>
								<button :disabled="disable" type="submit" class="login-btn bg-pri f-20" @click="sub">提交</button>
							</div>
						</div>
						<div v-show="way == 2">
							<label class="pos-r full-w mb-10">
								<span class="icon name"></span>
								<input type="text" v-model="setinfo3.email" name="eamil" class="ipt-text" placeholder="请您输入您绑定的邮箱">
								<p class="col-red mb-0 mt-5 pl-5" v-show="emailError">请输入您绑定的邮箱 </p>	
							</label>
							<div class="dis-fl mb-10">
								<label class="pos-r full-w">
									<span class="icon code"></span>
									<input type="text" v-model="setinfo3.code3" name="code3" class="ipt-text" placeholder="请输入图形验证码" maxlength="4">
									<p class="col-red mb-0 mt-5 pl-5" v-show="code3Error">请输入图形验证码</p>																			
								</label>
								<div class="ml-5">
									<img class="code-img" :src="this.code_url" alt="">
								</div>
									<span class=" change-code col-pri cur-p" v-on:click="reset_code">看不清<br>换一张</span>
							</div>
							<div>
								<button :disabled="disable" type="submit" class="login-btn bg-pri f-20" @click="sub3">提交</button>
							</div>
						</div>
					</div>
					<div class="forget-form" v-else>
						<p class="col-pri tit f-24">重置密码</p>
						<label class="pos-r full-w mb-10">
							<span class="icon password"></span>
								<el-tooltip placement="right" effect="light">		
									<div slot="content">密码长度为6~21个字符，包含<br />数字字母，不能为纯数字、纯字母</div>
									<input type="password" v-model="setinfo2.pwd" name="iphone" class="ipt-text" placeholder="请输入新密码">
								</el-tooltip>
							<p class="col-red mb-0 mt-5 pl-5" v-show="pwdError">请输入正确的新密码</p>	
						</label>
						
						<div class="dis-fl mb-5">
							<label class="pos-r full-w">
								<span class="icon password"></span>
									<input type="password" v-model="setinfo2.pwd2" name="msg_code" class="ipt-text" placeholder="请再次输入密码">
								<p class="col-red mb-0 mt-5 pl-5" v-show="pwd2Error">请再次输入新密码</p>										
							</label>
						</div>
						<div>
							<button :disabled="disable" type="submit" class="login-btn bg-pri f-20" @click="sub2">提交</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {setCookie} from '@/assets/commjs/util.js';
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	var time = null;	
	export default {
        data () {
            return {
            	way: '1',//找回密码的方式
            	step: '1',
            	disable: false,       	
            	show_time: true,
            	count : 120,
            	code_url: '',
            	setinfo:{//手机号找回
            		mobile: '',
	                msgcode: '',
	                code: ''
            	},
                mobError : false,
        		mobileIsEixt: false,
				msgError : false,
				codeError : false,
            	setinfo2:{
            		pwd: '',
	                pwd2: ''
            	},
            	pwdError : false,
            	pwd2Error : false,
            	setinfo3:{//邮箱找回
            		mobile: '',
	                code3: ''
            	},
            	emailError : false,
				code3Error : false,
				mc_cap: ''
            }
        },
        created () {
        	this.getCaptcha()
        },
        watch: {
			['setinfo.mobile'](){
				this.mobileIsEixt = false;
        		var mobile = /^1[34578]\d{9}$/;
        		this.mobError = this.setinfo.mobile.length == 11 && mobile.test(this.setinfo.mobile)? false : true;
        		if(!this.mobError){
        			this.$http.get(this.$root.urlPath.MJK + '/account/mobileIsEixt?mobile='+this.setinfo.mobile).then(function(res){
        				if(!res.body.data){
        					this.mobileIsEixt = true;
        				}
        			},function(){
        				
        			})
        		}
        	},
        	['setinfo.msgcode'](){
        		this.msgError = this.setinfo.msgcode.length >0? false : true;
			},
			['setinfo.code'](){
        		this.codeError = this.setinfo.code.length >0? false : true;
			},
			['setinfo2.pwd'](){
				var pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        		this.pwdError = this.setinfo2.pwd.length >0 && pwd.test(this.setinfo2.pwd)? false : true;
			},
			['setinfo2.pwd2'](){
        		this.pwd2Error = this.setinfo2.pwd2.length >0? false : true;
			},
			['setinfo3.email'](){
				var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        		this.emailError = email.test(this.setinfo3.email)>0? false : true;
			},
			['setinfo3.code3'](){
        		this.code3Error = this.setinfo3.code3.length >0? false : true;
			},
       },
       methods:{
        	sub: function(){
        		this.mobError = this.setinfo.mobile.length == 11 && /^1[34578]\d{9}$/.test(this.setinfo.mobile)? false : true;
				this.msgError = this.setinfo.msgcode ? false : true;
        		this.codeError = this.setinfo.code ? false : true;  		   		
				if(!this.mobError&&!this.msgError&&!this.codeError){
					this.disable = true;
					const params = {mobile: this.setinfo.mobile,msgCode: this.setinfo.msgcode,captcha: this.setinfo.code,type: 0,MC_CAPTCHA: this.mc_cap}
					this.$http.post(this.$root.urlPath.MJK+'/account/mobile?',params).then(function(res){
						this.disable = false;
						this.reset_code();
						if(res.body.success){
							this.step = "2";
//							this.$router.push({path:'/user/user_index'});
						}else{
							if(res.body.errCode == '001001148'){
								this.show_time = true;						
							}
							this.$message({
					          	showClose: true,
					          	message: res.body.errMsg,
					          	type: 'error'
					      	});
						}
					},function(res){
						this.disable = false;
					})
				}
       		},	
    		get_code: function(){//验证码倒计时
    			if(!this.setinfo.mobile||this.mobError||this.mobileIsEixt){
        			return false;
        		}
        		var self = this;
        		if(time){        			
        			window.clearInterval(time);
					this.count = 120;      		
        		}   
        		var count = this.count;
        		this.show_time = false;
        		this.$http.get(this.$root.urlPath.MJK+'/common/getSmsPre?type=2&mobile='+this.setinfo.mobile).then(function(res){
        			if (res.body.success) {
        				setCookie('MC_SMS', res.body.data)
        				this.$http.get(this.$root.urlPath.MJK + '/common/sms?type=2&mobile='+this.setinfo.mobile).then(function(res){
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
        				count = 5;
        				self.show_time = true;
        				clearInterval(time);
        			}
        			self.count = count;
        		},1000)
        	},
        	getCaptcha(){
        		this.$http.get(this.$root.urlPath.MJK+'/common/getCaptchaPre?type=2').then(function (res) {
	        		if (res.body.success) {
        				this.mc_cap = res.body.data      				
						this.code_url = this.$root.urlPath.MJK+'/common/captcha?type=2&MC_CAPTCHA=' + this.mc_cap
	        		}
	        	})
        	},
    		reset_code: function(){//刷新验证码
        		this.getCaptcha()
        	},
    		sub2: function(){
				this.pwdError = this.setinfo2.pwd ? false : true;
        		this.pwd2Error = this.setinfo2.pwd2 ? false : true;   		   		
				if(!this.pwdError&&!this.pwd2Error){
					this.disable = true;
					const params = {account: this.setinfo.mobile,pwd: this.setinfo2.pwd}
					this.$http.post(this.$root.urlPath.MJK+'/account/resetPwd?',params).then(function(res){
						this.disable = false;
						console.log(res);
						if(res.body.success){
							this.$message({
					          	showClose: true,
					          	message: '设置密码成功',
					          	type: 'success'
					        });
							this.$router.push({path:'/login'});
						}else{
							this.$message({
					          	showClose: true,
					          	message: res.body.errMsg,
					          	type: 'error'
					       	});
						}
					},function(res){
						this.disable = false;
					})
				}
       		},
	       	sub3: function(){
	    		this.emailError =  /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.setinfo3.email)? false : true;
	    		console.log(this.emailError)
	    		this.code3Error = this.setinfo3.code3 ? false : true;  		   		
				if(!this.emailError&&!this.code3Error){
					this.disable = true;
					const params = {email: this.setinfo3.email ,captcha: this.setinfo3.code3,MC_CAPTCHA: this.mc_cap}
					this.$http.post(this.$root.urlPath.MJK+'/account/pwdEmail',params).then(function(res){
						this.disable = false;
						this.reset_code();
						if(res.body.success){
							this.$message({
					          	showClose: true,
					          	message: '邮件已发送',
					          	type: 'success'
					       });
						}else{
							this.$message({
					          	showClose: true,
					          	message: res.body.errMsg,
					          	type: 'error'
					       	});
						}
					},function(res){
						this.disable = false;
					})
				}
	   		},	
        }
	}

</script>

<style lang="css">
	@import '/static/css/reg/reg.css' 
</style>