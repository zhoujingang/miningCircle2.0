<template>
	<div class="user-head bg-pri">
		<div class="container">
			<div class="row">
				<div class="col-sm-2">
					<a href="http://www.miningcircle.com">					
						<img class="logo" src="/static/img/user/logo.png" alt="" />
					</a>
				</div>
				<div class="col-sm-10 right">
<!--					<a href="" class="pull-left f-18 col-white pt-5 pl-20">返回首页</a>-->
					<span v-if="current=='user'" class="btn-out">
						<router-link class="btn person col-white" to="/user">{{$t('comm.user_cert')}}</router-link>
						<button :class="(userStatus == 4&&status == 2)||(userStatus == 2&&status == 2)?'active':''" @click="isAllow" class="btn comp col-white notAllow">{{$t('comm.comp_cert')}}</button>
						<!--<button class="btn person col-white" @click="router('/user')">个人中心</button>
						<button class="btn comp col-white active" @click="router('/comp')">企业中心</button>-->

					</span>
					<span v-else class="btn-out">
						<router-link class="btn person col-white active" to="/user">{{$t('comm.user_cert')}}</router-link>
						<router-link  class="btn comp col-white" to="/comp">{{$t('comm.comp_cert')}}</router-link>
					</span>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	
	import {setCookie} from '@/assets/commjs/util.js';
	import {getCookie} from '@/assets/commjs/util.js';
	import {delCookie} from '@/assets/commjs/util.js';
	
	export default{
		props:['current'],
		data(){
			return{
				userCompanyBO: '',
				userStatus: '',
				status: ''
			}
		},
		created() {
			this.$http.get(this.$root.urlPath.MJK + '/user/userHome').then(function(res){
				if(res.body.success){
					var userBaseVO = res.body.data.userBaseVO;
					var rule_list = userBaseVO.rule?userBaseVO.rule.split(','):[];
					rule_list = rule_list.map(function(item,index,array){
						return item.substr(1);
					})
					var rule_Lists = {};
					for (var i = 0; i < rule_list.length; i++) {
						rule_Lists[rule_list[i]] = true;
					}			
					this.userStatus = res.body.data.userBaseVO.userCompanyStatus;					
					if(res.body.data.companyBaseVO){
						var companyBaseVO = res.body.data.companyBaseVO	
						this.status = companyBaseVO.status;
						this.$store.commit('compInfo',companyBaseVO);//向store中存储企业信息						
						this.$store.commit('companyId',companyBaseVO.companyId);//向store中存储企业id
						if((this.userStatus == 4&&this.status ==2)||(this.userStatus == 2&&this.status ==2)){
							setCookie('allow_Comp',true);//设置cookie,有权限进入企业中心
						}else{
							if(getCookie('allow_Comp')){
								delCookie('allow_Comp');
								this.$router.push('/user')
							}
						}
					} else {
						if(getCookie('allow_Comp')){
							delCookie('allow_Comp');
							this.$router.push('/user')
						}
					}
					this.$store.commit('userInfo',userBaseVO);//向store中存储用户信息
					
					this.$store.commit('rule',rule_Lists);//向store中存储用户权限
					this.$store.commit('userStates',this.userStatus);//向store中存储当前用户身份
					
					this.$store.commit('userId',userBaseVO.userId);//向store中存储用户ID	
					this.$store.commit('userName',userBaseVO.userName);//向store中存储用户名					
					
					console.log(this.$store.state)
					
				}
			})
		},
		methods: {
			isAllow() {
				if(getCookie('allow_Comp')){
					this.$router.push('/comp');
					
				}else{
					return false;
				}
			}
		}
	}
</script>

<style>
	@import '../../../../static/css/user/user.css'; 
	.user-head .notAllow{
		cursor: not-allowed;
		background: #afcbd7;
		box-shadow: 0px 0px 2px 3px #c0c7cb inset;
	}
	.notAllow:hover{
		background: #b4bbbe;
	}
	.user-head .active{
		cursor: pointer;
		background: #00baff;
		box-shadow: none;
	}
	.user-head .active:hover{
		background: #0091E0;
		
	}
</style>