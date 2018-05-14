<template>
	<div class="flex-1 funds">
		<div class="box-con bg-white">
			<p class="com-title bg-pri">{{$t('user.funds.tit')}}</p>
			<div class="con1">
				<div class="row bor-b-ccc pb-20">
					<div class="col-sm-4 item">
						<div class="item-con item-con1">
							<p>{{$t('user.index.able_balance')}}</p>
							<span class="f-w f-24">¥{{ this.accountData.availableBalance }}</span>
						</div>
					</div>
					<div class="col-sm-4 item">
						<div class="item-con item-con2">
							<p>{{$t('user.index.coin')}}</p>
							<span class="f-w f-24">¥{{ this.accountData.mcCurrency }}</span>

						</div>
					</div>
					<div class="col-sm-4 item">
						<div class="item-con item-con3">
							<p>{{$t('user.index.total')}}</p>
							<span class="f-w f-24">¥{{ this.accountData.total }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="clearfix">
				<router-link to="act_funds/withdraw" class="draw btn">{{$t('user.index.withdraw')}}</router-link>
				<router-link to="act_funds/recharge" class="pay btn">{{$t('user.index.recharge')}}</router-link>
			</div>
		</div>
		<div class="box-con bg-white">
			<p class="com-title bg-pri">{{$t('user.funds.tit_sec')}}</p>
			<div class="history-out">
				<p class="f-16 pb-15"><strong>{{$t('user.funds.type')}}：</strong>
					<span v-for="(item,index) in transactionArr" class="cur-p" :class="index==isActive?'col-pri':''" @click="changeClass(index,item.type)"> {{item.name}}</span>
				</p>
				<p class="f-16"><strong>{{$t('user.funds.time_ran')}}：</strong>
					<span v-for="(item,index) in timeArr" class="cur-p" :class="index==isActive2?'col-pri':''" @click="changeClass2(index,item.type)"> {{item.name}}</span>
				</p>
				<table class="full-w f-14">
					<tr>
						<th style="width: 25%;">{{$t('user.funds.time')}}</th>
						<th style="width: 20%;">{{$t('user.funds.type')}}</th>
						<th style="width: 20%;">{{$t('user.funds.amount')}}</th>
						<th style="width: 15%;">{{$t('user.funds.act_type')}}</th>
						<th style="width: 20%;">{{$t('user.funds.explain')}}</th>
					</tr>
					<tr v-for="item in list">
						<td>{{item.createdTime}}</td>
						<td>{{item.codeDesc}}</td>
						<td>{{item.optAmount}}</td>
						<td>{{item.status}}</td>
						<td>
							<p class="text-line-2 bg-white">{{item.remark}}</p>
						</td>
					</tr>
				</table>
				<div class="funds-data-none" v-show="list.length <= 0">
					<div class="text-center con">
						<img src="/static/img/comm/data-none.png" alt="" />
						<p class="mt-10 ml-10">{{$t('comm.no_data')}}</p>
					</div>
				</div>
				<div class="clearfix pt-20">
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
				totalPage: 0,
				accountData: {
					'mcCurrency': 0, //矿业币
					'availableBalance': 0, //可用余额
					'total': 0 //总额
				},
				transactionType: 99, //交易类型
				timeFrame: 99, //时间范围
				pageNum: 1, //当前页数
				numPerPage: 10, //每页数量
				isActive: 0,
				transactionArr: [{
						index: 0,
						name: this.$t('user.funds.all'),
						type: '99'
					},
					{
						index: 1,
						name: this.$t('user.funds.recharge'),
						type: '1'
					},
					{
						index: 2,
						name: this.$t('user.funds.withdraw'),
						type: '2'
					},
					{
						index: 3,
						name: this.$t('user.funds.cut_money'),
						type: '3'
					},
					{
						index: 4,
						name: this.$t('user.funds.trade'),
						type: '4'
					},
				],
				isActive2: 0,
				timeArr: [{
						index: 0,
						name: this.$t('user.funds.all'),
						type: '99'
					},
					{
						index: 1,
						name: this.$t('user.funds.seven_days'),
						type: '1'
					},
					{
						index: 2,
						name: this.$t('user.funds.one_month'),
						type: '2'
					},
					{
						index: 3,
						name: this.$t('user.funds.three_month'),
						type: '3'
					},
					{
						index: 4,
						name: this.$t('user.funds.six_month'),
						type: '4'
					},
				],
				list: [],
				codeMsg: [],
				accountType: {
					"1": "收入",
					"-1": "支出",
					"0": "冻结",
				}
			}
		},
		created() {
			this.$http.get(this.$root.urlPath.MJK + '/account/account?status=0').then(function(res) {
				if(res.body.success) {
					//					console.log("资金管理，我的资金",res.data.data)
					this.accountData.availableBalance = res.data.data.availableBalance;
					this.accountData.mcCurrency = res.data.data.mcCurrency;
					this.accountData.total = this.accountData.availableBalance + res.data.data.freezingBalance;
				}
			}, function(res) {

			});
			this.select(this.transactionType, this.timeFrame, this.pageNum, this.numPerPage)
		},
		methods: {
			router(url) {
				this.$router.push(url)
			},
			changeClass(index, type) {
				console.log("类型是", type)
				this.pageNum = 1
				this.isActive = index;
				this.transactionType = type
				this.select(this.transactionType, this.timeFrame, this.pageNum, this.numPerPage)
			},
			changeClass2(index, type) {
				console.log("时间是", type)
				this.pageNum = 1
				this.isActive2 = index;
				this.timeFrame = type
				this.select(this.transactionType, this.timeFrame, this.pageNum, this.numPerPage)
			},
			select(transactionType, timeFrame, pageNum, numPerPage) {
				this.$http.get(this.$root.urlPath.MJK + '/account/accountList?status=0&transactionType=' + transactionType + '&timeFrame=' + timeFrame + '&pageNum=' + pageNum + '&numPerPage=' + numPerPage).then(function(res) {
					if(res.body.success) {
						console.log("资金管理，我的资金,资金记录", res.data.data)
						if(res.data.data.accountDataVOS != null && res.data.data.accountDataVOS.length > 0) {
							this.list = res.data.data.accountDataVOS;
							this.codeMsg = res.data.data.codeMsgVOS;
							this.totalPage = res.data.data.totalCount
							for(var i = 0; i < this.list.length; i++) {
								this.list[i].createdTime = getTime(this.list[i].createdTime + "");
								this.list[i].status = this.accountType[(this.list[i].status + "")];
								for(var j = 0; j < this.codeMsg.length; j++) {
									if(this.list[i].cat == this.codeMsg[j].codeVal) {
										this.list[i].codeDesc = this.codeMsg[i].codeDesc
									}

								}
							}
						} else {
							this.list = [];
							this.codeMsg = [];
							this.totalPage = 0
						}
					}
				}, function(res) {

				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.select(this.transactionType, this.timeFrame, val, this.numPerPage)
			},
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
	.history-out .active {
		color: red;
	}
</style>