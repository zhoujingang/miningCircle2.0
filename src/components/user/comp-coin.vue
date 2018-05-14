<template>
	<div class="flex-1 funds  bg-white box-con">
		<div>
			<p class="com-title bg-pri">{{$t('user.coin.tit')}}</p>
			<div class="con1">
				<div class="row bor-b-ccc pb-20">
					<div class="col-sm-4 item">
						<div class="item-con item-con1">
							<p>{{$t('user.coin.total_value')}}</p>
							<span class="f-w f-24">¥{{ this.dTotalGifts }}</span>
						</div>
					</div>
					<div class="col-sm-4 item">
						<div class="item-con item-con2">
							<p>{{$t('user.coin.surplus')}}</p>
							<span class="f-w f-24">¥{{ this.surplusCoin }}</span>

						</div>
					</div>
					<div class="col-sm-4 item">
						<div class="item-con item-con3">
							<p>{{$t('user.coin.used')}}</p>
							<span class="f-w f-24">¥{{ this.dUsedGifts }}</span>

						</div>
					</div>
				</div>
			</div>
			<div class="clearfix">
				<button class="get-gift btn">{{$t('user.coin.redeem')}}</button>
			</div>
		</div>
		<div class="pl-20 pr-20">
			<el-tabs type="border-card" class="coin-tabs" @tab-click="onTabClick">
				<el-tab-pane class="tab-item" name="0">
					<span slot="label">{{$t('user.coin.coin')}}</span>
					<div class="tab-con">
						<div class="row">
							<div class="col-md-6 pl-15 pr-15 mb-15" v-for="item in list">
								<div class="coins clearfix" :class="item.status==1?'coin-used':''">
									<div class="coins-left">
										<p class="pb-10">¥<span class="f-32">{{item.price}}</span></p>
										<p class="f-12">已加入您的总资产中</p>
									</div>
									<div class="coins-right">
										<p class="tit pb-5">{{item.name}}</p>
										<p class="f-14 text-overflow pb-10">{{item.remark}}</p>
										<p class="f-14 time">有效期至： {{item.dateEnd}}</p>
									</div>
									<div class="tip">
										{{item.status == 1?'已使用':''}}
									</div>
								</div>
							</div>
						</div>
						<div class="funds-data-none" v-show="list.length <= 0">
							<div class="text-center con">
								<img src="/static/img/comm/data-none.png" alt="" />
								<p class="mt-10 ml-10">{{$t('comm.no_data')}}</p>
							</div>
						</div>
					</div>
				</el-tab-pane>
				<el-tab-pane class="tab-item" name="1">
					<span slot="label">{{$t('user.coin.record')}}</span>
					<div class="tab-con">
						<div class="row">
							<div class="col-md-6 pl-15 pr-15 mb-15" v-for="item in list">
								<div class="coins clearfix" :class="item.status==1?'coin-used':''">
									<div class="coins-left">
										<p class="pb-10">¥<span class="f-32">{{item.price}}</span></p>
										<p class="f-12">已加入您的总资产中</p>
									</div>
									<div class="coins-right">
										<p class="tit pb-5">{{item.name}}</p>
										<p class="f-14 text-overflow pb-10">{{item.remark}}</p>
										<p class="f-14 time">有效期至： {{item.dateEnd}}</p>
									</div>
									<div class="tip">
										{{item.status == 1?'已使用':''}}
									</div>
								</div>
							</div>
						</div>
						<div class="funds-data-none" v-show="list.length <= 0">
							<div class="text-center con">
								<img src="/static/img/comm/data-none.png" alt="" />
								<p class="mt-10 ml-10">{{$t('comm.no_data')}}</p>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
			<div class="clearfix pt-20 pb-20">
				<div class="pull-right">				
					<div class="block">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="numPerPage" layout="prev, pager, next, jumper" :total="totalPage">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	//	import VueResource from 'vue-resource';
	//	Vue.use(VueResource);
	import { getTime } from "@/assets/commjs/util.js";
	export default {
		data() {
			return {
				totalPage: 0,
				list: [],
				record: '', //兑换记录,
				pageNum: 1, //当前页数
				numPerPage: 10, //每页数量
				dTotalGifts: 0, //总矿业币价值
				dUsedGifts: 0, //已使用矿业币
				surplusCoin: 0, //剩余的矿业币
			}
		},
		created() {
			this.select(this.record, this.pageNum, this.numPerPage)
		},
		methods: {
			select(record, pageNum, numPerPage) {
				this.$http.get(this.$root.urlPath.MJK + '/account/others?role=1&function=mnCurrency&pageNum=' + pageNum + '&numPerPage=' + numPerPage + '&record=' + record).then(function(res) {
					if(res.body.success) {
						//					console.log("资金管理，矿业币",res.data.data)
						if(res.data.data.mnCurrencyVOS != null && res.data.data.mnCurrencyVOS.length > 0) {
							this.dTotalGifts = res.data.data.dTotalGifts
							this.dUsedGifts = res.data.data.dUsedGifts
							this.surplusCoin = this.dTotalGifts - this.dUsedGifts
							this.totalPage = res.data.data.totalCount
							this.list = res.data.data.mnCurrencyVOS
							for(var i = 0; i < this.list.length; i++) {
								this.list[i].dateEnd = getTime(this.list[i].dateEnd + "");
							}
						} else {
							this.list = [];
							this.totalPage = 0

						}
					}
				}, function(res) {

				})
			},
			onTabClick(event) {
				switch(event.name) {
					case '0':
						this.record = ''
						this.pageNum = 1
						break;
					case '1':
						this.record = 'record'
						this.pageNum = 1
						break;
					default:
						break;
				}
				this.select(this.record, this.pageNum, this.numPerPage)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				//	        	console.log(val);
				this.select(this.record, val, this.numPerPage)
			},
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
	/*.el-tabs--border-card>.el-tabs__header{
		background: #fff;
		border: none;
	}
	.el-tabs__nav{
		margin-left: 20px;
	}*/
</style>