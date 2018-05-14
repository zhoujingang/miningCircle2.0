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
										{{item.transactionStatus}}
									</td>
									<td style="width: 14%;" class="text-center col-pri">
										<button class="btn pay-order bg-pri mb-5"  v-show="item.status==1"  @click="onClick(item.status,item.orderId2)">{{item.orderOperation}}</button>
										<button @click="lookOrder(item.tropId)">查看订单</button>
							<el-dialog title="发货" :visible.sync="dialogFormVisible">
								<el-form :model="form">
									<el-form-item label="填写物流单号" :label-width="formLabelWidth">
										<el-input v-model="form.name" auto-complete="off"></el-input>
									</el-form-item>
								</el-form>
								<div slot="footer" class="dialog-footer">
									<el-button @click="dialogFormVisible = false">取 消</el-button>
									<el-button type="primary" @click="deliver(item.orderId2)" >确 定</el-button>
								</div>
							</el-dialog>
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
			</el-tabs>
		</template>

		<div class="clearfix bg-white pb-20 pr-20">
			<div class="pull-right">
				<div class="block">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="numPerPage" layout="prev, pager, next, jumper" :total="totalPage">
					</el-pagination>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import Vue from 'vue';
	import { getTime } from "@/assets/commjs/util.js";
	//	import VueResource from 'vue-resource';
	//	Vue.use(VueResource);
	export default {
		data() {
			return {
				pageNum: 1, //当前页数
				numPerPage: 8, //每页数量
				totalPage: 0,
				list: [],
				type: '/order/commdity?function=commodityDemandOrderList',
				transactionStatus: {
					"0": "待付款",
					"1": "支付成功待发货",
					"2": "支付成功已发货",
					"4": "申请退货",
					"-1": "订单过期",
					"-2": "用户取消订单",
				},
				orderOperation: {
					"0": "等待买家付款",
					"1": "发货",
					"2": "已发货",
					"4": "订单详情",
					"-1": "订单详情",
					"-2": "订单详情",
				},
				dialogFormVisible: false,
		        form: {
		          name: '',
		          region: '',
		          date1: '',
		          date2: '',
		          delivery: false,
		          type: [],
		          resource: '',
		          desc: ''
		        },
		        formLabelWidth: '120px',
		        resId:'',
		        active:'0'
			}
		},
		created() {
			if(sessionStorage.getItem('compOfferActiveIndex')=='null'){
				this.selectOrder(this.pageNum, this.numPerPage, this.type)
				console.log("created进来了,当前是第一个tab:",this.pageNum)
			}			
			this.selectOrder(this.pageNum, this.numPerPage, this.type)
		},
		beforeMount(){
			this.pageNum = parseInt(sessionStorage.getItem('compOfferPageNum'));
//			 console.log("beforeMounttab444444444是****this.pageNum：",this.pageNum)			
			window.onpopstate =()=>{
				if(window.location.href == this.$root.urlPath.URL +'/comp/comp_offer'){
			 		var activeIndex = sessionStorage.getItem('compOfferActiveIndex');
			 		this.active = activeIndex
			 		var event = {'name':this.active}
			 		console.log("beforeMounttab是****：",event)
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
				console.log("handleCurrentChange****：",this.type)
				if(sessionStorage.getItem('compOfferActiveIndex')=="2"){
					this.selectOrder2(val, this.numPerPage, this.type)
					sessionStorage.setItem('compOfferPageNum',val);
				}else{
//					essionStorage.setItem('compOfferPageNum',val);
					this.selectOrder(val, this.numPerPage, this.type)
				}

			},
			selectOrder(val, numPerPage, type) {
				this.$http.get(this.$root.urlPath.MJK + this.type + '&numPerPage=' + numPerPage + '&pageNum=' + val).then(function(res) {
					if(res.body.success) {
						this.totalCount = res.body.data.totlCont
//						console.log("res.body.data",res.body.data)
						this.list = res.body.data.orderVOS
//						console.log("res.body.data.arrayList",res.body.data.orderVOS.length)
						if(this.list.length>0){
							for(var i = 0; i < this.list.length; i++) {
								this.list[i].ordpVO.transactionStatus = this.transactionStatus[(this.list[i].ordpVO.status)]
								this.list[i].ordpVO.orderOperation = this.orderOperation[(this.list[i].ordpVO.status)]
								this.list[i].ordpVO.doneTime = getTime(this.list[i].ordpVO.doneTime);
							}
						}

					}
				}, function(res) {

				})
			},
			selectOrder2(val, numPerPage, type) {
				this.$http.get(this.$root.urlPath.MJK + this.type + '&numPerPage=' + numPerPage + '&pageNum=' + val).then(function(res) {
					if(res.body.success) {
						this.list = res.body.data.orderVOS;
						this.totalPage = res.body.data.totalCount
//						console.log("企业，我的供应this.list.length", this.list.length)
						console.log("企业，我的供应", res.body)
						for(var i = 0; i < this.list.length; i++) {
							this.list[i].insertTime = getTime(this.list[i].insertTime);
							this.list[i].transactionStatus = this.transactionStatus[(this.list[i].status)]
							this.list[i].orderOperation = this.orderOperation[(this.list[i].status)]
							this.list[i].orderId2 = this.list[i].id
						}
//						console.log("企业，我的供应ddd", res.body)
					}
				}, function(res) {

				})
			},
			
			onTabClick(event) {
				sessionStorage.setItem('compOfferActiveIndex',event.index);
				console.log("回退的tab是****：",event.index)
				this.getList(event,null)
			},
			onClick(status,orderId) { 
				if(status == 0) {
					// 待付款
				}  else if(status == 1){
					this.dialogFormVisible = true;
					this.resId = orderId;
					// 发货
//					this.deliver(orderId);
				}else {
					// 查看详情
					this.lookOrder(orderId);
				}
			},
			lookOrder(id){
				this.$router.push({path:'/comp/order_buy/details',query:{id:id,status:"1"}})
//				console.log("企业普通订单，我的采购,查看订单orderId", orderId)
			},
			deliver(){
				console.log("发货物流单号",this.form.name+"***"+this.resId);
				this.$http.get(this.$root.urlPath.MJK + "/generalGoodsOrderList/deliver?oid="+this.resId+"&expressNo="+this.form.name).then(function(res) {
					if(res.body.success) {
						if(res.body.data == 0) {
						this.type = '/generalGoodsOrderList/provide?'
						this.selectOrder2(this.pageNum, this.numPerPage,this.type)
					} else {
						alert("发货失败！");
					}
						console.log("deliver",res.body.data)
					}
				}, function(res) {

				})
				this.dialogFormVisible = false;
			},
			getList(event,pageNum){
				switch(event.name) {
					case "0":
						this.type = '/order/commdity?function=commodityDemandOrderList'
						this.pageNum = 1
						this.selectOrder(this.pageNum, this.numPerPage, this.type)
						console.log("切换的tab是：大宗商品")
						break;
					case "1":
						this.type = '/order/server?status=1&function=serverGoodsDemandOrderList'
						this.pageNum = 1
						this.selectOrder(this.pageNum, this.numPerPage, this.type)
						console.log("切换的tab是：服务商品")
						break;
					case "2":
						this.type = '/generalGoodsOrderList/provide?'
						console.log("传进来的当前页数",pageNum)
						if(pageNum==null){
							this.pageNum = 1
							sessionStorage.setItem('compOfferPageNum',1);
						}
						this.selectOrder2(this.pageNum, this.numPerPage, this.type)
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