<template>
	<div class="flex-1 act-sec">
		<p class="com-title bg-pri">{{$t('user.info.tit')}}</p>
		<p class="tip line-h-25">{{$t('user.security.tip')}}</p>
		
		<div class="table-out f-18">
			<table style="width: 100%;">
				<tr>
					<th style="width: 20%"></th>
					<th style="width: 25%;"></th>
					<th></th>
				</tr>
				<tr>
					<td>{{$t('user.security.mobile')}}</td>
					<td>{{userBO.mobile}}</td>
					<td class="td-more cur-p"><span v-on:click="router('/user/act_security/act_set_phone')">{{userBO.mobile?'修改手机号码':'绑定手机号码'}}</span></td>
				</tr>
				<tr>
					<td>{{$t('user.security.email')}}</td>
					<td>{{userBO.email? this.userBO.email:'尚未绑定邮箱'}}</td>
					<td class="td-more cur-p"><span v-on:click="router('/user/act_security/act_set_email')">修改或绑定邮箱</span></td>
				</tr>
				<tr>
					<td>{{$t('user.security.login_pwd')}}</td>
					<td>********</td>
					<td class="td-more cur-p"><span v-on:click="router('/user/act_security/act_set_pwd')">修改登录密码</span></td>
				</tr>
				<tr>
					<td>{{$t('user.security.funds_pwd')}}</td>
					<td>{{isFundsPwd?'********':''}}</td>
					<td class="td-more cur-p"><span v-on:click="router('/user/act_security/act_set_fundspwd')">{{isFundsPwd?'修改资金密码':'设置资金密码'}}</span></td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	export default{
		data(){
			return{
				userBO:{
					
				},
				isFundsPwd: ''
			}
		},
		created(){
			const params = {}
			this.$http.get(this.$root.urlPath.MJK+'/account/safetyInfo',{params:params}).then(function(res){
				if(res.body.success){
					this.userBO = res.body.data;
					var mobile = this.userBO.mobile;
					if(mobile){						
						this.userBO.mobile = mobile.substring(3,0)+'****'+mobile.substring(7)
					}
				}
			},function(res){
				
			})
			this.$http.get(this.$root.urlPath.MJK+ '/account/userAssetIsExit').then(function(res){
				if(res.body.success){
					this.isFundsPwd = res.body.data
				}
			},function(res){
				
			})
		},
		methods:{
			router(url) {
		      	this.$router.push(url)
		    }
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>