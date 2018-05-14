<template>

	<div class="flex-1 coupon gift">
		<div class="box-con bg-white">
			<p class="com-title bg-pri">{{$t('user.gift.tit')}}</p>
			<div class="con1">
				<div class="row bor-b-ccc pb-20">
					<div class="col-sm-4 item">
						<div class="item-con item-con1">
							<p>{{$t('user.gift.total')}}（{{ this.sumcount }}）</p>
							<div class="f-24">{{$t('user.gift.value')}}：¥{{this.dTotalGifts}}</div>
						</div>
					</div>
					<div class="col-sm-4 item">
						<div class="item-con item-con2">
							<p>{{$t('user.gift.used')}}：{{ this.nUsedGifts }}</p>
							<span class="f-24">{{$t('user.gift.value')}}：¥{{this.dUsedGifts}}</span>

						</div>
					</div>
					<div class="col-sm-4 item">
						<div class="item-con item-con3">
							<p>{{$t('user.gift.unused')}}：{{ this.surplusGift }}</p>
							<span class="f-24">{{$t('user.gift.value')}}：¥{{this.dSurplusGift}}</span>

						</div>
					</div>
				</div>
				<el-tabs type="border-card" class="coupon-tabs" @tab-click="onTabClick">
					<el-tab-pane class="tab-item" name="0">
						<span slot="label"><i class="el-icon-date"></i>{{$t('user.gift.gift')}}</span>
						<div class="tab-con">
							<div class="row">
								<div class="col-md-6 pl-15 pr-15 mb-15" v-for="item in list">
									<div class="coins clearfix">
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
					<el-tab-pane class="tab-item" :label="$t('user.gift.used')" name="1">
						<div class="tab-con">
							<div class="row">
								<div class="col-md-6 pl-15 pr-15 mb-15" v-for="item in list">
									<div class="coins coin-used clearfix">
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
					<el-tab-pane class="tab-item" :label="$t('user.gift.expired')" name="-1">
						<div class="tab-con">
							<div class="row">
								<div class="col-md-6 pl-15 pr-15 mb-15" v-for="item in list">
									<div class="coins coin-used clearfix">
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
											{{item.status == -1?'已过期':''}}
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
				currentPage: 1,
				totalPage: 0,
				list: [],
				pageNum: 1, //当前页数
				numPerPage: 10, //每页数量
				status: 0, //选项卡下标0表示未使用，1表示已使用，-1表示作废
				sumcount: 0, //总礼品个数或总代金券个数
				nUsedGifts: 0, //已使用礼品个数或代金券个数
				surplusGift: 0, //剩余礼品个数或代金券个数
				dUsedGifts: 0, //已使用使用的价值
				dTotalGifts: 0, //总的价值
				dSurplusGift: 0, //未用的价值
			}
		},
		created() {
			this.select(this.status, this.pageNum, this.numPerPage)
		},
		methods: {
			select(status, pageNum, numPerPage) {
				this.$http.get(this.$root.urlPath.MJK + '/account/others?role=0&function=giftExchange&pageNum=' + pageNum + '&numPerPage=' + numPerPage + '&status=' + status).then(function(res) {
					if(res.body.success) {
						if(res.data.data.mnCurrencyVOS != null && res.data.data.mnCurrencyVOS.length > 0) {
							//						console.log("资金管理，礼品",res.data.data)
							this.sumcount = res.data.data.sumCount
							this.nUsedGifts = res.data.data.nUsedGifts
							this.dUsedGifts = res.data.data.dUsedGifts
							this.dTotalGifts = res.data.data.dTotalGifts
							this.dSurplusGift = this.dTotalGifts - this.dUsedGifts
							this.surplusGift = this.sumcount - this.nUsedGifts
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
				//				console.log(event.name)
				switch(event.name) {
					case '0':
						this.status = 0
						this.pageNum = 1
						break;
					case '1':
						this.status = 1
						this.pageNum = 1
						break;
					case '-1':
						this.status = -1
						this.pageNum = 1
						break;
					default:
						break;
				}
				this.select(this.status, this.pageNum, this.numPerPage)
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				//	        	console.log(val);
				this.select(this.status, val, this.numPerPage)
			},
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
</style>