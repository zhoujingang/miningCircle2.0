<template>
	<div class="flex-1 main-right">
		<div class="vouc_sec">
			<p class="tit">填写充值金额</p>
			<div class="con" v-loading="loading">
				<p class="p1">账户可用余额：<span>¥:{{accountData.availableBalance}}</span></p>
				<div class="pay_con">
					<label class="pay clearfix f-24">
						<span>充值金额:</span><input v-model="money" maxlength="20" class="ipt-text"/>元
					</label>
					<p v-show="numError" class="col-red" style="margin-left: 140px;">请输入正确的充值金额!</p>
					<p class="p2"><span class="span1">充值费用:</span><span class="span2">0.00</span>&nbsp;元<span class="span3">（充值手续费是由第三方平台收取，暂由平台垫付）</span></p>
					<p class="pay_all mt-20"><span class="span1">实际支付金额:</span><span class="span2">{{money}}</span>&nbsp;元</p>
				</div>
				<div class="text-center"><button class="btn" id="voucher" @click="voucher">充值</button></div>
				<p class="text-tip">因为受银行系统兼容性的限制，某些银行充值只能在 Windows 操作系统操作，建议使用特定版本的IE浏览器（一般是IE6以上、IE10以下）。
同时，请留意银行网上银行页面的提示，如确定充值数额是否超过银行卡的转账额度限制等。</p>
				<div class="dis-fl attentions f-16">
					<div class="left">温馨提示</div>
					<div class="flex-1 tips f-14">
						<p>1. 为了您的账户安全，请在充值前进行身份认证、手机绑定以及提现密码设置。</p> 
						<p>2. 您的账户资金将通过第三方平台进行充值。</p>
						<p>3. 请注意您的银行卡充值限制，以免造成不便。 </p>
						<p>4. 禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</p>
						<p>5. 如果充值金额没有及时到账，请联系客服。</p>
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
				loading: false,
				money: '',
				numError: false,
				accountData:{
					'mcCurrency':0,//矿业币
					'availableBalance':0,//可用余额
					'total':0//总额
				}
			}
		},
		created(){ 
			this.$http.get(this.$root.urlPath.MJK+'/account/account?status=0').then(function(res){
				if(res.body.success){
					this.accountData.availableBalance = res.body.data.availableBalance;
				}
			},function(res){
				
			});
		},
		watch: {
			money() {
				var number = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
				this.numError = number.test(this.money)? false : true;
			}
		},
		methods: {
			voucher() {			
				if(!this.money){
					this.numError = true;
					return false
				}else if(this.numError){
					return false				
				}else{
					this.loading = true;
					this.$http.get(this.$root.urlPath.MJK + '/rechargecash/recharge?status=0&money='+this.money).then(function(res){
						if(res.body.success){
							window.location.href = res.body.data;
							this.loading = false;
						}else{
							this.loading = false;						
						}
					},function(){
						this.loading = false;
					})
				}
			}
		}
	}
</script>

<style>
	  @import '../../../static/css/user/user.css'; 
</style>