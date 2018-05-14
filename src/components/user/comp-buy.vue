<template>
	<div class="flex-1 order-offer">
		<template>
			<el-tabs @tab-click="onTabClick" class="comp-offer-tabs" v-model="active">
				<el-tab-pane :label="$t('user.order.commodity')" name="0">
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
									{{item.insertTime}} <span class="pl-20">{{$t('user.order.order_number')}}：{{item.orderId}}</span>
								</div>
								<div class="tr" style="width: 40%;">
									<p class="comp-name">{{item.name}}</p>
								</div>
								<div class="tr text-center" style="width: 12%;">
									<i class="el-icon-delete f-20 pl-20 ml-20 col-999"></i>
								</div>
							</div>
							<table class="full-w">
								<tr>
									<td style="width: 34%;">
										<img class="mg-20 pro-img" :src='item.logo' alt="" /><span class="pl-20">{{item.title}}</span>
									</td>
									<td style="width: 12%;" class="">
										¥{{item.dealAmount}}
									</td>
									<td style="width: 12%;" class="bor-r">
										{{item.dealQuantity}}( {{item.unit}} )
									</td>
									<td style="width: 14%;" class="text-center f-w bor-r">
										¥{{item.dealAmount*item.dealQuantity}}
									</td>
									<td style="width: 14%;" class="text-center bor-r">
										{{item.status}}
									</td>
									<td style="width: 14%;" class="text-center col-pri">
										查看订单
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
				</el-tab-pane>
				<el-tab-pane :label="$t('user.order.service_goods')" name="1">
					<div class="con">
						<div class="f-w t-header clearfix">
							<div class="tr1" style="width: 30%;">{{$t('user.order.order_information')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.price')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.order_quantity')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.order_amount')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.trading_status')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.trading_operations')}}</div>
						</div>
						<div class="pro-list" v-for="item in list">
							<div class="clearfix pro-num col-555">
								<div class="tr1" style="width: 48%;">
									{{item.insertTime}} <span class="pl-20">{{$t('user.order.order_number')}}：{{item.orderId}}</span>
								</div>
								<div class="tr" style="width: 40%;">
									<p class="comp-name">{{item.name}}</p>
								</div>
								<div class="tr text-center" style="width: 12%;">
									<i class="el-icon-delete f-20 pl-20 ml-20 col-999"></i>
								</div>
							</div>
							<table class="full-w">
								<tr>
									<td style="width: 30%;">
										<!--"/static/img/user/pro.jpg"-->
										<img class="mg-20 pro-img" :src='item.logo' alt="" /><span class="pl-20">{{item.title}}</span>
									</td>
									<td style="width: 14%;" class="text-center">
										¥{{item.dealAmount}}
									</td>
									<td style="width: 14%;" class="text-center bor-r">
										{{item.dealQuantity}}( {{item.unit}} )
									</td>
									<td style="width: 14%;" class="text-center f-w bor-r">
										¥{{item.dealAmount*item.dealQuantity}}
									</td>
									<td style="width: 14%;" class="text-center bor-r">
										{{item.status}}
									</td>
									<td style="width: 14%;" class="text-center col-pri">
										查看订单
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
				</el-tab-pane>
				<el-tab-pane :label="$t('user.order.ordinary_goods')" name="2">
					<div class="con">
						<div class="f-w t-header clearfix">
							<div class="tr1" style="width: 30%;">{{$t('user.order.order_information')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.price')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.order_quantity')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.order_amount')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.trading_status')}}</div>
							<div class="tr" style="width: 14%;">{{$t('user.order.trading_operations')}}</div>
						</div>
						<div class="pro-list" v-for="item in list2">
							<div class="clearfix pro-num col-555">
								<div class="tr1" style="width: 48%;">
									{{item.ordpVO.doneTime}} <span class="pl-20">{{$t('user.order.order_number')}}：{{item.ordpVO.serialno}}</span>
								</div>
								<div class="tr text-center pull-right" style="width: 12%;">
									<i class="el-icon-delete f-20 pl-20 ml-20 col-999"></i>
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
													<div class="td" style="width:25%">
														<img class="mg-10 pro-img" :src="i.rimg" alt="" @click="enterDetails(i.rid)"/>
													</div>
													<div class="td pro-name text-line-2" style="width:30%">
														{{i.rtitle}}
													</div>
													<div class="td" style="width:20%">
														¥{{i.rprice}}
													</div>
													<div class="td" style="width:25%">
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
									<td style="width: 14%;" class="text-center col-pri">										
										<button class="btn pay-order bg-pri mb-5" @click="onClick(item.ordpVO.status,item.ordpVO.orderId)" v-show="item.ordpVO.status==0||item.ordpVO.status==2">{{item.ordpVO.orderOperation}}</button>
										<button class="btn pay-order bg-red" @click="cancelOrder(item.ordpVO.serialno)" v-show="item.ordpVO.status==0">{{$t('user.order.cancel_order')}}</button>
										<button @click="lookOrder(item.ordpVO.id)" v-show="item.ordpVO.status!=0">查看订单</button>
									</td>
								</tr>
							</table>
						</div>
						<div class="product-data-none" v-show="list2.length <= 0">
							<div class="text-center con">
								<img src="/static/img/comm/data-none.png" alt="" />
								<p class="mt-10 ml-10">{{$t('user.order.no_data')}}</p>
							</div>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</template>

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
				list2: [],
				type: '/order/commdity?function=commoditySupplyOrderList',
				transactionStatus: {
					"0": "待支付",
					"1": "支付成功代发货",
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
				active:'0'
			}
		},
		created() {
			if(sessionStorage.getItem('compBuyActiveIndex')=='null'){
				this.selectOrder(this.pageNum, this.numPerPage, this.type)
				console.log("created进来了,当前是第一个tab:",this.pageNum)
			}
			console.log("created进来了",this.pageNum)
		},
		beforeMount(){
			this.pageNum = parseInt(sessionStorage.getItem('compBuyPageNum'));
			console.log("beforeMount进来了",this.pageNum)
			window.onpopstate =()=>{
				if(window.location.href == this.$root.urlPath.URL +'/comp/comp_buy'){
			 		var activeIndex = sessionStorage.getItem('compBuyActiveIndex');
			 		this.active = activeIndex
			 		var event = {'name':this.active}
			 		console.log("beforeMounttab进来了，当前tab：",event)
			 		this.getList(event,this.pageNum)
			 	}
			}
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				if(sessionStorage.getItem('compBuyActiveIndex')=="2"){
					console.log("handleCurrentChange进来了")
				this.selectOrder2(val, this.numPerPage)
				sessionStorage.setItem('compBuyPageNum',val);
				}else{
//				sessionStorage.setItem('compBuyPageNum',val);
				this.selectOrder(val, this.numPerPage, this.type)
				}
				
			},
			selectOrder(val, numPerPage, type) {
				this.$http.get(this.$root.urlPath.MJK + this.type + '&numPerPage=' + numPerPage + '&pageNum=' + val).then(function(res) {
					if(res.body.success) {
						console.log("企业，我的采购", res.body.data)
						this.list = res.body.data.orderVOS
						this.totalCount = res.body.data.totalCount						
						if(this.list.length>0){
							for(var i = 0; i < this.list.length; i++) {
								this.list[i].insertTime = getTime(this.list[i].insertTime + "");
							}							
						}						


					}
				}, function(res) {

				})
			},
			selectOrder2(val, numPerPage) {////status:01代表企业的普通订单
				this.$http.get(this.$root.urlPath.MJK + '/generalGoodsOrderList/generalGoodsOrder?status=1&numPerPage=' + numPerPage + '&pageNum=' + val).then(function(res) {
					if(res.body.success) {
						console.log("企业普通订单，我的采购2", res.body.data)
						this.totalCount = res.body.data.totalCount
						this.list2 = res.body.data.arrayList
						if(this.list2.length>0){
							for(var i = 0; i < this.list2.length; i++) {
								this.list2[i].ordpVO.transactionStatus = this.transactionStatus[(this.list2[i].ordpVO.status)]
								this.list2[i].ordpVO.orderOperation = this.orderOperation[(this.list2[i].ordpVO.status)]
								this.list2[i].ordpVO.orderId = this.list2[i].list[0].id
								this.list2[i].ordpVO.doneTime = getTime(this.list2[i].ordpVO.doneTime);
							}							
						}

					}
				}, function(res) {

				})
			},
			onTabClick(event) {
				sessionStorage.setItem('compBuyActiveIndex',event.index);
				console.log("回退的tab是****：",event.index)
				this.getList(event,null)
			},			
//			onTabClick(event) {
//				switch(event.name) {
//					case "0":
//						this.type = '/order/commdity?function=commoditySupplyOrderList'
//						this.pageNum = 1
//						this.selectOrder(this.pageNum, this.numPerPage, this.type)
//						console.log("切换的tab是：大宗商品")
//						break;
//					case "1":
//						this.type = '/order/server?status=1&function=serverGoodsSupplyOrderList'
//						this.pageNum = 1
//						this.selectOrder(this.pageNum, this.numPerPage, this.type)
//						console.log("切换的tab是：服务商品")
//						break;
//					case "2":
//						this.pageNum = 1
//						this.selectOrder2(this.pageNum, this.numPerPage)						
//						console.log("切换的tab是：普通商品")
//						break;
//					default:
//						break;
//				}
//			},
			onClick(status,orderId) { 
				if(status == 0) {
					// 立即付款
					window.location.href = this.$root.urlPath.MC +"/mall.do?paybill";
				} else if(status == 2) {
					// 确认订单
					console.log("确认订单");
				}else {
					// 查看详情
					this.lookOrder(orderId); 
				}
			},
			cancelOrder(serialno) {
				this.$http.get(this.$root.urlPath.MJK + '/generalGoodsOrderList/cancelOrder?&status=1&serialno=' + serialno).then(function(res) {
//					console.log("企业普通订单，我的采购serialnores.body.data", res.body.data)
					if(res.body.data == 0) {
						this.selectOrder(this.pageNum, this.numPerPage)
					} else {
						alert("取消失败！");
					}
				})
			},
			lookOrder(id){
				this.$router.push({path:'/comp/order_buy/details',query:{id:id,status:"0"}})
//				console.log("企业普通订单，我的采购,查看订单orderId", orderId)
			},
			enterDetails(rid){
				console.log("ridddddddddddddddd", rid)
				window.location.href = this.$root.urlPath.MC +"/i.do?o="+rid;
			},
			getList(event,pageNum){
				console.log("getList进来了")
				switch(event.name) {
					case "0":
						this.type = '/order/commdity?function=commoditySupplyOrderList'
						this.pageNum = 1
						this.selectOrder(this.pageNum, this.numPerPage, this.type)
						console.log("切换的tab是：大宗商品")
						break;
					case "1":
						this.type = '/order/server?status=1&function=serverGoodsSupplyOrderList'
						this.pageNum = 1
						this.selectOrder(this.pageNum, this.numPerPage, this.type)
						console.log("切换的tab是：服务商品")
						break;
					case "2":
						console.log("getList进来了，传进来的当前页数是：",pageNum)
						if(pageNum==null){
							this.pageNum = 1
							sessionStorage.setItem('compBuyPageNum',1);
						}
						this.selectOrder2(this.pageNum, this.numPerPage)						
						console.log("切换的tab是：普通商品")
						break;
					default:
						break;
				}
			}			
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
</style>