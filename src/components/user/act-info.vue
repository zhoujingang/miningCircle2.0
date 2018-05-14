<template>
	<div class="flex-1 act-con">
		<p class="com-title bg-pri">{{$t('user.info.tit')}}</p>
		<p class="tip">温馨提示：矿业账号是您在本网唯一的标识，只能修改一次。</p>
		<div class="table-out f-18">
			<table style="width: 100%;">
				<tr>
					<th style="width:25%"></th>
					<th></th>
				</tr>
				<tr>
					<td>{{$t('user.info.account')}}</td>
					<td><span class="mr-20 pr-20">{{this.userBO.userName}}</span><el-button type="text" class="pl-20 ml-20" @click="updateUsername" v-show="userNameEditTermination !=1">修改矿业账号，只能修改一次</el-button></td>
				</tr>
				<tr>
					<td>{{$t('user.info.status')}}</td>
					<td>
						<span v-if="this.userBO.authSkill" class="level1">{{this.identity}}</span>
						<span v-else class="level2">尚未认证<router-link to="/user/act_cert" class="col-pri pl-20">去认证</router-link></span>
						<!--<span class="col-999 level2">专家用户{{this.userBO.authSkill}}</span>-->
					</td>
				</tr>
				<tr>
					<td>{{$t('user.info.level')}}</td>
					<td><img :src="this.level" alt="" /><span class="pl-10">{{this.vip_level}}</span> <button class="join btn pull-right" @click="joinVip">加入vip（8折）</button></td>
				</tr>
				<tr>
					<td>{{$t('user.info.time')}}</td>
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
	export default{
		data(){
			return{
				userBO:{
					
				},
				userNameEditTermination: '',
				identity: '',
				identcode: {
					'0': '尚未认证',
					'1': '普通人才',
					'2': '专家人才'
				},
				level: '',
				vip_level: '',
				created_time:''
			}
		},
		created(){
			this.load();

		},
		methods: {
			load() {
				this.$http.get(this.$root.urlPath.MJK+'/account/accountInfo').then(function(res){
					if(res.body.success){					
						this.userBO = res.body.data;
						this.userNameEditTermination = this.userBO.userNameEditTermination;
						this.identity = this.identcode[this.userBO.authSkill];
						this.level = '/static/img/user/level' +this.userBO.vipLevel+'.png';
						var level =  this.userBO.vipLevel;
						switch (level){
							case 0: 
							this.vip_level = '普通会员';
							break;
							case 1: 
							this.vip_level = '铜牌会员';
							break;
							case 2: 
							this.vip_level = '银牌会员';
							break;
							case 3: 
							this.vip_level = '金牌会员';
							break;
							case 4: 
							this.vip_level = '钻石会员';
							break;
							default:
							this.vip_level = " "; 
						}
						var created_time = this.userBO.createdTime;
						this.created_time = this.getTime(created_time);
					}
				},function(res){
					
				})	
			},
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
    		},
    		updateUsername() {
        		this.$prompt('请输入账户名 (5-24个字符,不能为纯数字，可以包含字母、数字、_、-)', '提示', {
          			confirmButtonText: '确定',
          			cancelButtonText: '取消',
          			inputType: 'text',
          			inputPattern: /^(?![^a-zA-Z]+$)[\w-]{5,24}$/,
          			inputErrorMessage: '账户格式不正确'
        		}).then(({ value }) => {
        			this.$http.get(this.$root.urlPath.MJK+'/account/updateUserName?userName='+ value).then(function(res){
        				if(res.body.success){
        					this.$router.go(0);
        				}else{
        					this.$message({
								showClose: true,
								message: res.body.errMsg,
								type: 'error'
							})
        				}
        			},function(){ 
        				
        			})         			
        		}).catch(() => {
        			
        		});
    		},
    		joinVip() {
    			this.$http.get(this.$root.urlPath.MC+'/mall.do?addcart2&resid=USER-LEVEL-GOLD9800&purQuantity=1&type=7000&catid=0&status=1000&oname=vip&comments=矿业圈VIP会员费9800').then(function(res){
    				var str = res.body.obj;
//  				window.location.href = this.$root.urlPath.MC +"/mall.do?cartSettle&oids='" + str + "'&submitType=putong&isRequired=no";
    				window.location.href = "http://www.miningcircle.com/mall.do?cartSettle&oids='" + str + "'&submitType=putong&isRequired=no";
    				
    				
    			},function(){
    				
    			})
    		}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>