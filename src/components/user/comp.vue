<template>
	<div class="user-page">
		<mc-header></mc-header>
		<!--头部-->
		<switch_btn></switch_btn>
		<!--个人中心用户中心切换-->
		<div class="container mt-20 main-con">
			<div class="row dis-fl">
				<comp_menu :default_open="default_open"></comp_menu>
				<!--左边栏菜单-->
				<router-view></router-view>
			</div>
			
		</div>
		<mc-footer></mc-footer>
	</div>
</template>

<script>
	import Vue from 'vue';
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	import switch_btn from '@/components/user/comm/switch-btn.vue';
	import comp_menu from '@/components/user/comm/comp-menu.vue';
	import {getCookie} from '@/assets/commjs/util.js'
	export default {
		components: {
		    switch_btn,
		    comp_menu
		},
		data(){
			return{
				default_open: ['1','2','3','4'],//企业中心首页默认展开
			}
		},
		beforeRouteEnter(to, from, next){
			if(getCookie('allow_Comp')){
				next()
			}else{
				window.location.href = 'http://www.miningcircle.com'
			}
		},
		created(){
//			const params = {};
//			this.$http.get(this.$root.urlPath.MJK+'/user/userHome',{params:params}).then(function(res){
//				if(res.body.success){
//					console.log(res)
//					this.userBO = res.body.data.userBO;
//					this.level = '/static/img/user/level' +this.userBO.vipLevel+'.png';
//				}
////				console.log(res);		
//			},function(res){
//				
//			})
		},
		methods: {
	    }
	}
</script>

<style>
      @import '../../../static/css/user/user.css'; 
 
</style>