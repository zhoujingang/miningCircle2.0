<template>
	<div class="flex-1 order-offer">
		<div class="box-con bg-white">
			<p class="com-title bg-pri">订单详情</p>
		</div>

		<div class="con">
			<el-row>
				<el-col :span="24">
					<div class="grid-content bg-purple-dark">
						<div class="order-info pro-list">
							<div class="clearfix pro-num col-555">
								<div class="tr1" style="width:100%">
									<span v-if="status==0">订单编号：{{order.orderNumber}}</span>
									<span v-else>订单编号：{{order.orderItems[0].orderId}}</span>
									<span class="pl-20" >下单日期：{{order.createTiem}}</span>
								</div>
							</div>

							<div class="tablee">
								<table class="full-w">
									<tr>
										<td><span>|&nbsp客户姓名</span>{{order.userName}}</td>
										<td><span>|&nbsp客户电话</span>{{order.userMob}}</td>
									</tr>
									<tr>
										<td >
											<span>|&nbsp客户地址</span> {{order.userAddress}}
										</td>
										<td >
											<div v-show="this.status==1"><span >|&nbsp支付单号</span> {{order.orderNumber}}</div>
										</td>										
									</tr>
									<tr class="bordertop">								
										<td >
											<span>|&nbsp发票抬头</span> {{order.invoiceTitle}}
										</td>
										<td >
											<!--colspan="2"-->
											<span>|&nbsp物流单号</span> {{order.expressNum}}
										</td>												
									</tr>
								</table>
							</div>

						</div>
					</div>
				</el-col>
			</el-row>
			<div class="ware-info">
				<el-table border :data="list">
					<el-table-column prop="productName" label="商品名称">
					</el-table-column>
					<el-table-column prop="price" label="单价（元）">
					</el-table-column>
					<el-table-column prop="num" label="数量">
					</el-table-column>
					<el-table-column prop="totalPrice" label="总价">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	import { getTime } from "@/assets/commjs/util.js";
	export default {
		data() {
			return {
				list:[],
				status:'',
				order:{}
			}
		},
		created() {
			this.lookOrder()
		},
		methods: {
			lookOrder() {
				var orderId = this.$route.query.id
				this.status = this.$route.query.status
//				console.log("this.$route.params.id", this.$route.query.id+"...."+this.$route.query.status)
				this.$http.get(this.$root.urlPath.MJK + '/generalGoodsOrderList/getOrderDetails?&status=0&orderId=' + orderId).then(function(res) {
					this.order = res.body.data
					this.list = this.order.orderItems
					console.log("res.body.data",res.body.data)
					this.order.createTiem = getTime(this.order.createTiem);
					if(this.list.invoiceTitle === 'null' || this.list.invoiceTitle === null){
						this.list.invoiceTitle = ""
					}
						if(this.list.length>0){
							for(var i = 0; i < this.list.length; i++) {
								this.list[i].num = this.list[i].number + this.list[i].unit
							}
						}

					

				})
			},
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
	.order-info .tablee span {
		margin-right: 50px;
		color: rgb(120, 120, 120)
	}
	
	table td {
		padding: 15px;
	}
	
	.bordertop {
		border-top: 1px solid #ccc;
	}
	
	.el-table th {
		background-color: #f0f5f5 !important;
	}
</style>