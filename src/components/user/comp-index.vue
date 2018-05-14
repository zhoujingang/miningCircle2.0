<template>

	<div class="flex-1 main-right">						
		<div class=" comp-info">
			<div class="right">
				<div class="dis-fl">
					<div class="img">
						<img class="comp_img" :src="this.userBO.logo?this.userBO.logo:'/static/img/user/img2.png'" alt="" />
					</div>
					<div class="flex-1">
						<p class="tip col-pri">{{$t('comp.index.company_name')}}：{{this.userBO.name}}<span class="tip_1">{{$t('comp.index.flag_store')}}</span></p>
						<div class="kind col-666">
							<p>{{$t('comp.index.company_type')}}：{{this.type}}</p>
							<p class="mt-10">{{$t('comp.index.main_product')}}：{{this.userBO.mainProduct}}</p>
						</div>
					</div>								
				</div>
			</div>
		</div>
		<div class="con_1 dis-fl">
			<div class="tip pos-r">
				<div class="trans-center full-w">
					<img src="/static/img/user/icon5.png" alt="" />
				<p class="mt-5">{{$t('comp.index.funds_status')}}</p>
				</div>
				
			</div>
			<div class="flex-1">
				<span class="tit" style="color:#f39800">{{$t('user.index.able_balance')}}</span>
				<p class="clearfix mt-15 pos-r">
					<span class="num vert-b">¥{{accountData.availableBalance}}</span>
					<router-link v-if="compStore.rule.recharge_withdrawal" to="/comp/comp_funds/withdraw" class="pull-right f-w mt-10 hov-pri">{{$t('user.index.withdraw')}}></router-link>
					<router-link v-if="compStore.rule.recharge_withdrawal" to="/comp/comp_funds/recharge" class="pull-right f-w voucher hov-pri">{{$t('user.index.recharge')}}></router-link>
				</p>
			</div>
			<div class="flex-1">
				<span class="tit" style="color:#eb6100">{{$t('user.index.coin')}}</span>
				<p class="clearfix mt-15"><span class="num vert-b">¥{{accountData.mcCurrency}}</span>
					<router-link to="comp_coin" class="pull-right f-w mt-10 hov-pri">{{$t('user.index.detail')}}></router-link>				
				</p>
			</div>
			<div class="flex-1">
				<span class="tit" style="color:#601986">{{$t('user.index.total')}}</span>
				<p class="clearfix mt-15"><span class="num vert-b">¥{{accountData.total}}</span>
					
				</p>
			</div>
		</div>
		<div class="con_2 dis-fl">
			<div class="tip pos-r">
				<div class="trans-center full-w">
					<img src="/static/img/user/icon5.png" alt="" />
				<p class="mt-5">{{$t('comp.index.todo')}}</p>
				</div>
				
			</div>
			<div class="flex-1">
				<div class="of_order clearfix">
					<span class="pull-left f-w">供应订单管理：</span>
					<span>待报价(0)</span>
					<span>待确认(0)</span>
					<span>待签合同(0)</span>
					<span>待付款(0)</span>
					<span>待发货(0)</span>
					<span>待签收(0)</span>						
				</div>
				<div class="ph_order clearfix">
					<span class="pull-left f-w tit">采购订单管理：</span>
					<span>待回复(0)</span>
					<span>待确认(0)</span>
					<span>待签合同(0)</span>
					<span>待付款(0)</span>
					<span>待发货(0)</span>
					<span>待签收(0)</span>							
				</div>
				<div class="se_order clearfix">
					<span class="pull-left f-w tit">资源单管理：</span>
					<span>销售中(0)</span>
					<span>未上架(0)</span>
					<span>审核中(0)</span>
					<span>违规待处理(0)</span>
					<span>违规已下架(0)</span>							
				</div>
			</div>
		</div>
		<div class="con_3 clearfix mb-20">
			<div class="comp-res">
				<div class="tit">
					<span class="f-18">{{$t('user.index.purch_info')}}</span><a href="http://www.miningcircle.com/ln/index.do" class="pull-right mt-5 col-white">{{$t('comm.more')}}>></a>
				</div>
				<div class="pd-10 bg-white">
					<table class="ph_info">
						<tr>
							<th>{{$t('user.index.pubdate')}}</th>
							<th style="width: 28%;">{{$t('user.index.pro_name')}}</th>
							<th>{{$t('user.index.quantity')}}</th>
							<th>{{$t('comp.index.specification')}}</th>
							<th style="width: 28%;">{{$t('comp.index.address')}}</th>
						</tr>
						<tr v-for="(item,index) in demandList">
							<td>{{item.updateTime}}</td>
							<td>{{item.title}}</td>
							<td>{{item.totalQuantity}}{{item.unit}}</td>
							<td>{{item.specification}}</td>
							<td><p class="text-line-2 pl-10 pr-10">{{item.province}}</p></td>
						</tr>
					</table>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {getTime2} from '@/assets/commjs/util.js';
	import { mapState } from 'vuex';
	export default {
		data(){
			return{
				userBO:{
					
				},
				logo: '',
//				rule: '',
				type: '',
				demandList: [],
				accountData:{
					'mcCurrency':0,//矿业币
					'freezingBalance': 0,//冻结资金
					'availableBalance':0,//可用余额
					'total':0//总额
				},
				delivery:{
					0: this.$t('comp.index.take_their'),
					1: this.$t('comp.index.send'),
					2: this.$t('comp.index.other')
				}
			}
		},
		created() {
			const params = {}
			this.$http.get(this.$root.urlPath.MJK + '/company/selectCompay', {
				params: params
			}).then(function(res) {
				if(res.body.success) {
					this.userBO = res.body.data;
					switch(this.userBO.type) {
						case 0:
							this.type = "生产加工";
							break;
						case 1:
							this.type = "贸易经销";
							break;
						case 2:
							this.type = "工贸一体";
							break;
						case 3:
							this.type = "服务机构";
							break;
						case 4:
							this.type = "厂矿企业";
							break;
					}
				}
			}, function(res) {

			})
			this.$http.get(this.$root.urlPath.MJK+'/account/account?status=1',{params:params}).then(function(res){
				if(res.body.success){
					this.accountData.availableBalance = res.body.data.availableBalance;
					this.accountData.freezingBalance = res.body.data.freezingBalance;
					this.accountData.mcCurrency = res.body.data.mcCurrency;
					this.accountData.total = this.accountData.availableBalance+this.accountData.freezingBalance;
				}
			},function(res){
			});
			this.$http.get(this.$root.urlPath.MJK+'/buy/purchase').then(function(res){
				if(res.body.success){
					console.log(res.body.data)
					this.demandList = res.body.data;
					var that = this
					this.demandList.forEach(function(item){
						item.updateTime = getTime2(item.updateTime);
						item.delivery = that.delivery[item.delivery];
					})
					console.log(this.demandList)
				}
			},function(){
				
			})
		},
		computed: mapState({
		    compStore: state => state.compInfo
		}),
		methods: {
	    }
	}
</script>

<style>
      @import '../../../static/css/user/user.css'; 
 
</style>