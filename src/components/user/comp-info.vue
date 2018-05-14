<template>
	<div class="flex-1 act-con">
		<p class="com-title bg-pri">{{$t('comp.info.tit')}}</p>
		<p class="tip">{{$t('comp.info.tip')}}</p>
		<div class="table-out f-18">
			<table style="width: 100%;">
				<tr>
					<th style="width:25%"></th>
					<th></th>
				</tr>
				<tr>
					<td>{{$t('comp.info.name')}}</td>
					<td>{{compInfo.name}}</td>
				</tr>
				<tr>
					<td>{{$t('comp.info.state')}}</td>
					<td>普通认证企业</td>
				</tr>
				<tr>
					<td>{{$t('comp.info.funds_pwd')}}</td>
					<td>
						<p v-if="userStates == 4">
							
							<router-link to="/comp/comp_set_fundspwd" class="col-pri f-14" v-if="ismobile">{{$t('comp.info.tip2')}}</router-link>
							<router-link to="/user/act_security/act_set_phone" class="col-pri f-14" v-else="ismobile">尚未绑定手机号，前去绑定手机号</router-link>
						</p>
						<span v-else>您尚未拥有此权限</span>
					</td>
				</tr>
				<tr>
					<td>{{$t('comp.info.create_time')}}</td>
					<td><span class="col-999">{{this.created_time}}</span></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	import {mapState} from 'vuex';
	import {getTime2} from '@/assets/commjs/util.js';
	export default{
		data(){
			return{
				userBO:{
					
				},
				created_time:'',
				ismobile: ''
			}
		},
		created(){
			this.$http.get(this.$root.urlPath.MJK+'/company/capitalShow').then(function(res){
				if(res.body.success){					
					console.log(res.body.data)
					this.userBO = res.body.data;
					var created_time = this.userBO.createdTime;
					this.created_time = getTime2(created_time);
					this.ismobile = this.userBO.adminMobile?this.userBO.adminMobile: '';
				}
			},function(res){
				
			})
		},
		computed: mapState({
			userStates: store => store.userInfo.userStates,
			compInfo: store => store.compInfo.compInfo
		}),
		methods: {
			 getTime(timeStamp) {     
   				var date = new Date();  
			    date.setTime(timeStamp);  
			    var y = date.getFullYear();      
			    var m = date.getMonth() + 1;      
			    m = m < 10 ? ('0' + m) : m;      
			    var d = date.getDate();      
			    d = d < 10 ? ('0' + d) : d;      
			    var h = date.getHours();    
			    h = h < 10 ? ('0' + h) : h;    
			    var minute = date.getMinutes();    
			    var second = date.getSeconds();    
			    minute = minute < 10 ? ('0' + minute) : minute;      
			    second = second < 10 ? ('0' + second) : second;     
			    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
    		}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>