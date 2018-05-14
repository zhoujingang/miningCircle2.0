<template>
	<div class="main-left">
		<div class="user-tit mb-20">						
			<router-link to="/user/user_index" class="col-white">{{$t('comm.user')}}</router-link>
		</div>		
		<el-row class="tac">
			<el-menu :default-active="active" :default-openeds="default_open" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
		        <el-submenu index="1">
		          	<template slot="title"><i class="icon icon-user"></i>{{$t('menu.act_man')}}</template>
		          		<el-menu-item index="/user/act_info" @click="router('act_info')">{{$t('menu.act_info')}}</el-menu-item>
		          		<el-menu-item index="/user/act_security" @click="router('act_security')">{{$t('menu.act_sec')}}</el-menu-item>						       
		        </el-submenu>
			    <el-submenu index="2">
		        	<template slot="title"><i class="icon icon-money"></i>{{$t('menu.funds_man')}}</template>
			          	<el-menu-item index="/user/act_funds" @click="router('act_funds')">{{$t('menu.my_funds')}}</el-menu-item>
			          	<el-menu-item index="/user/act_coin" @click="router('act_coin')">{{$t('menu.coin')}}</el-menu-item>	
			          	<el-menu-item index="/user/act_gift" @click="router('act_gift')">{{$t('menu.gift')}}</el-menu-item>	
			          	<el-menu-item index="/user/act_coupon" @click="router('act_coupon')">{{$t('menu.voucher')}}</el-menu-item>	
			    </el-submenu>
				<el-submenu index="3">
		        	<template slot="title"><i class="icon icon-reorder"></i>{{$t('menu.order_man')}}</template>
		          		<el-menu-item index="/user/order_offer" @click="router('order_offer')">{{$t('menu.my_order')}}</el-menu-item>
		          		<el-menu-item index="/user/order_buy" @click="router('order_buy')">{{$t('menu.my_shop')}}</el-menu-item>						       
		      	</el-submenu>
		      	<el-submenu index="4">
		        	<template slot="title"><i class="icon icon-ok-sign"></i>{{$t('menu.cert_man')}}</template>
		          		<el-menu-item index="/user/act_cert" @click="router('act_data')">{{$t('menu.person')}}</el-menu-item>	
		          		<el-menu-item index="#" @click="myResume">{{$t('menu.my_resume')}}</el-menu-item>					       
		          		
		      	</el-submenu>
		      	<el-menu-item class="no-list" index="/user/act_atten" @click="router('act_atten')">
		      		<template slot="title"><i class="icon icon-heart"></i>{{$t('menu.atten_man')}}</template>
		      	</el-menu-item>
	      		<el-menu-item class="no-list" index="/user/act_news" @click="router('act_news')">
	      			<template slot="title"><i class="icon icon-envelope-alt"></i>{{$t('menu.msg_man')}}</template>
	      		</el-menu-item>						
		    </el-menu>
		</el-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex';	
	export default {
		props: ['default_open'],
		data(){
			return{
				active: '',
			}
		},
		computed: mapState({
			    userId: state => state.userInfo.userId,
			    authSkill: state => state.userInfo.userInfo.authSkill     
		}),
		created (){	
			var currentUrl = this.$route.path.split('/')	
			this.active = '/' + currentUrl[1] + '/' +currentUrl[2] ;
		}, 
		watch: {
			'$route'(to, from) {
			    var currentUrl = this.$route.path.split('/')	
				this.active = '/' + currentUrl[1] + '/' +currentUrl[2] ;
		  	}
		},
		methods: {
	      handleOpen(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      },
	      router(url) {
	      	this.$router.push('/user/'+url)
	      },
	      myResume(){
	      	if(this.authSkill == '1'){
	      		window.location.href = "http://www.miningcircle.com/store.do?web&id=" + this.userId;
	      	}else{
	      		this.$router.push('/user/act_cert')
	      	}
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