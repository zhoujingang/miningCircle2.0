<template>
	<div>
		<mc-header></mc-header>	
	    <div class="reg">	
			<div class="bor-b-ccc pt-20 pb-20">
				<div class="container pd-0">
					<div class="dis-tab full-w">
						<div class="dis-tabc vert-m col-sm-2 col-xs-3 pull-none">
							<a href="http://www.miningcircle.com">								
								<img src="static/img/reg/logo.png" alt="">
							</a>
						</div>
						<div class="dis-tabc vert-m col-sm-10 col-xs-9 pull-none">
							<p class="reg-tit pl-20 clearfix mb-0"><span class="f-20 pull-left f-w">{{$t('header.reg')}}</span><span class="pull-right line-h-30">{{$t('reg.reg.have_act')}}<a href="/login" class="col-pri">{{$t('header.login')}}</a></span></p>
						</div>
					</div>
				</div>
			</div> 
			<div class="container">				
				<div class="reg-form overflow-h" id="register">
					<label class="dis-fl mb-15">
						<div class="reg-form-l pr-10">{{$t('reg.mobile')}}</div>
						<div class="reg-form-r">
							<input type="tel" class="ipt-text tel needed" :placeholder="$t('placeholder.mobile')"  v-model.trim="userinfo.tel">
							<p class="col-red mb-0 mt-5 pl-5" v-show="telError">请输入正确手机号</p>
							<p class="col-red mb-0 mt-5 pl-5" v-show="mobileIsEixt">该手机号已注册！</p>	
								
						</div>
					</label>
					<label class="dis-fl mb-15">
						<div class="reg-form-l pr-10">{{ $t('reg.msgcode') }}</div>
						<div class="mr-5">
							<input type="text" class="ipt-text code-input needed" :placeholder="$t('placeholder.msgcode')" v-model="userinfo.msg_code" maxlength="6">
								<p class="col-red mb-0 mt-5 pl-5" v-show="msg_codeError">请输入短信验证码</p>	
						</div>
						<div class="ml-5 code-btn">
							<input type="button" :value="$t('comm.get_code')" class="ipt-text get-code" v-on:click = 'get_code' v-show="show_time">
							<input type="button" :value="'重新发送('+count+'S)'" class="ipt-text pd-5 get-code-again" v-show="!show_time">
						</div>
					</label>
					<label class="dis-fl mb-15">
						<div class="reg-form-l pr-10">{{$t('reg.set_pwd')}}</div>
						<div class="reg-form-r">
							<el-tooltip placement="right" effect="light">
								<div slot="content">密码长度为6~21个字符，包含<br />数字字母，不能为纯数字、纯字母</div>
								<input type="password" id="password" :placeholder="$t('placeholder.setpwd')" class="ipt-text pd-5 needed" v-model.trim="userinfo.password">
							</el-tooltip>
							<!--<p class="col-666 f-12 mb-0 mt-5">(密码长度为6~21个字符，包含数字字母，不能为纯数字、纯字母)</p>-->
							<p class="col-red mb-0 mt-5 pl-5" v-show="passError">请输入合理的密码</p>							
						</div>
					</label>
					<label class="dis-fl mb-15">
						<div class="reg-form-l pr-10">{{$t('reg.confirm_pwd')}}</div>
						<div class="reg-form-r">
							<input type="password" class="ipt-text pd-5 needed" :placeholder="$t('placeholder.confirmpwd')" v-model.trim="userinfo.confirm_pass">
								<p class="col-red mb-0 mt-5 pl-5" v-show="con_passError">输入密码不一致</p>
						</div>
					</label>
					<label class="dis-fl mb-15">
						<div class="reg-form-l pr-10">{{$t('reg.email')}}</div>
						<div class="reg-form-r">
							<input type="text"  class="ipt-text pd-5" :placeholder="$t('placeholder.email')" v-model.trim="userinfo.email">
							<p class="col-red mb-0 mt-5 pl-5" v-show="emailError">请输入正确的邮箱</p>
						</div>
					</label>
					<label class="dis-fl mb-5">
						<div class="reg-form-l pr-10">{{ $t('reg.captcha') }}</div>
						<div class="mr-5 img-code">
							<input type="text" class="ipt-text pd-5" placeholder="请输入图形验证!" v-model="userinfo.code" maxlength="4">
							<p class="col-red mb-0 mt-5 pl-5" v-show="codeError">输入验证码</p>
						</div>
						<div class="ml-5">
							<img class="reg-code-img" :src="code_url" alt="">
							<span class="pull-right change-code col-pri cur-p" v-on:click="reset_code">看不清<br>换一张</span>
						</div>
					</label>
					<div class="pd-5">
						<label class="checkbox pos-r mt-0">
							<input type="checkbox" v-model="userinfo.agree"><i></i>我已阅读并同意 			
							<a target="_blank" style="color: #2da5da;" href="http://www.miningcircle.com/static/help_agreement_new.html">《矿业圈网站服务协议》
							</a>	
							<p class="col-red mb-0 mt-5" v-show="agreeError">请同意以上协议</p>
						
						</label>
					</div>
					<div class="mt-10">
						<button :disabled="disable"  class="sub ipt-text bg-pri" @click="sub">{{$t('header.reg')}}</button>
					</div>
				</div>
			</div>
		</div>
		<mc-footer></mc-footer>
		<!--<tit-layer :layer_show="this.layer"></tit-layer>-->
	</div>
</template>
<script>
	import Vue from 'vue';
	import {setCookie, getCookie} from '@/assets/commjs/util.js';
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	
	var time = null;	
    export default {
        data () {
        	return{
        		mobileIsEixt: false,
        		disable: false,
        		userinfo: {
        			tel: '',
        			msg_code: '',
        			password: '',
        			confirm_pass: '',
        			email: '',
        			code: '',
        			agree: false
    			},
    			telError: false,
    			msg_codeError: false,
    			passError: false,			
    			con_passError: false,
    			emailError: false,
    			codeError: false,
    			agreeError: false,
    			code_url: '',
    			count : 120,
    			show_time: true,
    			layer: {
    				or : false,
    				txt : '',
    				type : ''
    			},
    			mc_cap: ''
        	}         
        },
        created (){   
        	this.getCaptcha()
        },
        watch: {
        	['userinfo.tel'](){
        		this.mobileIsEixt = false;
        		var mobile = /^1[34578]\d{9}$/;
        		this.telError = this.userinfo.tel.length == 11 && mobile.test(this.userinfo.tel)? false : true;
        		if(!this.telError){
        			this.$http.get(this.$root.urlPath.MJK + '/account/mobileIsEixt?mobile='+this.userinfo.tel).then(function(res){
        				if(res.body.data){
        					this.mobileIsEixt = true;
        				}
        			},function(){
        				
        			})
        		}
        	},
        	['userinfo.msg_code'](){
        		this.msg_codeError = this.userinfo.msg_code.length >0? false : true;
        	},
        	['userinfo.password'](){
        		var pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        		this.passError = this.userinfo.password.length >0 && pwd.test(this.userinfo.password)? false : true;
        	},
        	['userinfo.confirm_pass'](){
        		this.con_passError = (this.userinfo.confirm_pass === this.userinfo.password)? false : true;
        	},
        	['userinfo.email'](){
        		var email = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/; 
        		this.emailError = email.test(this.userinfo.email)||this.userinfo.email ==''? false : true;
        	},
        	['userinfo.code'](){
        		this.codeError = this.userinfo.code.length>0? false : true;
        	},
        	['userinfo.agree'](){
        		this.agreeError = this.userinfo.agree? false : true;
        	}
        },
        methods:{
        	sub: function(){
        		this.telError = this.userinfo.tel.length == 11 && /^1[34578]\d{9}$/.test(this.userinfo.tel)? false : true;
        		this.msg_codeError = this.userinfo.msg_code.length >0? false : true;
        		this.passError = this.userinfo.password.length >0? false : true;
        		this.con_passError = (this.userinfo.confirm_pass === this.userinfo.password)? false : true;
        		this.codeError = this.userinfo.code.length>0? false : true;
        		this.agreeError = this.userinfo.agree? false : true;
				if(!this.telError&&!this.msg_codeError&&!this.passError&&!this.con_passError&&!this.emailError&&!this.codeError&&!this.agreeError){
					
					this.disable = true;
					const params = {
						mobile: this.userinfo.tel,
						msgCode: this.userinfo.msg_code,
						pwd: this.userinfo.password,
						repwd: this.userinfo.confirm_pass,
						email: this.userinfo.email,
						captcha: this.userinfo.code,
						MC_CAPTCHA: this.mc_cap
					}
					this.$http.post(this.$root.urlPath.MJK+'/register?',params).then(function(res){
						this.disable = false;
						this.reset_code();
						if(res.body.success){
							this.$message({
					          	showClose: true,
					          	message: '恭喜您，注册成功',
					          	type: 'success'
					      	});
							this.$router.push('/login')
						}else{
							if(res.body.errCode == '001004003'){
								this.show_time = true;						
							}
							this.$message({
					          	showClose: true,
					          	message: res.body.errMsg,
					          	type: 'error'
					      	});
						}
					},function(res){						
					})
				}
        	},
        	getCaptcha: function(){
        		this.$http.get(this.$root.urlPath.MJK+'/common/getCaptchaPre?type=0').then(function (res) {
	        		if (res.body.success) {
        				this.mc_cap = res.body.data      				
						this.code_url = this.$root.urlPath.MJK+'/common/captcha?type=0&MC_CAPTCHA=' + this.mc_cap
	        		}
	        	})
        	},
        	get_code: function(){//验证码倒计时
        		if(!this.userinfo.tel||this.telError||this.mobileIsEixt){
        			return false;
        		}
        		var self = this;
        		if(time){        			
        			window.clearInterval(time);
					this.count = 120;      		
        		}       		
        		var count = this.count;
        		this.show_time = false;       				this.$http.get(this.$root.urlPath.MJK+'/common/getSmsPre?type=0&mobile='+this.userinfo.tel).then(function(res){
        			if (res.body.success) {
        				setCookie('MC_SMS', res.body.data)
        				this.$http.get(this.$root.urlPath.MJK+'/common/sms?type=0&mobile='+this.userinfo.tel).then(function(res){
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
        				self.show_time = true;
        				clearInterval(time);
        			}
        			self.count = count;
        		},1000)
        	},
        	reset_code: function(){//刷新验证码
   				this.getCaptcha()
        	}
        }
    }
</script>
<style lang="css">
	@import '../../../static/css/reg/reg.css'     
</style>  