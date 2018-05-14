<template>
	<div class="head-top">
		<div class="container text-right">
			<div class="row">
				<a href="http://www.miningcircle.com">{{ $t('header.index') }}</a>
				<span>|</span>
				<div v-show="!userBO.userName" class="dis-in">					
					<router-link to="/login" id="use-id" class="text-overflow-1 col-pri" style="overflow: hidden;">{{ $t('header.login') }}</router-link>
					<span>|</span>
					<router-link to="/reg" id="use-id" class="text-overflow-1 col-pri"  style="overflow: hidden;">{{ $t('header.reg') }}</router-link>
				</div>
				<div v-show="userBO.userName" class="dis-in">				
					<router-link class="col-pri username text-overflow" to="/user/user_index">{{userBO.userName}}</router-link>
					<span>/</span>
					<a href="/login" class="cur-p" @click="del">{{ $t('header.exit') }}</a>
				</div>
				<span>|</span>
				<!--<a href="javascript:;">{{ $t('header.mobile') }}</a>
				<span>|</span>-->
				<a href="http://www.miningcircle.com/app.do" target="_blank">APP</a>
				<span>|</span>
				<el-dropdown @command="handleCommand" class="cur-p">
				  <span class="el-dropdown-link f-12">
				    {{ $t('header.language') }}<i class="el-icon-caret-bottom el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown" class="language">
				    <el-dropdown-item command="zh-cn">{{ $t('header.Chinese') }}</el-dropdown-item>
				    <el-dropdown-item command="en">{{ $t('header.English') }}</el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
				<a href="" target="_blank">{{ $t('header.about') }}</a>
			</div>
		</div>
	</div>
</template>

<script>
	import bus from '../../bus'
	import {delCookie} from '@/assets/commjs/util.js';
	export default {
        data () {
            return {
                userBO: {
					
                }
            }
        },
        created () {
        	const params = {}
			this.$http.get(this.$root.urlPath.MJK+'/account/accountInfo',{params:params}).then(function(res){
				if(res.body.success){
					this.userBO = res.body.data;
				}
			},function(res){
				
			})
    	},
	    methods: {
	     	del() {
		      	delCookie('MC_UID');
		      	delCookie('allow_Comp');
		      	sessionStorage.clear();
		    },
      		handleCommand(command) {
        		bus.$emit('chang-langs', command)
      		}
	    }
      
    }
</script>

<style lang="css">
.el-message{
  	top: 20%;
  }
/*常用颜色*/
.col-pri{color: #00a0e9}
.bg-pri{background: #00a0e9}
.bg-f2{background: #f2f2f2}
.bg-f8{background: #f8f8f8}
.btn:focus, .btn:hover {
    color: #fff;
    text-decoration: none;
}
.bor-b-dashed{border-bottom:1px dashed #448aca}
.h-182{
	height:182px;
}
/*头部*/
.head-top{
	background: #f2f2f2;
	height: 30px;
	line-height: 30px;
	font-size: 12px;
	font-family: '宋体'
}
.head-top a,.head-top span{
	display: inline-block;
	overflow: hidden;

}
.head-top .username{
	display: inline-block;
	max-width: 120px;
	overflow: hidden;
}
#use-id{
	max-width: 100px;
	overflow: visible;
}
.head-top span{
	/*color: #999;*/
	padding: 0 5px;
}
.user-toggle{
	position: absolute;
	top:100%;
	left:0;
	z-index: 1000;
}
#use-id,#use-id a{
	color: #00a0e9;
}
#use-id a{
	/*float: left;*/
	max-width: 100px;
	overflow: hidden;
	/*position: relative;*/
}
#use-id .out{
	float: right;
	color: #333;
	font-size: 12px;
}
#use-id .dropdown-menu{
	top:70%;
	left: -5px;
	min-width: 120px;
	height: 32px;
	display: none;
}
#use-id:hover .dropdown-menu{
	display: block;
}
.language{
	top: 20px !important;
}
</style>