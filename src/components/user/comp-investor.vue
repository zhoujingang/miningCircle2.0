<template>
	<div class="flex-1 main-right">
		<div class="cert-com">
			<div class="tit dis-tab vert-b f-18">
				<span class="">{{$t('comp.investor_data.tit')}}</span>
			</div>
			<div class="pd-10 bg-white ">
				<div class="text-right pb-10">
					<span v-show="status == 2&&userStates == 4" class="col-999">{{$t('comp.investor_data.tip')}}</span> 
					<span v-show="status == 1" class="col-green">您的资料正在申请中</span> 
					<span v-show="status == 0&&userStates == 4" class="col-red">您的认证资料未通过认证 ，点击编辑可重新认证</span> 
					
					<router-link v-show="(status ==0||status ==2)&&userStates == 4" to="investor_cert" class="btn bg-green investor_edit">编辑</router-link></div>
				<div class="investor-info f-16">
					<div class="clearfix item">
						<div class="left">
							{{$t('comp.investor_data.amount')}}：
						</div>
						<div class="right">
							{{investor.amount}} 万元
						</div>
					</div>
					<div class="clearfix item">
						<div class="left">
							{{$t('comp.investor_data.currency')}}：
						</div>
						<div class="right">
							{{currency}}
						</div>
					</div>
					<div class="clearfix item">
						<div class="left">
							{{$t('comp.investor_data.mode')}}：
						</div>
						<div class="right">
							{{investor.mode}}
						</div>
					</div>
					<div class="clearfix item">
						<div class="left">
							{{$t('comp.investor_data.minerals')}}：
						</div>
						<div class="right">
							{{mineral}}
						</div>
					</div>
					<div class="clearfix item">
						<div class="left">
							{{$t('comp.investor_data.address')}}：
						</div>
						<div class="right">
							<span class="mr-5">{{country}}</span><span class="mr-5">{{province}}</span><span  class="mr-5">{{city}}</span><span  class="mr-5">{{county}}</span>
						</div>
					</div>
					<div class="clearfix item introduce">
						<div class="left">
							{{$t('comp.investor_data.require')}}：
						</div>
						<div class="right">
							{{investor.requirement}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState } from 'vuex'
	
	export default {
		data() {
			return {
				status: '',//投资人认证状态
				investor: {
					
				},
				country: '',//国家
				province: '',//省份
				city: '',//城市
				county: '',//县区
				mineral: '',
				currency: '',
				minerals: {
					1: '金属矿产',
					2: '有色金属',
					4: '黑色金属',
					8: '能源矿产',
					16: '稀土分散',
					32: '非金属'
				},
				currencys: {
		          	CNY: 'CNY人民币',
		          	USD: 'USD美元',
		          	EUR: 'EUR欧元',
		          	HKD: 'HKD港币',
		          	GBP: 'GBP英镑',
		          	JPY: 'JPY日元',
		          	KRW: 'KRW韩元'	          	
		        }
			}
		},
		created() {
			this.$http.get(this.$root.urlPath.MJK + '/company/getInvestor').then(function(res){
				if(res.body.success){
					this.status = res.body.data.status;
					if(this.status == -1){
						this.$router.push('/comp/investor_cert');
					}
					if(res.body.data.investorVO){					
						this.investor = res.body.data.investorVO;
						var mineral_list = this.investor.mineral.split(',');
						this.currency = this.currencys[this.investor.currency];//币种
						for (var i = 0; i < mineral_list.length; i++) {
							if(this.minerals[mineral_list[i]]){							
								this.mineral += ' '+this.minerals[mineral_list[i]];
							}
						}
						this.country = this.investor.country.split(',')[1];
						this.province = this.investor.province.split(',')[1];
						this.city = this.investor.city.split(',')[1];
						this.county = this.investor.county.split(',')[1];
					}
					
				}
			},function(){
				
			})
		},
		computed: mapState({
			userStates: state => state.userInfo.userStates
		})
	}
</script>

<style>
</style>