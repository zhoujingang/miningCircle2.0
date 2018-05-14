<template>
	<div class="flex-1 order-offer">
		<div class="box-con bg-white">
			<p class="com-title bg-pri">{{$t('user.order.service_goods')}}</p>
		</div>
		<div class="con">
			<div class="f-w t-header clearfix">
				<div class="tr1" style="width: 30%;">{{$t('user.order.order_information')}}</div>
				<div class="tr" style="width: 14%;">{{$t('user.order.price')}}</div>
				<div class="tr" style="width: 14%;">{{$t('user.order.order_quantity')}}</div>
				<div class="tr" style="width: 14%;">{{$t('user.order.order_amount')}}</div>
				<div class="tr" style="width: 14%;">{{$t('user.order.trading_status')}}</div>
				<div class="tr" style="width: 14%;">{{$t('user.order.trading_operations')}}</div>
			</div>
			<!-- 普通商品我的供应-->
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
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="numPerPage" layout="prev, pager, next, jumper" :total="totalPage">
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
	export default {
		data() {
			return {
				pageNum: 1, //当前页数
				numPerPage: 10, //每页数量
				totalPage: 0,
				list: [],
			}
		},
		created() {
			this.selectOrder(this.pageNum, this.numPerPage)
		},
		methods: {
			handleSizeChange(val) {

			},
			handleCurrentChange(val) {

				this.selectOrder(val, this.numPerPage)
			},
			selectOrder(val, numPerPage) {
				this.$http.get(this.$root.urlPath.MJK + '/generalGoodsOrderList/provide?&numPerPage=' + numPerPage + '&pageNum=' + val).then(function(res) {
					if(res.body.success) {
						console.log("lengthssssss", res.body.data.orderVOS.length)
						this.totalPage = res.body.data.totalCount
						this.list = res.body.data.orderVOS
						if(this.list.length>0){
							
						}
						

					}
				}, function(res) {

				})
			}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
</style>