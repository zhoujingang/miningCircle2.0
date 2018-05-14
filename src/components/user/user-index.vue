<template>

	<div class="flex-1 main-right">
		<!--{{ $t('name') }}-->
		<div class="row">						
			<div class=" user-info clearfix">
				<div class="col-md-6 pr-0">
					<div class="left clearfix">
						<div class="user_img">
							<img class="full-wh" :src="this.headImgUrl? this.headImgUrl : '/static/img/user/user.png'" alt="" /></div>
						<div class="pull-left detail f-16">
							<p class="user_id col-pri text-overflow-1 mb-15">{{this.userBO.userName}}</p>
							<p class="user_type mb-15">{{$t('user.index.status')}}：{{this.userBO.authSkill == '1'?'普通人才':''}}{{this.userBO.authSkill == '2'?'专家人才':''}}</p>
							<p class="user_grade mb-0">{{$t('user.index.level')}}： <img :src="this.level" alt="" /></p>
						</div>
					</div>
				</div>
				<div class="col-md-6 pl-0">
					<div class="right">
						<div class="dis-fl" v-if="!status">
							<div class="flex-1">
								<p class="tip">未加入企业</p>
								<div class="text-center f-18">
									
									<p class="mt-15">
										<router-link class="status btn bg-orange" to="/user/comp_cert">认证企业</router-link>
										<el-tooltip placement="right" effect="light" popper-class="el-tip">
										  	<div slot="content" class="line-h-25">1.认证企业后会创建自己的旗舰店,在旗舰店可发布和管理商品<br />2.可邀请他人加入自己的企业，并向他们分配企业的权限<br />3.企业人员和权限在认证企业后的企业中的子账户下显示<br />4.认证企业后可在此网站发布会展信息</div>
										  	<img class="ml-10" style="width: 25px;height: 25px;" src="../../../static/img/user/icon4.png" alt="" />
										</el-tooltip>
										
									</p> 
									<p class="mt-10">
										<button class="status btn bg-pri" @click="showSearch">加入企业</button>
										<el-tooltip placement="right" effect="light" popper-class="el-tip">
										  	<div slot="content" class="line-h-25">1.加入企业后，企业管理员可以对员工分配企业的权限<br />2.加入企业的人可以使用同一个企业账户和资金账户</div>
										  	<!--<img class="mt-5 ml-10" style="width: 25px;height: 25px;" src="../../../static/img/user/icon4.png" alt="" />-->
										  	<img class="ml-10" style="width: 25px;height: 25px;" src="../../../static/img/user/icon4.png" alt="" />
										</el-tooltip>
										
									</p>
								</div>
							</div>
							<div class="img">
								<img src="/static/img/user/img.jpg" alt="" />
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 1&&status == 3">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">您加入的企业</span><span class="col-pri company_name text-overflow">{{compName}}</span><span class="f-16 col-red pull-right">{{$t('user.index.off_shelf')}}</span></p>					
								<div class="dis-fl">
									<div>
										<img class="img2" :src="compLogo? compLogo : '/static/img/user/user.png'" alt="" />
									</div>
									<div class="part-right flex-1">
										<div class="text-center f-18">
											<p class="mt-20 pt-20">
												<button class="status btn bg-pri" @click="showSearch">申请其它企业</button>
											</p>
										</div>
									</div>							
								</div>						
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 2&&status == 3">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">您加入的企业</span><span class="col-pri company_name text-overflow">{{compName}}</span><span class="f-16 col-red pull-right">{{$t('user.index.off_shelf')}}</span></p>					
								<div class="dis-fl">
									<div>
										<img class="img2" :src="compLogo? compLogo : /static/img/user/img.jpg" alt="" />
									</div>
									<div class="part-right flex-1">
										<div class="text-center f-18">
											<p class="mt-20 pt-20">
												<button  class="status btn bg-b5" @click="leave">{{$t('user.index.leave_comp')}}</button>
											</p>
										</div>
									</div>							
								</div>						
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 4&&status == 3">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">{{$t('user.index.comp_cert')}}</span><span class="col-pri company_name text-overflow">{{compName}}</span><span class="f-16 col-red pull-right">{{$t('user.index.off_shelf')}}</span></p>					
								<div class="dis-fl">
									<div>
										<img class="img2" :src="compLogo? compLogo : '/static/img/user/user.png'" alt="" />
									</div>
									<div class="part-right flex-1">
										<div class="text-center f-18">
											<p class="mt-20 pt-20">
												<router-link class="status btn bg-orange" to="/user/comp_cert">{{$t('user.index.re_cert')}}</router-link>
											</p> 
										</div>
									</div>							
								</div>						
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 1&&status == 4">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">您申请中的企业</span><span class="col-pri company_name text-overflow">{{compName}}</span><span class="f-16 col-red pull-right">已冻结</span></p>					
								<div class="dis-fl">
									<div>
										<img class="img2" :src="compLogo? compLogo : '/static/img/user/user.png'" alt="" />
									</div>
									<div class="part-right flex-1">
										<div class="text-center f-18">
											<p class="mt-20 pt-20">
												<button class="status btn bg-pri" @click="showSearch">申请其它企业</button>
											</p>
										</div>
									</div>							
								</div>						
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 2&&status == 4">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">您加入的企业</span><span class="col-pri company_name text-overflow">{{compName}}</span><span class="f-16 col-red pull-right">已冻结</span></p>					
								<div class="dis-fl">
									<div>
										<img class="img2" :src="compLogo? compLogo : '/static/img/user/user.png'" alt="" />
									</div>
									<div class="part-right flex-1">
										<div class="text-center f-18">
											<p class="mt-20 pt-20">
												<button  class="status btn bg-b5" @click="leave">离开企业</button>
											</p>
										</div>
									</div>							
								</div>						
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 4&&status == 4">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">您认证的企业</span><span class="col-pri company_name text-overflow">{{compName}}</span><span class="f-16 col-red pull-right">已冻结</span></p>					
								<div class="dis-fl">
									<div>
										<img class="img2" :src="compLogo? compLogo : '/static/img/user/user.png'" alt="" />
									</div>
									<div class="part-right flex-1">
										<div class="text-center f-18">
										</div>
									</div>							
								</div>						
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 1&&status == 2">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">您申请中的企业：</span><span class="col-pri company_name text-overflow">{{compName}}</span></p>
								<div class="dis-fl">
									<div class="part-left flex-1">
										<p class="mt-20 col-orange f-24">
											{{$t('user.index.review')}}
										</p> 
										<p class="mt-10">
											<button class="status btn bg-pri" @click="showSearch">申请其它企业</button>
										</p>
									</div>							
									<div>
										<img class="img2" :src="compLogo? compLogo : '/static/img/user/user.png'" alt="" />
									</div>
								</div>
								
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 2&&status == 2">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">您已加入企业</span><span class="col-pri company_name text-overflow">{{compName}}</span></p>
								<div class="dis-fl">
									<div>
										<img class="img2" :src="compLogo?compLogo : '/static/img/user/img.jpg'" alt="" />
									</div>
									<div class="part-right flex-1">
										<p class="mt-15">
											<button class="status btn bg-pri" @click="lookShop">{{$t('user.index.shop_view')}}</button>
										</p> 
										<p class="mt-15">
											<router-link to="/comp/child_act" class="status btn bg-b5">离开该公司</router-link>
										</p>
									</div>							
								</div>
								
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 4&&status == 2">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">{{$t('user.index.comp_cert')}}</span><span class="col-pri company_name text-overflow">{{compName}}</span></p>
								<div class="dis-fl">
									<div>
										<img class="img2" :src="compLogo?compLogo:'/static/img/user/img.jpg'" alt="" />
									</div>
									<div class="part-right flex-1">
										<p class="mt-20 pt-20">
											<button class="status btn bg-pri" @click="lookShop">{{$t('user.index.shop_view')}}</button>
										</p> 

									</div>							
								</div>
								
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 1&&status == 1">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">{{$t('user.index.comp_review')}}:</span><span class="col-pri company_name text-overflow">{{compName}}</span></p>
								<div class="dis-fl">
									<div class="part-left flex-1">
										<p class="mt-20 col-orange f-24">
											{{$t('user.index.review')}}
										</p> 
										<p class="mt-10">
											<button class="status btn bg-pri" @click="showSearch">申请其它企业</button>
										</p>
									</div>							
									<div>
										<img class="img2" :src="compLogo? compLogo : '/static/img/user/user.png'" alt="" />
									</div>						
								</div>								
							</div>
						</div>
						<!--<div class="dis-fl" v-if="userStatus == 1&&status == 2">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">您申请中的企业：</span><span class="col-pri company_name text-overflow">{{compName}}</span></p>
								<div class="dis-fl">
									<div class="text-center f-18 flex-1">
										<p class="mt-20 col-orange f-24">
											审核中
										</p> 
										<p class="mt-10">
											<button class="status btn bg-pri" @click="showSearch">申请其它企业</button>
										</p>
									</div>							
									<div>
										<img class="img2" :src="compLogo? compLogo : /static/img/user/img.jpg" alt="" />
									</div>
								</div>
								
							</div>
						</div>-->
						<div class="dis-fl" v-if="userStatus == 2&&status == 1">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">{{$t('user.index.comp_review')}}:</span><span class="col-pri company_name text-overflow">{{compName}}</span></p>
								<div class="dis-fl">
									<div class="part-left flex-1">
										<p class="mt-20 col-orange f-24">
											{{$t('user.index.review')}}
										</p> 
									</div>							
									<div>
										<img class="img2" :src="compLogo? compLogo : '/static/img/user/user.png'" alt="" />
									</div>
								</div>								
							</div>
						</div>
						<div class="dis-fl" v-if="userStatus == 4&&status == 1">
							<div class="full-w">
								<p class="tip clearfix"><span class="pull-left">{{$t('user.index.comp_review')}}:</span><span class="col-pri company_name text-overflow">{{compName}}</span></p>
								<div class="dis-fl">
									<div class="part-left flex-1">
										<p class="mt-20 col-orange f-24">
											{{$t('user.index.review')}}
										</p> 
									</div>							
									<div>
										<img class="img2" :src="compLogo? compLogo : /static/img/user/img.jpg" alt="" />
									</div>
								</div>								
							</div>
						</div>
					</div>
					<div class="search-out" v-show="searchOr">
						<div class="search-con trans-center">
							<div class="tit clearfix"><span class="pull-left">加入企业</span> <span class="pull-right close" @click="closeSearch"></span></div>
							<div class="pd-20">
								<el-input placeholder="请输入公司名称搜索..." v-model="search_comp" class="input-with-select">
							    	<el-button slot="append" @click="searchComp">搜索</el-button>
							  	</el-input>
								<!--<el-input
								  placeholder="请输入公司名称搜索..."
								  icon="search"
								  v-model="search_comp"
								  :on-icon-click="searchComp"
								  :change="searchComp">
								</el-input>-->
								<ul  class="comp_lists">
									<li v-for="(item,index) in comp_list" :class="current_comp == index?'current lists':'lists'" @click="select(index,item.companyId,item.name)">
										{{item.name}}
									</li>
								</ul>
								<div class="clearfix col-white"><button class="cancle btn" @click="closeSearch">取消申请</button><button class="join btn bg-pri" @click="applyComp">申请加入</button></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="con_1 dis-fl">
			<div class="tip pos-r">
				<div class="trans-center full-w">
					<img src="/static/img/user/icon5.png" alt="" />
					<p class="mt-5">{{$t('user.index.state_funds')}}</p>
				</div>
				
			</div>
			<div class="flex-1">
				<span class="tit" style="color:#f39800">{{$t('user.index.able_balance')}}</span>
				<p class="clearfix mt-15 pos-r"><span class="num vert-b">¥{{ this.accountData.availableBalance }}</span>
					<router-link to="act_funds/withdraw" class="pull-right f-w mt-10 hov-pri">{{$t('user.index.withdraw')}}></router-link>
					<router-link to="act_funds/recharge" class="voucher f-w hov-pri">{{$t('user.index.recharge')}}></router-link>				
				</p>
			</div>
			<div class="flex-1">
				<span class="tit" style="color:#eb6100">{{$t('user.index.coin')}}</span>
				<p class="clearfix mt-15"><span class="num vert-b">¥{{ this.accountData.mcCurrency }}</span>
					<router-link to="act_coin" class="pull-right f-w mt-10 hov-pri">{{$t('user.index.detail')}}></router-link>
				</p>
			</div>
			<div class="flex-1">
				<span class="tit" style="color:#601986">{{$t('user.index.total')}}</span>
				<p class="clearfix mt-15"><span class="num vert-b">¥{{ this.accountData.total }}</span>
					
				</p>
			</div>
		</div>
		<!--<div class="con_2 dis-fl">
			<div class="tip pos-r">
				<div class="trans-center full-w">
					<img class="" src="/static/img/user/icon5.png" alt="" />
				<p>待办事项提醒</p>
				</div>
				
			</div>
			<div class="flex-1">
				<div class="of_order clearfix">
					<span class="pull-left f-w">供应订单管理：</span>
					<span>待报价(0)</span>
					<span>待确认(6)</span>
					<span>待签合同(0)</span>
					<span>待付款(0)</span>
					<span>代发货(0)</span>
					<span>代签收(5)</span>						
				</div>
				<div class="ph_order clearfix">
					<span class="pull-left f-w tit">采购订单管理：</span>
					<span>待回复(0)</span>
					<span>待确认(6)</span>
					<span>待签合同(0)</span>
					<span>待付款(0)</span>
					<span>代发货(0)</span>
					<span>代签收(5)</span>							
				</div>
				<div class="se_order clearfix">
					<span class="pull-left f-w tit">资源单管理：</span>
					<span>销售中(0)</span>
					<span>未上架(6)</span>
					<span>审核中(0)</span>
					<span>违规待处理(0)</span>
					<span>违规已下架(0)</span>							
				</div>
			</div>
		</div>-->
		<div class="con_3 clearfix">
			<div class="c3_left">
				<div class="tit">
					<span class="f-18">{{$t('user.index.new_comp')}}</span><a href="http://www.miningcircle.com/store.do?index" class="pull-right mt-5 col-white">{{$t('comm.more')}}>></a>
				</div>
				<div class="comps">
					<div class="comp_list" v-for="item in joincompList">
						<div class="comp_name">						
							<a :href="'http://www.miningcircle.com/store.do?web&id='+item.companyId" class=" text-line-1">{{item.name}}</a>
						</div>
						<div class="comp_info dis-fl">
							<div class="comp_img">
								<img :src="item.logo?item.logo:'../../../static/common/img/img2.png'" alt="" />
							</div>
							<div class="comp_txt flex-1">
								<p class="text-line-3">{{item.introduction}}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="c3_right">
				<div class="tit">
					<span class="f-18">{{$t('user.index.purch_info')}}</span><a href="http://www.miningcircle.com/ln/index.do" class="pull-right mt-5 col-white">{{$t('comm.more')}}>></a>
				</div>
				<div class="pd-10 bg-white">
					<table class="ph_info">
						<tr>
							<th style="width: 30%;">{{$t('user.index.pubdate')}}</th>
							<th style="width: 40%;">{{$t('user.index.pro_name')}}</th>
							<th style="width: 30%">{{$t('user.index.quantity')}}</th>
						</tr>
						<tr v-for="(item,index) in demandList" v-show="index < 14">
							<td>{{item.update_time}}</td>
							<td><p class="text-line-1">{{item.title}}</p></td>
							<td>{{item.totalQuantity}}{{item.unit}}</td>
						</tr>
					</table>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {getTime2} from '@/assets/commjs/util.js'
	import {delCookie} from "@/assets/commjs/util.js"
	import {browserRedirect} from "@/assets/commjs/util.js"
	
	export default {
		components:{
//			layer
		},
		data(){
			return{
				companyBO:{},
				userBO:{},
				userComponyBO: {},
				level: '',
				headImgUrl: '',
				userStatus: '',//用户与企业的关系
				status: '',//企业与企业的关系
				searchOr: false,//是否出现公司搜索
				search_comp: '',//搜索的公司名
				comp_list: [],//搜索后的公司列表
				current_comp: 'default',
				selectedId: '',//选中的公司id
				selectedName: '',//选中的公司名
//				applyName: '',//申请中的公司名
				compName: '',//加入的公司
				compLogo: '',//公司logo
//				layerAttr: { }
				funds: '',//资金状态
				accountData:{
					'mcCurrency':0,//矿业币
					'freezingBalance': 0,//冻结资金
					'availableBalance':0,//可用余额
					'total':0//总额
				},
				demandList: [],//求购资源信息
				joincompList: [],//新入驻企业
			}
		},
		created() {
			var wind = browserRedirect();
			if (wind == 'web') {
				window.location.href = 'http://www.miningcircle.com/index.do';
			} else {
//				window.location.href = '';
			}
			this.load_userHome();
			this.$http.get(this.$root.urlPath.MJK+'/account/account?status=0').then(function(res){
				if(res.body.success){
					console.log(res)
					this.accountData.availableBalance = res.body.data.availableBalance;
					this.accountData.mcCurrency = res.body.data.mcCurrency;
					this.accountData.total = this.accountData.availableBalance+res.body.data.freezingBalance;
				}
			},function(res){
				
			});
			this.$http.get(this.$root.urlPath.MJK+'/buy/purchase').then(function(res){
				if(res.body.success){
					this.demandList = res.body.data;
					this.demandList.forEach(function(item){
						item.update_time = getTime2(item.updateTime);
					})
				}
			},function(){
				
			});
			this.$http.get(this.$root.urlPath.MJK+'/company/queryNewestCompany').then(function(res){
				if(res.body.success){
					this.joincompList = res.body.data
				}
			},function(){
				
			})
		},
		methods: {
			load_userHome(){
				this.$http.get(this.$root.urlPath.MJK+'/user/userHome').then(function(res){
					if(res.body.success){
						this.userBO = res.body.data.userBaseVO;
						this.companyBO = res.body.data.companyBaseVO;
						if(this.companyBO){						
							this.status = this.companyBO.status;
//							this.status = 3;
							this.compName = this.companyBO.name;
							this.compLogo = this.companyBO.logo;
						}else{
							this.status = null;
						}
						this.userStatus = this.userBO.userCompanyStatus;
//						this.userStatus = 2;					
						this.headImgUrl = this.userBO.headImgUrl;
						this.level = '/static/img/user/level' +this.userBO.vipLevel+'.png';
						
					}		
				},function(res){
				
				});
			},
			showSearch() {
				this.searchOr = true;
			},
			closeSearch() {
				this.searchOr = false;
				this.selectedId = ''; 
				this.search_comp = '';
				this.comp_list = [];
			},
			searchComp(ev) {//搜索公司
				this.$http.get(this.$root.urlPath.MJK+'/user/searchCompany?companyName='+this.search_comp).then(function(res){
					
					if(res.body.success){
						this.comp_list = res.body.data;						
						if(res.body.data.length == 0){
							this.$message({
								showClose: 'true',
								message: '尚不存在有关该企业',
								type: 'error'
							})
						}
					}else{
						this.$message({
							showClose: 'true',
							message: res.body.errMsg,
							type: 'error'
						})
					}
				},function(){
					
				})
			},
			select(index,id,name) {//选择公司
				this.selectedId = id;
				this.selectedName = name;
				this.current_comp = index;
			},
			applyComp() {//申请加入
				if(!this.selectedId){
					return false;
				}
				this.$http.get(this.$root.urlPath.MJK+'/user/saveUserCompany?companyId='+this.selectedId).then(function(res){
					if(res.body.success){
						this.closeSearch();
						this.load_userHome();						
					}else{
						this.$message({
		          	showClose: true,
		          	message: res.body.errMsg,
		          	type: 'error'
		        });
					}
				})
			},
			leave() {
				this.$confirm('是否离开该企业', '提示', {
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
							this.$router.go(0);
		    		}else{
		    			this.$message({
								showClose: true,
								message: res.body.errMsg,
								type: 'error'
							});
		    		}
		    	},function(res){
		    		
		    	})
        }).catch(() => {                  
        });
			},
			lookShop() {
				window.location.href = 'http://www.miningcircle.com/store.do?web&id='+this.companyBO.companyId;
			}
    }
	}
</script>

<style>
    @import '../../../static/css/user/user.css'; 
 	.el-tooltip__popper.el-tip{
 		border: 1px solid #00a0e9;
 		background: #FDFAF3;
 	}
</style>