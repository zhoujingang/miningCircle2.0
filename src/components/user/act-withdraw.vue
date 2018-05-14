<template>
	<div class="flex-1 main-right">
		<div class="vouc_sec">
			<p class="tit">提现</p>
			<div class="con withdraw">
				<p class="tit-head overflow-h f-16"><span v-if="isBank == 0" class="col-pri mr-20">提取余额到银行卡</span><span>账户余额：</span><span class="f-18 col-pri">{{accountData.availableBalance}}</span>元<router-link v-if="isBank == 0" to="add_bank" class="pull-right btn-add"><span class="btn add_bankcrad">添加银行卡</span></router-link></p>
				<div class="pay_con">
					<label class="pay clearfix f-18">
						<span>提现金额:</span><input v-model="money" maxlength="25" class="ipt-text"/>元
					</label>
					<p v-show="numError" class="col-red" style="margin-left: 140px;">请输入正确的提现金额!</p>					
					<p style="margin-left: 140px;" class="col-999 mt-20">第三方收取提现手续费：千分之一点五（1.5‰），单笔最小手续费2元/笔</p>
					<p class="withdraw p2"><span class="span1">提现费用:</span><span class="span2">{{cost}}</span>&nbsp;元<span class="span3">（提现手续费是由第三方平台收取）</span></p>
					<p class="pay_all mt-20"><span class="span1">实际提现金额:</span><span class="span2">{{realMoney}}</span>&nbsp;元</p>
					<p class="pay_all mt-20 mb-20"><span class="span1">预计到账日期:</span><span class="ml-20">预计1-2个工作日内到账 ( 双休日和法定节假日 ) </span></p>
					<label class="pay clearfix f-18">
						<span>资金密码:</span><input autocomplete="new-password" type="password" maxlength="25" v-model="pwd" class="ipt-text" :disabled="isFundsPwd"/><router-link to="/user/act_security/act_set_fundspwd" class="col-pri ml-10" v-show="isFundsPwd">去设置</router-link>
					</label>
					<p v-show="pwdError" class="col-red" style="margin-left: 140px;">请输入提现密码!</p>
					<label class="pay clearfix f-18" v-show="isCaptcha">
						<span>验证码:</span><input autocomplete="new-password" type="password" maxlength="4" v-model="code" class="ipt-text"/>
						<img class="code-img" :src="code_url" alt="">
						<span class="change-code col-pri cur-p" v-on:click="reset_code">看不清<br>换一张</span>
					</label>
					<p v-show="codeError" class="col-red" style="margin-left: 140px;">请输入图形验证码!</p>
					
				</div>
				<div class="text-center"><button class="btn" id="voucher" @click="withdraw">提现</button></div>
				<p class="text-tip">因为受银行系统兼容性的限制，某些银行提现只能在 Windows 操作系统操作，建议使用特定版本的IE浏览器（一般是IE6以上、IE10以下）。
同时，请留意银行网上银行页面的提示，如确定提现数额是否超过银行卡的转账额度限制等。</p>
				<div class="dis-fl attentions f-16">
					<div class="left">温馨提示</div>
					<div class="flex-1 tips f-14">
						<p>1. 请确保您输入的提现金额，以及银行账号信息准确无误。</p> 
						<p>2. 如果您填写的提现信息不正确可能会导致提现失败，由此产生的提现费用将不予返还。</p>
						<p>3. 在双休日和法定假日期间，用户可以申请提现，矿业圈会在下一个工作日进行处理。由此造成的不便，请多多谅解！</p>
						<p>4. 平台禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止改账户的使用 </p>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import Vue from 'vue';
	export default{
		data(){
			return{
				isBank: '',//是否添加了银行卡
				isFundsPwd: '',//是否有资金密码
				isCaptcha: false,//是否显示验证码
				code_url: this.$root.urlPath.MJK+'/common/captcha?type=4' + new Date().getTime(),
				loading: false,
				money: '',
				pwd: '',
				code: '',
				numError: false,			
				pwdError: false,
				codeError: false,
				accountData:{
					'mcCurrency':0,//矿业币
					'availableBalance':0,//可用余额
					'total':0//总额
				}
			}
		},
		created(){
			this.showCaptcha() 
			this.$http.get(this.$root.urlPath.MJK+'/account/account?status=0').then(function(res){
				if(res.body.success){
					this.accountData.availableBalance = res.body.data.availableBalance;
				}
			},function(res){
				
			});
			this.$http.get(this.$root.urlPath.MJK + '/rechargecash/checkBankCard').then(function(res){//是否有银行卡
				if(res.body.success){
					this.isBank = res.body.data;
				}
			});
			this.$http.get(this.$root.urlPath.MJK+ '/account/userAssetIsExit').then(function(res){//是否有资金密码
				if(res.body.success){
					this.isFundsPwd = !res.body.data
				}
			},function(res){
				
			})
			console.log(this.isFundsPwd)
			
			
		},
		computed: {
			cost() {//提现费用	
				if(this.money*0.0015>2){
					return this.money*0.0015;					
				}else if(this.money>2){
					return 2;
				}else{
					return 0;
				}
			},
			realMoney() {//实际提现
				if(this.money>=2){
					return Number(this.money) - this.cost;					
				}
			}
		},
		watch: {
			money() {
				var number = /^[0-9]*$/;
				this.numError = number.test(this.money)? false : true;
				this.numError = Number(this.money)>=2? false : true;				
			},
			pwd() {
				this.pwdError = this.pwd? false : true;
			},
			code() {
				this.codeError = this.code? false : true;
			}
		},
		methods: {
			showCaptcha() {//是否显示验证码
				this.$http.get(this.$root.urlPath.MJK+ '/rechargecash/showVerificationCapt?status=0').then(function(res){
					if(res.body.success){
						this.isCaptcha = res.body.data;
					}
				},function(){
					
				})
			},
			withdraw() {
				this.numError = this.money? false : true;
				this.pwdError = this.pwd? false : true;
				if(this.isCaptcha){
					this.codeError = this.code? false : true;			
				}
				if(this.numError||this.pwdError||this.codeError){
					
				}else{				
					this.$http.get(this.$root.urlPath.MJK+ '/rechargecash/withdrawals?status=0&moneyVal=' + this.money + '&pwd=' + this.pwd + '&captcha='+ this.code).then(function(res){
						if(res.body.success){
							this.$message({
								showClose: true,
								message: '恭喜您，提现成功',
								type: 'success'
							})
						}else{
							this.$message({
								showClose: true,
								message: res.body.errMsg,
								type: 'error'
							})
							this.showCaptcha();
						}
					},function(){
						
					})
				}
			},
			reset_code: function(){//刷新验证码
        		var timeNow = new Date().getTime(); 
   				this._data.code_url = this.$root.urlPath.MJK+"/common/captcha?type=4&time="+timeNow
        	}
		}
	}
</script>

<style>
	  @import '../../../static/css/user/user.css'; 
</style>