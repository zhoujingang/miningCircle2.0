<template>
	<div class="main-left">
		<div class="user-tit comp_tit mb-20">						
			<router-link to="/comp/comp_index" class="col-white">{{$t('comm.comp')}}</router-link>
		</div>
		<el-row class="tac">
			<el-menu :default-active="active" :default-openeds="default_open" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
				<el-menu-item class="no-list" index="/comp/comp_info" @click="router('comp_info')">
	      			<template slot="title"><i class="icon icon-user"></i>{{$t('menu.act_info')}}</template>
	      		</el-menu-item>
		        <el-submenu index="1">
		          	<template slot="title"><i class="icon icon-money"></i>{{$t('menu.funds_man')}}</template>
		          		<el-menu-item v-if="compStore.rule.check_fund" index="/comp/comp_funds" @click="router('comp_funds')">{{$t('menu.my_funds')}}</el-menu-item>
		          		<el-menu-item index="/comp/comp_coin" @click="router('comp_coin')">{{$t('menu.coin')}}</el-menu-item>	
		          		<el-menu-item index="/comp/comp_gift" @click="router('comp_gift')">{{$t('menu.gift')}}</el-menu-item>	
		          		<el-menu-item index="/comp/comp_coupon" @click="router('comp_coupon')">{{$t('menu.voucher')}}</el-menu-item>	
		        </el-submenu>
			    <el-submenu index="2">
		        	<template slot="title"><i class="icon icon-reorder"></i>{{$t('menu.order_man')}}</template>
			          	<el-menu-item index="/comp/comp_offer" @click="router('comp_offer')">{{$t('menu.my_order')}}</el-menu-item>
			          	<el-menu-item index="/comp/comp_buy" @click="router('comp_buy')">{{$t('menu.my_shop')}}</el-menu-item>	
			    </el-submenu>
			    <el-submenu index="3">
		        	<template slot="title"><i class="icon icon-ok-sign"></i>{{$t('menu.cert_man')}}</template>
		        		<el-menu-item index="/comp/investor_cert" @click="router('comp_investor')">{{$t('menu.investor')}}</el-menu-item>	
			          	<el-menu-item index="/comp/comp_data" @click="router('comp_data')">{{$t('menu.comp_info')}}</el-menu-item>
			          	
			    </el-submenu>
	      		<el-menu-item class="no-list" index="4" @click="hrefTo">
	      			<template slot="title"><i class="icon icon-home"></i>{{$t('menu.flag_shop')}}</template>
	      		</el-menu-item>
		      	<el-menu-item class="no-list" index="/comp/child_act" @click="router('child_act')">
		      		<template slot="title"><i class="icon icon-group"></i>{{$t('menu.sub_act')}}</template>
		      	</el-menu-item>
	      		<!--<el-menu-item class="no-list" index="/comp/comp_atten" @click="router('comp_atten')">
	      			<template slot="title"><i class="icon icon-envelope-alt"></i>关注中心</template>
	      		</el-menu-item>-->
	      		<el-menu-item class="no-list" index="/comp/comp_news" @click="router('comp_news')">
	      			<template slot="title"><i class="icon icon-envelope-alt"></i>{{$t('menu.msg_man')}}</template>
	      		</el-menu-item>	
		    </el-menu>
		</el-row>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState } from 'vuex';
	
	export default {
		props: ['default_open'],
		data(){
			return{
				active: '',
			}
		},
		created() { 
			var currentUrl = this.$route.path.split('/')	
			this.active = '/' + currentUrl[1] + '/' +currentUrl[2] ;
		},
		computed: mapState({
			    compStore: state => state.compInfo
		}),
		methods: {
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      router(url) {
	      	sessionStorage.setItem('compOfferActiveIndex','null');
	      	sessionStorage.setItem('compBuyActiveIndex','null');
	      	sessionStorage.setItem('compBuyPageNum','null');
	      	sessionStorage.setItem('compOfferPageNum','null');
	      	this.$router.push('/comp/'+url)

	      },
	      hrefTo() {
	      	window.location.href = 'http://www.miningcircle.com/store.do?web&id='+this.compStore.companyId;
	      }
	    }
	}
</script>

<style>
	.tac{
      	box-shadow: 2px 2px 5px #d9d9d9;
  	}
    .el-menu{
      	background: #fff;
      	color: #333;
    } 
    .el-submenu .el-menu{
    	padding: 10px 0;
    	background: #daecf4;
    }
    
	.el-submenu .el-menu-item{
		height: 25px;
		line-height: 25px;
		color: #535353;
		min-width: 0;
		font-size: 14px;
		padding-left: 55px !important;
	}	
	.el-menu-item, .el-submenu__title{
		color: #333;
	}
	.el-submenu__title,.no-list{
		height: 54px;
		font-size: 17px;
		border-bottom: 1px solid #d2d2d2;
		padding-left: 20px !important;
	}
	.el-submenu__title:hover,.no-list:hover{
		color: #00a0e9;
		background: #fff;
	}
	.el-submenu__title:hover .icon,.no-list:hover .icon{
		color: #00a0e9;
	}
	.el-submenu .el-menu-item:hover{
		color: #00a0e9;
		background: #daecf4;
	}
	.icon{
		position: relative;
		top: -2px;
		display: inline-block;
		font-size: 20px;
		width: 23px;
		margin-right: 13px;
		color: #b5b5b5;
	}
	.is-active .el-submenu__title,.is-active .icon{
		color: #00a0e9;
	}
	 .el-menu-item.is-active{
	 	color: #00a0e9;
	 }
	 .no-list.is-active{
	 	color: #00a0e9;
	 }
	 .el-submenu__title i,.el-menu-item i{
	 	color: #b5b5b5;
	 }
</style>