<template>
	<div>
		<mc-header></mc-header>	
		<div class="login" v-loading="loading">	
			<div class="pt-20 pb-20">
				<div class="container pd-0">
					<div class="dis-tab full-w">
						<div class="dis-tabc vert-m col-sm-2 col-xs-3 pull-none">
							<a href="http://www.miningcircle.com">
								<img src="static/img/reg/logo.png" alt="">								
							</a>
						</div>
						<div class="dis-tabc vert-m col-sm-10 col-xs-9 pull-none">
							<div class="reg-tit pl-20 clearfix mb-0">
								<span class="f-20 pull-left mt-10 f-w">{{ $t('reg.welcome') }}</span>
								<div class="pull-right text-right hidden-xs">			
									<p class="line-h-30 mb-0 f-16">{{ $t('reg.hotline') }} 400-010-0456</p>
									<p class="mb-0 col-999">{{ $t('reg.worktime') }} 8:00-19:00</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="login-con">
				<div class="container">
					<div class="row">
						<div class="col-sm-6 login-con-l text-center hidden-xs">
							<p class=" col-white"><span class="f-16">欢迎加入矿业圈</span><span class="f-w f-22 pl-10">互联网+矿业=矿业圈</span></p>
							<p style="color: #fff45c" class="f-32 f-w pt-10"><span style="padding-right:29px">打造</span><span>万亿产业交易平台</span></p>
							<p style="color: #fff45c" class="f-32 f-w">提供全球矿业互联网服务</p>
						</div>
						<div class="col-sm-6 login-con-r">
							<form action="" class="login-form overflow-h" @submit.prevent="submit" v-if="!way">
								<div class="login-switch"><span class="mob-tip">手机验证码快速登录</span><span class="mobile" @click="loginSwitch"></span></div>
								<p class="clearfix mb-10"><span class="pull-left f-20">{{ $t('reg.login.viplogin') }}</span></p>
								<label class="pos-r full-w mb-10">
									<span class="icon name"></span>
									<input type="text" class="ipt-text mb-5" :placeholder="$t('placeholder.act_placeh')" v-model="userinfo.user" name="user">
										<span class="col-red mb-0 pt-5" v-show="userError">请输入正确用户名</span>
								</label>
								
								<label class="pos-r full-w mb-10">
									<span class="icon password"></span>
									<input type="password" class="ipt-text mb-5" :placeholder="$t('placeholder.pwd')" v-model="userinfo.password" name="password" >
										<span class="col-red mb-0 pt-5" v-show="passError">请输入密码</span>	
								</label>
								<label class="checkbox mt-0 mb-15" style="font-weight: normal;"><input type="checkbox" v-model ="rememberUser" name="rememberPwd"><i></i><span class="pl-20">{{ $t('reg.login.remember') }}</span><a href="/reg" class="pull-right col-pri">立即注册</a><a href="/forget" class="pull-right col-pri mr-10">{{ $t('reg.login.forget') }}</a>
								</label>
								<div class="dis-fl" v-if="show_code">
									<div class="reg-form-r mr-5">
										<input type="text" class="ipt-text pd-5 code" placeholder="请输入验证码" v-model="userinfo.code">
										<span class="col-red pt-5 inline-block" v-show="codeError">请输入验证码</span>	
									</div>
									<div class="reg-form-r ml-10">
										<img class="login-code-img" :src="this.code_url" alt="" @click="reset_code">
									</div>
								</div>
								<div class="mt-15">
									<button :disabled="disable" class="login-btn bg-pri f-20">{{ $t('header.login') }}</button>
								</div>
							</form>
							<form action="" class="login-form overflow-h mobile-login" @submit.prevent="submit2" v-else>
								<div class="login-switch"><span class="pc" @click="loginSwitch"></span></div>
								<p class="clearfix mb-10"><span class="pull-left f-20">手机登录</span></p>
								<label class="pos-r full-w mb-10">
									<span class="icon name"></span>
									<input type="text" class="ipt-text mb-5" placeholder="请输入手机号" v-model="mobinfo.mobile" name="user">
									<span class="col-red mb-0 pt-5" v-show="mobError">请输入正确手机号</span>
								</label>							
								<div class="dis-fl mb-10">
									<label class="pos-r full-w">
										<span class="icon password"></span>
										<input type="text" v-model="mobinfo.msgcode" name="msg_code" class="ipt-text" placeholder="请输入短信验证码">
										<p class="col-red mb-0 mt-5 pl-5" v-show="msgError">请输入短信验证码</p>										
									</label>
									<div class="ml-10">
										<input type="button" value="获取验证码" class="pd-5 bg-pri get-code" v-on:click = 'get_code' v-show="show_time">
										<input type="button" :value="'重新发送('+count+'S)'" class="pd-5 get-code-again" v-show="!show_time">
									</div>
								</div>
								<label class="checkbox mt-0 mb-15" style="font-weight: normal;"><input type="checkbox" v-model ="rememberUser" name="rememberPwd"><i></i><span class="pl-20">{{ $t('reg.login.remember') }}</span><a href="/reg" class="pull-right col-pri">立即注册</a><a href="/login" class="pull-right col-pri mr-10">账号登录</a>
								</label>
								<div class="dis-fl" v-if="show_code">
									<div class="reg-form-r mr-5">
										<input type="text" class="ipt-text pd-5 code" placeholder="请输入验证码" v-model="userinfo.code">
										<span class="col-red pt-5 inline-block" v-show="codeError">请输入验证码</span>	
									</div>
									<div class="reg-form-r ml-10">
										<img class="login-code-img" :src="this.code_url" alt="" @click="reset_code">
									</div>
								</div>
								<div class="mt-15">
									<button :disabled="disable" class="login-btn bg-pri f-20">{{ $t('header.login') }}</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
		<mc-footer></mc-footer>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VueResource from 'vue-resource';
	Vue.use(VueResource);
	import {setCookie} from '@/assets/commjs/util.js';
	import {getCookie} from '@/assets/commjs/util.js';
	
	var time = null;	
	
	export default{
		data (){
			return{
				toUrl: '',//登录页回跳
				way: false, //登录方式
				show_time: true,
				rememberUser: false,
				disable: false,
				userinfo:{
					user: null,
					password: null,
					code: null
				},
				count : 120,
				loading: false,
				msgError : false,
				mobError : false,
				mobinfo:{//手机号找回
            		mobile: '',
	                msgcode: ''
            	},
				userError : false,
				passError : false,
				codeError : false,
				show_code : false,//是否出现验证码
				code_url : '',
				mc_cap: ''
			}
		},
		created(){
			this.getCaptcha();
			if(getCookie('MC_UID')){
				window.location.href = 'http://www.miningcircle.com';
			}
			if(getCookie('user')){
				this.userinfo.user = getCookie('user');
			}
			this.toUrl = this.$route.query.redirectTo
		},
		watch: {
			['userinfo.user'](){
        		this.userError = this.userinfo.user.length >0? false : true;
        	},
        	['userinfo.password'](){
        		this.passError = this.userinfo.password.length >0? false : true;
			},
			['mobinfo.mobile'](){
        		var mobile = /^1[34578]\d{9}$/;
        		this.mobError = this.mobinfo.mobile.length == 11 && mobile.test(this.mobinfo.mobile)? false : true;
        	},
        	['mobinfo.msgcode'](){
        		this.msgError = this.mobinfo.msgcode.length >0? false : true;
			}
       },
        methods:{
        	submit: function(){
        		this.userError = this.userinfo.user ? false : true;
				this.passError = this.userinfo.password ? false : true;
        		this.codeError = this.userinfo.code ? false : true;   
        		
				if(!this.userError && !this.passError){				
					this.disable = true;
					this.loading = true;
					const params = {account: this.userinfo.user,pwd: this.userinfo.password,captcha: this.userinfo.code,MC_CAPTCHA: this.mc_cap}
					this.$http.post(this.$root.urlPath.MJK+'/login',params).then(function(res){
						this.loading = false;						
						this.disable = false;
						if(res.body.success){
							setCookie('MC_UID', res.body.data)
							if(this.rememberUser){//设置记住用户名和密码
								setCookie("user",this.userinfo.user,7);
							}
							if(this.toUrl){
								window.location.href = this.toUrl;
							}else{
								window.location.href = document.referrer;
							}							
						}else{
							this.reset_code();
							this.login_code();
							this.$message({
								showClose: true,
						        message: res.body.errMsg,
						        type: 'error',
					        });
						}
					},function(res){
						this.disable = false;
						this.loading = false;												
					})
				}
       		},	
       		submit2: function(){
        		this.mobError = this.mobinfo.mobile.length == 11 && /^1[34578]\d{9}$/.test(this.mobinfo.mobile)? false : true;
				this.msgError = this.mobinfo.msgcode ? false : true;		   		
				if(!this.mobError&&!this.msgError){
					this.disable = true;
					const params = {account: this.mobinfo.mobile,msgCode: this.mobinfo.msgcode}
					this.$http.post(this.$root.urlPath.MJK+'/quickLogin?',params).then(function(res){
						this.disable = false;
						if(res.body.success){
							setCookie('MC_UID', res.body.data)
							if(this.rememberUser){//设置记住用户名和密码
								setCookie("user",this.userinfo.user,7);
							}	
							if(this.toUrl){
								window.location.href = this.toUrl;
							}else{
								window.location.href = document.referrer;
							}
						}else{
							this.$message({
								showClose: true,
						        message: res.body.errMsg,
						        type: 'error',
					        });
						}
					},function(res){
						this.disable = false;
					})
				}
       		},	
       		loginSwitch: function() {
       			this.way = !this.way
       		},
       		get_code: function(){//验证码倒计时
    			if(!this.mobinfo.mobile||this.mobError){
        			return false;
        		}
        		var self = this;
        		if(time){        			
        			window.clearInterval(time);
					this.count = 120;      		
        		}   
        		var count = this.count;
        		this.show_time = false;
        		this.$http.get(this.$root.urlPath.MJK+'/common/getSmsPre?type=1&mobile='+this.mobinfo.mobile).then(function(res){
        			if (res.body.success) {
        				setCookie('MC_SMS', res.body.data)
        				this.$http.get(this.$root.urlPath.MJK + '/common/sms?type=1&mobile='+this.mobinfo.mobile).then(function(res){
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
    		login_code: function(){
    			this.$http.get(this.$root.urlPath.MJK+'/showLoginCaptcha?account='+this.userinfo.user).then(function(res){
    				console.log(res.data.data);
    				if(res.data.data){
    					this.show_code = true;
    				}
    			},function(res){
    				
    			})
    		},
    		getCaptcha: function(){
        		this.$http.get(this.$root.urlPath.MJK+'/common/getCaptchaPre?type=1').then(function (res) {
	        		if (res.body.success) {
        				this.mc_cap = res.body.data;       				
						this.code_url = this.$root.urlPath.MJK+'/common/captcha?type=1&MC_CAPTCHA=' + this.mc_cap
	        		}
	        	})
        	},
    		reset_code: function(){//刷新验证码
        		this.getCaptcha()
        	}
        }
	}
</script>

<style lang="css">  
      @import '../../../static/css/reg/reg.css';
</style>  
