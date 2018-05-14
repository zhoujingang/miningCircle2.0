<template>
	<div class="flex-1 main-right">
		<div class="cert-com">
			<div class="tit dis-tab vert-b f-18">
				<span class="">{{$t('comp.comp_data.tit')}}</span>
			</div>
			<div class="pd-10 bg-white">
				<div class="text-right">
					<span class="col-999" v-show="status == 2&&userStates == 4">{{$t('comp.comp_data.tip')}}</span>
					<span class="col-green" v-show="status == 1">{{$t('comp.comp_data.tip2')}}</span>
					
					<router-link v-if="status == 2&&userStates == 4" to="comp_cert" class="btn bg-green investor_edit">{{$t('comp.comp_data.edit')}}</router-link>
				</div>
				<div class="comp-data pos-r section">
					<div class="comp-logo">
						<img :src="companyBO.logo" alt="" />
					</div>
					<div class="comp-info1">
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.comp_name')}}：</div>
							<div class="pull-left">{{companyBO.name}}</div>
						</div>
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.address')}}：</div>
							<div class="pull-left">{{companyBO.address}}</div>
						</div>
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.post')}}：</div>
							<div class="pull-left">{{companyBO.zipCode}}</div>
						</div>
						<div class="clearfix item">
							<el-col :span="12">
								<div class="pull-left left">{{$t('comp.comp_data.reg_time')}}：</div>
								<div class="pull-left">{{createdTime}}</div>
							</el-col>
							<el-col :span="12">
								<div class="pull-left left">{{$t('comp.comp_data.reg_capital')}}：</div>
								<div class="pull-left">{{companyBO.registeredCapital}} 万元</div>
							</el-col>
						</div>
					</div>
					<div class="mt-20 ml-10 mr-10">					
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.main_pro')}}：</div>
							<div class="pull-left">{{companyBO.mainProduct}}</div>
						</div>
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.social_code')}}：</div>
							<div class="pull-left">{{companyBO.businessNo}}</div>
						</div>
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.bues_types')}}：</div>
							<div class="pull-left">{{mineral}}</div>
						</div>
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.bues_range')}}：</div>
							<div class="pull-left">{{companyBO.manageBusiness}}</div>
						</div>
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.comp_type')}}：</div>
							<div class="pull-left">{{type}}</div>
						</div>
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.introduction')}}：</div>
							<div class="right">{{companyBO.introduction}}</div>
						</div>
					</div>
				</div>
				<div class="section ml-10 mr-10">					
					<div class="tit mt-20 f-18">
						<span class="">{{$t('comp.comp_data.tit2')}}</span>
					</div>
					<div class="aptitude-info">
						<el-row>
							<el-col :span="6" class="pd-20">
								<img style="width: 160px;height: 200px;" :src="companyBO.businessLicense" alt="" />
							</el-col>
							<el-col :span="6">
								
							</el-col>
							<el-col :span="6">
								
							</el-col>
							<el-col :span="6">
								
							</el-col>
						</el-row>
					</div>
				</div>
				<div class="section ml-10 mr-10">					
					<div class="tit mt-20 f-18">
						<span class="">{{$t('comp.comp_data.tit3')}}</span>
					</div>
					<div>
						<div class="clearfix item">
							<el-col :span="12">
								<div class="pull-left left">{{$t('comp.comp_data.staff')}}：</div>
								<div class="pull-left">{{companyBO.staffNumber}}</div>
							</el-col>
							<el-col :span="12">
								<div class="pull-left left">{{$t('comp.comp_data.turnover')}}：</div>
								<div class="pull-left">{{companyBO.turnover}}</div>
							</el-col>
						</div>
						<div class="clearfix item">
							<el-col :span="12">
								<div class="pull-left left">{{$t('comp.comp_data.plant')}}：</div>
								<div class="pull-left">{{companyBO.realField}}</div>
							</el-col>
							<el-col :span="12">
								<div class="pull-left left">{{$t('comp.comp_data.export')}}：</div>
								<div class="pull-left">{{companyBO.export}}</div>
							</el-col>
						</div>
						<div class="clearfix item">
							<el-col :span="12">
								<div class="pull-left left">{{$t('comp.comp_data.quality')}}：</div>
								<div class="pull-left">{{quality}}</div>
							</el-col>
							<el-col :span="12">
								<div class="pull-left left">{{$t('comp.comp_data.process')}}：</div>
								<div class="pull-left">{{yon}}</div>
							</el-col>
						</div>
						<div class="clearfix item">
							<div class="pull-left left">{{$t('comp.comp_data.cert_system')}}：</div>
							<div class="pull-left">{{companyBO.management_system}}</div>
						</div>
					</div>
				</div>
				<div class="section ml-10 mr-10">
					<div class="tit mt-20 f-18">
						<span class="">{{$t('comp.comp_data.tit4')}}</span>
					</div>
					<div class="clearfix item">
						<div class="pull-left left">{{$t('comp.comp_data.contact')}}：</div>
						<div class="pull-left">{{companyBO.contactName}}</div>
					</div>
					<div class="clearfix item">
						<div class="pull-left left">{{$t('comp.comp_data.tel')}}：</div>
						<div class="pull-left">{{companyBO.mobile}}</div>
					</div>
					<div class="clearfix item">
						<el-col :span="12">
							<div class="pull-left left">{{$t('comp.comp_data.department')}}：</div>
							<div class="pull-left">{{companyBO.department}}</div>
						</el-col>
						<el-col :span="12">
							<div class="pull-left left">{{$t('comp.comp_data.position')}}：</div>
							<div class="pull-left">{{companyBO.contactPosition}}</div>
						</el-col>
					</div>
				</div>
				<div class="section ml-10 mr-10">
					<div class="tit mt-20 f-18">
						<span class="">{{$t('comp.comp_data.tit5')}}</span>
					</div>
					<div class="clearfix item">
						<div class="pull-left left">{{$t('comp.comp_data.comp_name')}}：</div>
						<div class="pull-left">{{companyBO.invoiceTitle}}</div>
					</div>
					<div class="clearfix item">
						<div class="pull-left left">{{$t('comp.comp_data.bill_adress')}}：</div>
						<div class="pull-left">{{companyBO.billingAddress}}</div>
					</div>
					<div class="clearfix item">
						<div class="pull-left left">{{$t('comp.comp_data.bill_type')}}：</div>
						<div class="pull-left">{{billingType}}</div>
					</div>
					<div class="clearfix item">
						<div class="pull-left left">{{$t('comp.comp_data.taxpayer_id')}}：</div>
						<div class="pull-left">{{companyBO.taxpayer}}</div>
					</div>
					<div class="clearfix item">
						<div class="pull-left left">{{$t('comp.comp_data.bank')}}：</div>
						<div class="pull-left">{{companyBO.bank}}</div>
					</div>
					<div class="clearfix item">
						<div class="pull-left left">{{$t('comp.comp_data.mobile')}}：</div>
						<div class="pull-left">{{companyBO.billingPhone}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import { mapState } from 'vuex'
	import {getTime2} from '@/assets/commjs/util.js'
	export default {
		data() {
			return{
				status: '',//认证状态
				companyBO: {},
				createdTime:'',//创建时间
				mineral: '',//经营种类
				type: '',//企业类型
				quality: '',//质量控制
				yon: '',//是否对外加工定制
				billingType: '',//发票类型
				minerals: {
					1: '金属矿产',
					2: '有色金属',
					4: '黑色金属',
					8: '能源矿产',
					16: '稀土分散',
					32: '非金属',
					64: '矿用设备',
					128: '耗材药剂',
					256: '专业服务'
				},
				types: {
					0: '生产加工',
					1: '贸易经销',
					2: '工贸一体',
					3: '服务机构',
					4: '厂矿企业'
				},
				qualitys: {
					0: '内部',
					1: '第三方',
					2: '无'
				},
				yons: {
					0: '是',
					1: '否'
				},
				billingTypes: {
					0: '增值税普通发票',
					1: '增值税专用发票'
				}
			}
		},
		created() {
			this.$http.get(this.$root.urlPath.MJK + '/company/selectCompayAndCompanyLang').then(function(res) { 
				if(res.body.success) {
					this.status = res.body.data.status;
					this.companyBO = res.body.data;
					this.createdTime = getTime2(this.companyBO.establishmentDate);
					var comprehensive_list = this.companyBO.comprehensive?this.companyBO.comprehensive.split(',') : '';
					for (var i = 0; i < comprehensive_list.length; i++) {
						this.mineral += ' '+this.minerals[comprehensive_list[i]];
					}
					this.type = this.types[this.companyBO.type];
					this.quality = this.qualitys[this.companyBO.quality];
					this.yon = this.yons[this.companyBO.yon];
					this.billingType = this.billingTypes[this.companyBO.billingType];
				}
			}, function(res) {
				console.log()
			})
		},
		computed: mapState({
			userStates: state => state.userInfo.userStates
		})
	}
</script>

<style>
</style>