<template>
	<div class="user-page">
		<mc-header></mc-header>
		<!--头部-->
		<switch_btn :current="'user'"></switch_btn>
		<!--个人中心用户中心切换-->
		<div class="container mt-20 main-con">
			<div class="row dis-fl">
				<user_menu :default_open="default_open"></user_menu>
				<!--左边栏菜单-->
				<router-view></router-view>
			</div>
			
		</div>
		<mc-footer></mc-footer>
	</div>
</template>

<script>
	import Vue from 'vue';
	import switch_btn from '@/components/user/comm/switch-btn.vue';
	import user_menu from '@/components/user/comm/user-menu.vue';
	
	export default {
		components: {
		    switch_btn,
		    user_menu
		},
		data(){
			return{
				default_open: ['1','2','3','4'],//用户首页默认展开			
			}
		},
//		beforeRouteEnter(to, from, next){
//			next(vm => {
//				var path = to.path.toString();
//				alert(path);
//			})
//		},
//		beforeUpdate:function(){
//		    var path = this.$route.matched[1].path;
//		    console.log(path);
//		},
		methods: {
	    }
	}
</script>

<style>
      @import '../../../static/css/user/user.css'; 
 
</style>