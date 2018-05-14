<template>
	<div class="flex-1 order-offer">
		<div class="box-con bg-white">
			<p class="com-title bg-pri">{{$t('user.order.ordinary_goods')}}</p>
		</div>
		<div class="con">
			<div class="f-w t-header clearfix">
				<div class="tr1" style="width: 34%;">{{$t('user.order.order_information')}}</div>
				<div class="tr2" style="width: 12%;">{{$t('user.order.price')}}</div>
				<div class="tr2" style="width: 12%;">{{$t('user.order.order_quantity')}}</div>
				<div class="tr" style="width: 14%;">{{$t('user.order.order_amount')}}</div>
				<div class="tr" style="width: 14%;">{{$t('user.order.trading_status')}}</div>
				<div class="tr" style="width: 14%;">{{$t('user.order.trading_operations')}}</div>
			</div>
			<div class="pro-list" v-for="item in list">
				<div class="clearfix pro-num col-555">
					<div class="tr1" style="width: 48%;">
						{{item.ordpVO.doneTime}} <span class="pl-20">{{$t('user.order.order_number')}}：{{item.ordpVO.serialno}}</span>
					</div>
					<div class="tr text-center pull-right" style="width: 12%;">
						<i class="el-icon-delete del-order"></i>
						<!--<i class="el-icon-delete f-20 pl-20 ml-20 col-999"></i>-->
					</div>
				</div>
				<table class="full-w">
					<tr>
						<td style="width: 58%;">
							<div class="one-orders">
								<div v-for="i in item.list">
									<div class="comp-name-out">
										<p class="comp-name ml-20">{{i.cname}}</p>
									</div>
									<div class="clearfix comm-list">
										<div class="td" style="width:21%">
											<img class="mg-10 pro-img" :src="i.rimg" alt=""  @click="enterDetails(i.rid)"/>
										</div>
										<div class="td pro-name text-line-2 pr-10" style="width:38%">
											{{i.rtitle}}
										</div>
										<div class="td" style="width:21%">
											¥{{i.rprice}}
										</div>
										<div class="td" style="width:20%">
											{{i.roquantity}}
										</div>
									</div>
								</div>
							</div>
						</td>
						<td style="width: 14%;" class="text-center f-w bor-r">
							¥{{item.ordpVO.amount}}
						</td>
						<td style="width: 14%;" class="text-center bor-r">
							{{item.ordpVO.transactionStatus}}
						</td>
						<td style="width: 14%;" class="text-center">
							<button class="btn pay-order bg-pri mb-5" @click="onClick(item.ordpVO.status,item.ordpVO.id)" v-show="item.ordpVO.status==0||item.ordpVO.status==2">{{item.ordpVO.orderOperation}}</button>
							<button class="btn pay-order bg-red" @click="cancelOrder(item.ordpVO.serialno)" v-show="item.ordpVO.status==0">{{$t('user.order.cancel_order')}}</button>
							<button @click="lookOrder(item.ordpVO.id)" v-show="item.ordpVO.status!=0">查看订单</button>
						</td>
					</tr>
				</table>
			</div>
			<div class="product-data-none" v-show="list.length <= 0">
				<div class="text-center con">
					<img src="/static/img/comm/data-none.png" alt="" />
					<p class="mt-10 ml-10">{{$t('user.order.no_data')}}</p>
				</div>
			</div>
		</div>
		<div class="clearfix bg-white pb-20 pr-20">
			<div class="pull-right">
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="numPerPage" layout="prev, pager, next, jumper" :total="totalCount">
					</el-pagination>
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
				pageNum: 1, //当前页数
				numPerPage: 8, //每页数量
				totalCount: 0,
				list: [],
				transactionStatus: {
					"0": "待支付",
					"1": "支付成功待发货",
					"2": "已发货",
					"4": "售后处理中",
					"-1": "订单过期",
					"-2": "订单已取消",
				},
				orderOperation: {
					"0": "立即支付",
					"1": "待发货",
					"2": "确认收货",
					"4": "订单详情",
					"-1": "订单详情",
					"-2": "订单详情",
				},
			}
		},
		created() {
			this.selectOrder(this.pageNum, this.numPerPage)
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.selectOrder(val, this.numPerPage)
			},
			selectOrder(val, numPerPage) { //status:0 代表个人的普通订单
				this.$http.get(this.$root.urlPath.MJK + '/generalGoodsOrderList/generalGoodsOrder?status=0&numPerPage=' + numPerPage + '&pageNum=' + val).then(function(res) {
					if(res.body.success) {
						this.totalCount = res.body.data.totalCount
						console.log("res.body.data", res.body.data)
						this.list = res.body.data.arrayList
						if(this.list.length>0){
							for(var i = 0; i < this.list.length; i++) {
								this.list[i].ordpVO.transactionStatus = this.transactionStatus[(this.list[i].ordpVO.status)]
								this.list[i].ordpVO.orderOperation = this.orderOperation[(this.list[i].ordpVO.status)]
								this.list[i].ordpVO.orderId = this.list[i].list[0].id
								this.list[i].ordpVO.doneTime = getTime(this.list[i].ordpVO.doneTime);
							}							
						}

					}
				}, function(res) {

				})
			},
			onClick(status,orderId) {
				if(status == 0) {
					window.location.href = this.$root.urlPath.MC +"/mall.do?paybill";
				} else if(status == 2) {
					// 确认订单
					console.log("确认订单ggggggggg");
				}else {
					// 查看详情
					this.lookOrder(orderId); 
				}
			},
			cancelOrder(serialno) {
				this.$http.get(this.$root.urlPath.MJK + '/generalGoodsOrderList/cancelOrder?&status=0&serialno=' + serialno).then(function(res) {
//					console.log("企业普通订单，我的采购serialnores.body.data", res.body.data)
					if(res.body.data == 0) {
						this.selectOrder(this.pageNum, this.numPerPage)
					} else {
						alert("取消失败！");
					}
				})
			},
			lookOrder(id){
				this.$router.push({path:'/user/order_buy/details',query:{id:id,status:"0"}})
//				console.log("企业普通订单，我的采购,查看订单orderIdsss", id)
			},
			enterDetails(rid){
				window.location.href = this.$root.urlPath.MC +"/i.do?o="+rid;
			},
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
</style>