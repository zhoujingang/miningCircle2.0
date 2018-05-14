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
							<p class="reg-tit pl-20 clearfix mb-0" v-show="func == 'findpwd'">
								<span class="f-20 pull-left f-w">找回密码</span>
								<span class="pull-right line-h-30">我已有账户，<a href="/login" class="col-pri">点此登录</a></span>
							</p>
							<p class="reg-tit pl-20 clearfix mb-0" v-show="func == 'bind'">
								<span class="f-20 pull-left f-w">绑定邮箱</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="form-out overflow-h">				
				<div class="forget-form" v-if="show_reset">
					<p class="col-pri tit f-24">重置密码</p>
					<label class="pos-r full-w mb-10">						
						<span class="icon password"></span>
						<el-tooltip placement="right" effect="light">		
							<div slot="content">密码长度为6~21个字符，包含<br />数字字母，不能为纯数字、纯字母</div>						
							<input type="password" v-model="setinfo2.pwd" name="iphone" class="ipt-text" placeholder="请输入新密码">
						</el-tooltip>							
						<p class="col-red mb-0 mt-5 pl-5" v-show="pwdError">请输入正确的密码</p>	
					</label>
					<div class="dis-fl mb-5">
						<label class="pos-r full-w">
							<span class="icon password"></span>
							<input type="password" v-model="setinfo2.pwd2" name="msg_code" class="ipt-text" placeholder="请再次输入密码">
							<p class="col-red mb-0 mt-5 pl-5" v-show="pwd2Error">请再次输入新密码</p>										
						</label>
					</div>
					<div>
						<button :disabled="disable" type="submit" class="login-btn bg-pri f-20" @click="sub">提交</button>
					</div>
				</div>
				<div v-else class="pd-20 text-center f-24">
					{{show_txt}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				func: '',//邮箱验证来自哪里，邮箱重置密码，修改邮箱等等。。
				show_reset: false,//是否显示重置密码
				show_txt: '',//错误提示
				setinfo: {
					mobile: ''
				},
				setinfo2:{
            		pwd: '',
	                pwd2: ''
            	},
            	pwdError : false,
            	pwd2Error : false,
            	disable: false
			}
		},
		watch: {
			['setinfo2.pwd'](){
				var pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        		this.pwdError = this.setinfo2.pwd.length >0 && pwd.test(this.setinfo2.pwd)? false : true;
			},
			['setinfo2.pwd2'](){
        		this.pwd2Error = this.setinfo2.pwd2.length >0? false : true;
			},
		},
		created() {
			var params = {
				func : this.$route.query.func,
				validateInfo : this.$route.query.validateInfo
			}
			this.func = params.func;
			if(params.func == 'findpwd'){		
				this.$http.get(this.$root.urlPath.MJK+'/account/email',{params:params}).then(function(res){
					if(res.body.success){
						this.setinfo.mobile = this.$route.query.email;
						this.show_reset = true;
					}else{
						this.show_txt = res.body.errMsg;
					}
				},function(){
				
				})
			} else if(params.func == 'bind'){
				this.$http.get(this.$root.urlPath.MJK+'/account/email',{params:params}).then(function(res){
					if(res.body.success){
						this.show_txt = '设置成功';
					}else{
						this.show_txt = res.body.errMsg;
					}
				},function(){
				
				})
			}
 		},
		methods: {
			sub: function(){
				this.pwdError = this.setinfo2.pwd ? false : true;
        		this.pwd2Error = this.setinfo2.pwd2 ? false : true;   		   		
				if(!this.pwdError&&!this.pwd2Error){
					this.disable = true;
					const params = {account: this.setinfo.mobile,pwd: this.setinfo2.pwd}
					this.$http.post(this.$root.urlPath.MJK+'/account/resetPwd?',params).then(function(res){
						this.disable = false;
						console.log(res);
						if(res.body.success){
//							alert('设置成功')
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
		}
	}
</script>

<style>
	@import '/static/css/reg/reg.css' 
</style>