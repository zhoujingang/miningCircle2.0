<template>
	<div class="flex-1 child-act box-con bg-white">
		<p class="com-title bg-pri">{{$t('comp.sub_act.tit')}}</p>
		<el-row class="pd-10">
			<el-col :span="4">
				<el-select v-model="filterPosition" :placeholder="$t('comp.sub_act.all')" @change="positionFilter">
					    <el-option
					      v-for="item in options2"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
			</el-col>
			<!--<el-col :span="4" class="pull-right text-right">
				<button class="btn invite">邀请入职</button>
			</el-col>-->
		</el-row>
		<div class="pd-10 col-555" v-loading="loading">
			<table style="width: 100%;" class="t-head">
				<tr>
					<th style="width:15%">{{$t('comp.sub_act.account')}}</th>
					<th style="width:10%">{{$t('comp.sub_act.position')}}</th>
					<th style="width:12%">{{$t('comp.sub_act.tel')}}</th>
					<th style="width:22%">{{$t('comp.sub_act.email')}}</th>
					<th style="width:10%">{{$t('comp.sub_act.status')}}</th>
					<th style="width:18%" class="text-center">{{$t('comp.sub_act.operate')}}</th>
					<th style="width:13%" class="text-center">{{$t('comp.sub_act.remark')}}</th>
				</tr>
			</table>
			<div style="min-height: 440px;">			
				<div v-for="(item,index) in list" class="lists">		
					<table  style="width: 100%;">
						<tr>
							<td style="width:15%;"><p class="text-overflow" style="max-width: 100px;">{{item.userName}}</p></td>
							<td style="width:10%">{{job[position[index]]?job[position[index]]:item.position}}</td>
							<td style="width:12%">{{item.mobile}}</td>
							<td style="width:22%">{{item.email}}</td>
							<td style="width:10%">{{item.status}}</td>
							<td style="width:18%">
								<el-row v-if="currentPosition == 0"><!--管理员身份-->
									<el-col :span="9" v-show="item.status=='正常'">
										<div class="pos-r" v-if="position[index] == '员工'||position[index] == 4000">
											<!--<button v-show="opt_model[index]" class="btn col-white bg-pri model" @click="close_model(index)">操作</button>-->										
											<button class="btn col-white bg-red" v-if="position[index] == '员工'||position[index] == 4000" @click="dismissal(item.userId)">解聘</button>
										</div>
										<div style="visibility: hidden;" v-else-if="position[index] == '管理员'||position[index] == 0">管理员</div>							
										<button class="btn col-white bg-green" v-else @click="get_jurisdiction(index,item.userId)">权限</button>								
									</el-col>
									<el-col :span="24" v-show="item.status=='正在申请中'">
										<el-row>
											<el-col :span="9">
												<button v-show="item.status=='正在申请中'" class="btn col-white bg-green" @click="agree(item.userId)">通过</button>				
											</el-col>
											<el-col :span="15">										
												<button v-show="item.status=='正在申请中'" class="btn col-white bg-orange" @click="dismissal(item.userId)">不通过</button>
											</el-col>
										</el-row>
									</el-col>
									<el-col :span="15" v-show="item.status =='正常'">
										<el-select v-model="position[index]" placeholder="" @change="posit(item.userId,index)">
									    	<el-option  v-for="(item,idx) in options" :disabled="(position[index] == '管理员'||position[index] == 0)&&numOfManager<=1&&idx>0" :key="item.value" :label="item.label" :value="item.value"></el-option>
										</el-select>
									</el-col>
								</el-row>
								<el-row v-if="currentPosition == 4000&&item.userId == userId" class="text-center"><!--员工身份-->
									<button class="btn col-white bg-red" @click="dimission">离职</button>
								</el-row>
								<el-row v-if="currentPosition != 4000&&currentPosition != 0&&item.userId == userId" class="text-center"><!--其他身份-->
									<button class="btn col-white bg-green" @click="get_jurisdiction(index,item.userId)">权限</button>
									<button class="btn col-white bg-red" @click="delJurisdiction">解除权限</button>
									
								</el-row>
							</td>
							<td style="width:13%" class="text-center">
								<div v-if="currentPosition == 0">							
									<span class="remark text-overflow">{{item.remark}}</span><i class="icon-edit" @click="remark(item.userId,item.describe)"></i>
								</div>
								<div v-else>
									<span class="remark text-overflow">{{item.remark}}</span>
								</div>
							</td>
						</tr>
					</table>	
					<div class="jurisdiction bg-f2" v-if="jurisdictions_show[index]">
						<el-row>
							<el-col :span="2">
								<div>行政类权限</div>							
							</el-col>
							<el-col :span="22">							
								<template>
								  	<el-checkbox :indeterminate="isIndeterminate" v-model="admins_checkAll" @change="handleCheckAllChange" :disabled="currentPosition != 0">全选</el-checkbox>
								  	<div style="margin: 15px 0;"></div>
								  	<el-checkbox-group v-model="checked_admins" @change="jurisdictionChange">
								    	<el-checkbox v-for="item in jurisdictionKinds.admins" :label="item.id" :key="item.id" :disabled="currentPosition != 0">{{item.name}}</el-checkbox>
								  	</el-checkbox-group>
								</template>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="2">
								<div>业务类权限</div>							
							</el-col>
							<el-col :span="22">
								<template>
								  	<el-checkbox :indeterminate="isIndeterminate2" v-model="business_checkAll" @change="handleCheckAllChange2" :disabled="currentPosition != 0">全选</el-checkbox>
								  	<div style="margin: 15px 0;"></div>
								  	<el-checkbox-group v-model="checked_business" @change="jurisdictionChange2">
								    <el-checkbox v-for="item in jurisdictionKinds.business" :label="item.id" :key="item.id" :disabled="currentPosition != 0">{{item.name}}</el-checkbox>
								  </el-checkbox-group>
								</template>						
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="2">
								<div>财务类权限</div>							
							</el-col>
							<el-col :span="22">							
								<template>						
								  	<el-checkbox :indeterminate="isIndeterminate3" v-model="finance_checkAll" @change="handleCheckAllChange3" :disabled="currentPosition != 0">全选</el-checkbox>
								  	<div style="margin: 15px 0;"></div>
							  		<el-checkbox-group v-model="checked_finance" @change="jurisdictionChange3">
								    	<el-checkbox v-for="item in jurisdictionKinds.finance" :label="item.id" :key="item.id" :disabled="currentPosition != 0">{{item.name}}</el-checkbox>
								  	</el-checkbox-group>
								</template>
							</el-col>
						</el-row>
						<div class="text-right" v-if="currentPosition == 0">
							<button class="btn bg-b5 btn-opt mr-20" @click="cancle(index)">取消</button><button class="btn bg-green btn-opt" @click="give_jurisdiction(item.userId,index)">确定</button>
						</div>
					</div>
				</div>
			</div>
			<div class="clearfix pt-20 pb-20">
				<div class="text-center">
					<div class="inline-block">
					    <el-pagination
					      @size-change="handleSizeChange"
					      @current-change="handleCurrentChange"
					      :current-page.sync="pageNum"
					      :page-size="numPerPage"
					      layout="prev, pager, next, jumper"
					      :total="totalCount">
					    </el-pagination>
					 </div>
				</div>	
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState } from 'vuex';
	import { delCookie } from '@/assets/commjs/util.js';
	export default{
		data(){
			return{
				loading: false,
				currentPosition: '',//当前登录的子账号身份；
				numOfManager: 0,//当前管理员数量
				pageNum: 1,//分页当前页
				numPerPage: 10,//分页数量
				totalCount: 0,
				filterPosition: '-1',//筛选当前职位的子账号
				jurisdiction: [],//所有权限
		        options2: [{//筛选子账号
					value: '-1',
					label: this.$t('comp.sub_act.all')
				},{ 
		          	value: '0',
		          	label: this.$t('comp.sub_act.admin')
		        },{
		          	value: '1000',
		          	label: this.$t('comp.sub_act.bureaucrat')
		        },{
		        	value: '2000',
		        	label: this.$t('comp.sub_act.business_operator')
		        }, {
		         	 value: '3000',
		          	label: this.$t('comp.sub_act.financial_operator')
		        }, {
		          	value: '4000',
		          	label: this.$t('comp.sub_act.staff')
		        }],
				options: [{ //数据显示
		          value: 0,
		          label: '管理员'
		        }, {
		          value: 4000,
		          label: '员工'
		        }, {
		          value: 1000,
		          label: '行政管理员'
		        }, {
		          value: 2000,
		          label: '业务操作员'
		        }, {
		          value: 3000,
		          label: '财务管理员'
		        }],
		        position:[],//存储各个子账户当前职位
//				opt_model: [],//按钮操作前的挡板
		        jurisdictions_show:[],
		        list:[],
		        job:{
		        	"0": this.$t('comp.sub_act.admin'),
		        	"4000": this.$t('comp.sub_act.staff'),
		        	"1000": this.$t('comp.sub_act.bureaucrat'),
		        	"2000": this.$t('comp.sub_act.business_operator'),
		        	"3000": this.$t('comp.sub_act.financial_operator')
		        },
		        userStatus:{
		        	"2": "正常",
		        	"1": "正在申请中",
		        	"3": "离开",
		        	"4": '正常'
		        },
		        jurisdictionKinds:{//权限种类
		        	admins: [],
		        	business: [],
		        	finance: []
		        },
		        admins_checkAll: false,//行政类权限参数
		       	checked_admins: [],
		        isIndeterminate: true,
		        business_checkAll: false,//业务类权限参数
		       	checked_business: [],
		        isIndeterminate2: true,
		        finance_checkAll: false,//财务类权限参数
		       	checked_finance: [],
		        isIndeterminate3: true,
			}
		},
		computed: mapState({
			userId: state => state.userInfo.userId//从store获取当前账户ID
		}),
		created() {
			this.load(this.pageNum,this.numPerPage,this.filterPosition);
			console.log(this.position);		
			this.$http.get(this.$root.urlPath.MJK + '/userCompany/queryCompanyRuleAll').then(function(res){//获取所有权限
        		if(res.body.success){
        			console.log(res.body.data)
        			this.jurisdiction = res.body.data;
        			this.jurisdictionKinds.business = this.jurisdiction.filter(function(item,index,array){
        				return(item.cat == 2000)
        			})
        			this.jurisdictionKinds.admins = this.jurisdiction.filter(function(item,index,array){
        				return(item.cat != 2000&&item.cat != 3000)
        			})
        			
        			this.jurisdictionKinds.finance = this.jurisdiction.filter(function(item,index,array){
        				return(item.cat == 3000)
        			})
        		}
        	})
		},
		watch: {
		},
		methods: {
			load(pageNum,numPerPage,posit) {
				this.$http.get(this.$root.urlPath.MJK + '/userCompany/getSubAccount?pageNum='+pageNum+'&numPerPage='+numPerPage+'&position='+posit).then(function(res) {
					if(res.body.success) {
						this.list = res.body.data.subAccountVOS;
						this.currentPosition = res.body.data.position;
						this.totalCount = res.body.data.totalCount;
						this.numOfManager = res.body.data.numOfManager;
						for (var i = 0; i < this.list.length; i++) {
							this.position[i] = this.list[i].position;
							this.list[i].status = this.userStatus[(this.list[i].status+"")];
							this.jurisdictions_show[i] = false;
						}
						console.log(this.position)
					}else{
						this.list = [];
					}
				}, function(res) {
	
				})
			},
	      	handleSizeChange(val) {
	       		console.log(`每页 ${val} 条`);
	      	},
	      	handleCurrentChange(val) {
	        	console.log(`当前页: ${val}`);
	      	},
	      	dismissal(userId) {//解聘
	      		this.$confirm('是否解聘该员工','提示',{
	      			confirmButtonText: '确定',
	      			cancelButtonText: '取消',
	      			type: 'warning'
	      		}).then(() => {	      			
		      		this.$http.get(this.$root.urlPath.MJK + '/company/agreeToLeave?userId=' +userId).then(function(res){
		        		if(res.body.success){
							this.load(this.pageNum,this.numPerPage,this.filterPosition);        			
		        		}else{
		        			this.$message({
		        				showClose: true,
		        				message: res.body.errMsg,
		        				type: 'error'
		        			})
		        		}
		        	},function(res){
		        		
		        	})	      		
	      		}).catch(() => {	      			
	      		});
	      	},
	      	delJurisdiction() {//解除权限
	      		this.$confirm('是否解除当前权限','提示',{
	      			confirmButtonText: '确定',
	      			cancelButtonText: '取消',
	      			type: 'warning'
	      		}).then(() => {	      			
		      		this.$http.get(this.$root.urlPath.MJK + '/userCompany/leaveCompany').then(function(res){
		        		if(res.body.success){
							this.$message({
								showClose: true,
								message: '您已解除权限！',
								type: 'success'
							});
							this.load(this.pageNum,this.numPerPage,this.filterPosition);							
		        		}else{
		        			this.$message({
		        				showClose: true,
		        				message: res.body.errMsg,
		        				type: 'error'
		        			})
		        		}
		        	},function(res){
		        		
		        	})
	      		}).catch(() => {	      			
	      		});
	      	},
	      	dimission() {//离职
	      		this.$confirm('是否离开该企业','提示',{
	      			confirmButtonText: '确定',
	      			cancelButtonText: '取消',
	      			type: 'warning'
	      		}).then(() => {	      			
		      		this.$http.get(this.$root.urlPath.MJK + '/company/leaveCompanyToYes').then(function(res){
		        		if(res.body.success){
							delCookie('allow_Comp');  
							this.$message({
								showClose: true,
								message: '您已离开该公司！',
								type: 'success'
							});
							this.$router.push('/user');
		        		}
		        	},function(res){
		        		
		        	})
	      		}).catch(() => {	      			
	      		});
	      	},
	      	positionFilter(val) {//职位筛选
	      		console.log(this.position);
	      		this.list = [];
	      		this.position = [];
				this.load(this.pageNum,this.numPerPage,this.filterPosition);
		      		
	      	},
	        remark(userId,contxt) {//添加备注
		        this.$prompt('请输入内容', '备注', {
		          	confirmButtonText: '确定',
		          	cancelButtonText: '取消',
		          	inputType: 'text',
		          	inputValue: contxt,
		          	inputPattern: /^.{0,10}$/,
		          	inputErrorMessage: '最多输入10个字符'
		        }).then(({ value }) => {
		          	this.$http.get(this.$root.urlPath.MJK + '/userCompany/describeaccount?userId='+userId+'&describe='+value).then(function(res){
		          		if(res.body.success){
		          			this.load(this.pageNum,this.numPerPage,this.filterPosition);
		          		}
		          	},function(){
		          		
		          	})
		        }).catch(() => {
		          	      
		        });
	        },
	        posit(userId,idx,curetPosition) {//分配职位
	        	this.loading = true;
	        	const params = {
	        		userId : userId,
	        		position : this.position[idx]
	        	}
	        	this.$http.get(this.$root.urlPath.MJK + '/userCompany/updatePosition',{params: params}).then(function(res){
	        		console.log(res)
	        		if(res.body.success){
						this.load(this.pageNum,this.numPerPage,this.filterPosition);
	        			this.loading = false;
	        		}else{
	        			this.$message({
				          message: res.body.errMsg,
				          type: 'error'
				        });
	        			this.loading = false;				        
	        		}
	        	})
	        },
	        agree(userId) {//同意通过
	        	this.$http.get(this.$root.urlPath.MJK + '/userCompany/saveUserCompany?userId=' +userId).then(function(res){
	        		if(res.body.success){
						this.load(this.pageNum,this.numPerPage,this.filterPosition);        			
	        		}
	        	},function(res){
	        		
	        	})
	        },
	        get_jurisdiction(idx,userId) {//回显权限
	        	if(this.jurisdictions_show[idx]){
	        		this.jurisdictions_show[idx] = false;
	        		Vue.set(this.jurisdictions_show,idx,false)	        		
	        		return false
	        	}
	        	this.jurisdictions_show[idx] = true;
	        	Vue.set(this.jurisdictions_show,idx,true)
				this.$http.get(this.$root.urlPath.MJK + '/userCompany/echoPosition?userId='+userId).then(function(res){
					if(res.body.success){
						var jurisd_list = res.body.data;
						var checked_admins = [];
						var checked_business = [];
						var checked_finance = [];
						jurisd_list.forEach(function(item,index,array){
							if(item.cat == 2000){
								checked_business.push(item.id)
							}
							else if (item.cat == 3000){
								checked_finance.push(item.id)
							}else{
								checked_admins.push(item.id)
							}
						})
						console.log(checked_admins)
						this.checked_admins = checked_admins;
						this.checked_business = checked_business;
						this.checked_finance = checked_finance;
					}
				},function(){
					
				})
	        },
	        give_jurisdiction(userId,index) {//给予权限
	        	this.loading = true;
	        	const ids = this.checked_admins.concat(this.checked_finance.concat(this.checked_business)).join(',');
	        	this.$http.get(this.$root.urlPath.MJK + '/userCompany/assignPermissions?idAll='+ids+'&userId='+userId).then(function(res){
	        		if(res.body.success){
	        			this.jurisdictions_show[index] = false;	        			
	        			Vue.set(this.jurisdictions_show,index,false)	        		
	     				this.loading = false;
	        		}
	        	},function(){
     				this.loading = false;	     			
	        	})
	        },
	        cancle(index) {
	        	this.jurisdictions_show[index] = false;	        			
    			Vue.set(this.jurisdictions_show,index,false)	
	        },
	        handleCheckAllChange() {//行政权限全选
	        	let ids = this.jurisdictionKinds.admins.map(function(item,index,array){
	        		return (item.id)
	        	})
		        this.checked_admins = this.admins_checkAll ? ids : [];
		        this.isIndeterminate = false;
	      	},
	      	jurisdictionChange(value) {//
		        let checkedCount = value.length;
		        console.log(value);
		        this.admins_checkAll = checkedCount === this.jurisdictionKinds.admins.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.jurisdictionKinds.admins.length;
	     	},
	      	handleCheckAllChange2(val) {//业务权限全选
	        	let ids = this.jurisdictionKinds.business.map(function(item,index,array){
	        		return (item.id)
	        	})
	        	console.log(val)
		        this.checked_business = this.business_checkAll ? ids : [];
		        this.isIndeterminate2 = false;
	      	},
	      	jurisdictionChange2(value) {//
		        let checkedCount = value.length;
		        this.business_checkAll = checkedCount === this.jurisdictionKinds.business.length;
		        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.jurisdictionKinds.business.length;
	     	},
	     	handleCheckAllChange3(val) {//财务权限全选
	        	let ids = this.jurisdictionKinds.finance.map(function(item,index,array){
	        		return (item.id)
	        	})
		        this.checked_finance = this.finance_checkAll ? ids : [];
		        this.isIndeterminate3 = false;
	      	},
	      	jurisdictionChange3(value) {//
		        let checkedCount = value.length;
		        this.finance_checkAll = checkedCount === this.jurisdictionKinds.finance.length;
		        this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.jurisdictionKinds.finance.length;
	     	}
	    },
		watch: {
			
		}
	}
</script>

<style>
	/*@import '../../../static/css/user/user.css';*/ 
	.el-checkbox__input.is-disabled+.el-checkbox__label{
		color: #555;
	}
</style>