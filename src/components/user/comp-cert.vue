<template>
	<div class="flex-1 main-right" v-loading="loading">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<div class="cert-com">
				
				<div class="tit dis-tab vert-b f-18">
					<span class="">{{$t('comp.comp_data.tit')}}</span><span class="f-12 ml-20">(*红色星号部分为必填项，请真实填写，增加更高信用值)</span>
				</div>
				<div class="tip f-13">
					<p class="mb-10">1.您还没有认证旗舰店，请填写企业信息，拥有自己的旗舰店和企业中心页（旗舰店可发布商品和服务，企业中心可对自己发布的商品和服务等信息进行管理）</p>
					<p>2.企业介绍是企业重要的展示信息，为保障信息真实性、合法性、有效性和完整性，建议实名发布！</p>
				</div>
				<div class="pos-r bg-white">
	      			<p class="hint col-green pl-20" v-if="ruleForm.logo"><i class="col-red pr-10">*</i>点击“上传”，修改企业logo。</p>
	      			<p class="hint col-green" v-else>您的目前还没有logo,请点击“上传”，上传企业logo。</p>
	      			
					<cropper @transferUser="getUrl" :headImg="ruleForm.logo"></cropper>
				</div>
				<div class="form1_out">
	
					<!--<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
						<el-row>
							<el-col :span="13">								
								<el-form-item :label="$t('comp.comp_data.comp_name')" prop="name" inline-message="true">
									<el-input v-model="ruleForm.name"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item :label="$t('comp.comp_data.address')" prop="city">
									<el-select v-model="select.province" :placeholder="areaSelect.province?areaSelect.province:'省份/地区'" @change="selProvince">
										<template v-for="(item,index) in area.province">
											<el-option :label="item.areaname" :value="item.id">
												
											</el-option>
										</template>
									</el-select>
									<el-select v-model="select.city" :placeholder="areaSelect.city?areaSelect.city:'城市/地区'" @change="selCity">
										<template v-for="(item,index) in area.city">
											<el-option :label="item.areaname" :value="item.id">
												
											</el-option>
										</template>
									</el-select>								
								</el-form-item>
							</el-col>
							<el-col :span="14">	
								<el-form-item  prop="address" label-width="10px">							
											<el-input v-model="ruleForm.address" class="adress" placeholder="请输入详细地区"></el-input>
								</el-form-item>
							</el-col>				
						</el-row>
						<el-row>
							<el-col :span="13">
								<el-form-item :label="$t('comp.comp_data.post')" prop="zipCode">
									<el-input type="zip_code" v-model="ruleForm.zipCode"></el-input>
								</el-form-item>								
							</el-col>
						</el-row>
						<el-form-item :label="$t('comp.comp_data.main_pro')" prop="mainProduct">
							<el-input v-model="ruleForm.mainProduct" :maxlength="100"></el-input>
						</el-form-item>
						<el-row>	
							<el-col :span="13">
								<el-form-item :label="$t('comp.comp_data.website')">
									<el-input v-model="ruleForm.website" placeholder="请输入企业网址" :maxlength="128"></el-input>
								</el-form-item>
								
							</el-col>
						</el-row>
						<div class="clearfix">
							<el-col :span="11">
								<el-form-item :label="$t('comp.comp_data.reg_time')" prop="establishment_Date">
									<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.establishment_Date" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>
							<el-col class="line" :span="2">&nbsp;</el-col>
							<el-col :span="11">
								<el-form-item :label="$t('comp.comp_data.reg_capital')" prop="registeredCapital">
									<el-input v-model="ruleForm.registeredCapital" placeholder="万元" :maxlength="20"></el-input>
								</el-form-item>
							</el-col>
						</div>
						<el-row>
							<el-col :span="13">								
								<el-form-item :label="$t('comp.comp_data.social_code')" class="bus_code" prop="businessNo">
									<el-input v-model="ruleForm.businessNo" placeholder="请输入统一社会信用代码"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-form-item :label="$t('comp.comp_data.bues_types')" prop="comprehensive_kind">
							<el-checkbox-group v-model="ruleForm.comprehensive_kind">
								<el-checkbox :label="64">矿用设备</el-checkbox>
								<el-checkbox :label="256">专业服务</el-checkbox>								
				                <el-checkbox :label="128">耗材药剂</el-checkbox>
				                <el-checkbox :label="1">金属矿产</el-checkbox>
				                <el-checkbox :label="2">有色金属</el-checkbox>
				                <el-checkbox :label="4">黑色金属</el-checkbox>
				                <el-checkbox :label="8">能源矿产</el-checkbox>
				                <el-checkbox :label="16">稀土分散</el-checkbox>
				                <el-checkbox :label="32">非金属</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-form-item :label="$t('comp.comp_data.bues_range')">
							<el-input v-model="ruleForm.manageBusiness" placeholder="请输入公司经营范围" :maxlength="100"></el-input>
						</el-form-item>
						<el-form-item :label="$t('comp.comp_data.comp_type')" prop="type">
							<el-radio-group v-model="ruleForm.type">
								<el-radio  label="0">生产加工</el-radio>
				                <el-radio  label="1">贸易经销</el-radio>
				                <el-radio  label="2">工贸一体</el-radio>
				                <el-radio  label="3">服务机构</el-radio>
				                <el-radio  label="4">厂矿企业</el-radio>
				                
				            </el-radio-group>
						</el-form-item>
						<el-form-item :label="$t('comp.comp_data.introduction')" prop="introduction">
							<el-input type="textarea" v-model="ruleForm.introduction" placeholder="请输入公司的简介描述" :max-length="500"></el-input>
						</el-form-item>
						<p class="f-12 col-999 text-right pb-10">我们建议您填写详细的企业介绍，例如：历史、业绩、经营范围、发展前景等。 - 不支持html语言 - 内容在1000个字符内</p>					
					<!--</el-form>-->
				</div>
			</div>
			<div class="cert-com">
				<div class="tit dis-tab vert-b f-18">
					<span class="">{{$t('comp.comp_data.tit2')}}</span>
				</div>
				<div class="uploads clearfix">
					<el-col :span="4" :offset="1" class="ml-20">
						<el-upload class="avatar-uploader" :action="post_ation" :show-file-list="false" :on-success="handleAvatarSuccess1" :before-upload="beforeAvatarUpload1">
							<img v-if="imageUrl1" :src="imageUrl1" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p class="text-center pt-10"><span class="col-red mr-5">*</span>营业执照</p>
					</el-col>
					<el-col :span="4" :offset="2" class="ml-20">
						<el-upload class="avatar-uploader" :action="post_ation" :show-file-list="false" :on-success="handleAvatarSuccess2" :before-upload="beforeAvatarUpload2">
							<img v-if="imageUrl2" :src="imageUrl2" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p class="text-center pt-10">企业资质1</p>
					</el-col>
					<el-col :span="4" :offset="2" class="ml-20">
						<el-upload class="avatar-uploader" :action="post_ation" :show-file-list="false" :on-success="handleAvatarSuccess3" :before-upload="beforeAvatarUpload3">
							<img v-if="imageUrl3" :src="imageUrl3" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p class="text-center pt-10">企业资质2</p>
	
					</el-col>
					<el-col :span="4" :offset="2" class="ml-20">
						<el-upload class="avatar-uploader" :action="post_ation" :show-file-list="false" :on-success="handleAvatarSuccess4" :before-upload="beforeAvatarUpload4">
							<img v-if="imageUrl4" :src="imageUrl4" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
						<p class="text-center pt-10">企业资质3</p>	
					</el-col>
				</div>
			</div>	
			<div class="cert-com">
				<div class="tit dis-tab vert-b f-18">
					<span class="">{{$t('comp.comp_data.tit3')}}</span><span class="f-12 ml-20"></span>
				</div>
				<div class="form2_out">
					<div class="clearfix">
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.staff')">
								<el-select class="full-w" v-model="ruleForm.staffNumber" placeholder="请选择人数规模">
									<el-option
								      v-for="item in staff_num"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
						<el-col :span="2">&nbsp;</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.turnover')">
								<el-select class="full-w" v-model="ruleForm.turnover" placeholder="请选择">
									<el-option
								      v-for="item in turnover"
								      :key="item.value"
								      :label="item.value"
								      :value="item.value">
								    </el-option>
								</el-select>

							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.plant')" prop="realField">
								<el-input v-model="ruleForm.realField" placeholder="单位平方米"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2">&nbsp;</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.export')">
								<el-select class="full-w" v-model="ruleForm.export" placeholder="请选择">
									<el-option
								      v-for="item in bus_export"
								      :key="item.value"
								      :label="item.label"
								      :value="item.value">
								    </el-option>
								</el-select>
							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.quality')" prop="resource">
								<el-radio-group v-model="ruleForm.quality">
									<el-radio  :label="0">内部</el-radio>
									<el-radio  :label="1">第三方</el-radio>
									<el-radio  :label="2">无</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item :label="$t('comp.comp_data.process')" prop="resource" class="spe">
								<el-radio-group v-model="ruleForm.yon">
									<el-radio  :label="0">否</el-radio>
									<el-radio  :label="1">是</el-radio>
								</el-radio-group>
							</el-form-item>
						</el-col>
					</div>
					<el-form-item :label="$t('comp.comp_data.cert_system')" class="man" prop="managementSystem_kind">
						<el-checkbox-group v-model="ruleForm.managementSystem_kind">
							<el-checkbox label="ISO 9000" name="type"></el-checkbox>
							<el-checkbox label="ISO 9001" name="type"></el-checkbox>
							<el-checkbox label="ISO 9002" name="type"></el-checkbox>
							<el-checkbox label="ISO 9003" name="type"></el-checkbox>
							<el-checkbox label="ISO 9004" name="type"></el-checkbox>
							<el-checkbox label="ISO 14000" name="type"></el-checkbox>
							<el-checkbox label="其它" name="type"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</div>
			</div>
			<div class="cert-com">
				<div class="tit dis-tab vert-b f-18">
					<span class="">{{$t('comp.comp_data.tit4')}}</span><span class="f-12 ml-20"></span>
				</div>
				<div class="form3_out">
					<div class="clearfix">
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.contact')" prop="contactName">
								<el-input v-model="ruleForm.contactName" placeholder="请输入姓名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.email')" prop="email">
								<el-input placeholder="邮箱" v-model="ruleForm.email"></el-input>
							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="7">
							<el-form-item :label="$t('comp.comp_data.tel')" prop="countryCode">
								<el-input placeholder="国家号" v-model="ruleForm.countryCode" :maxlength="10"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="2" class="pl-10">
							<el-form-item label="" prop="areaCode" class="label-none">														
								<el-input placeholder="区号" v-model="ruleForm.areaCode" :maxlength="10"></el-input>
							</el-form-item>							
						</el-col>
						<el-col :span="7" class="pl-10">
							<el-form-item label="" prop="mobile" class="label-none">						
								<el-input v-model="ruleForm.mobile" placeholder="手机号码"></el-input>
							</el-form-item>							
						</el-col>
						<el-col :span="2" style="line-height: 36px;text-align: center;">
							或
						</el-col>
						<el-col :span="6" class="pl-10">
							<el-form-item label="" prop="" class="label-none">												
								<el-input v-model="ruleForm.tel" placeholder="电话号码"></el-input>
							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.department')">
								<el-input v-model="ruleForm.department" placeholder="请输入所属部门" :maxlength="15"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item :label="$t('comp.comp_data.position')">
								<el-input v-model="ruleForm.contactPosition" placeholder="请输入职务" :maxlength="15"></el-input>
							</el-form-item>
						</el-col>
					</div>
				</div>
			</div>

			<div class="cert-com">
				<div class="tit dis-tab vert-b f-18 pos-r">
					<span class="">{{$t('comp.comp_data.tit5')}}</span>
					<div class="down-click" @click="boxshow = !boxshow">						
						<img :src="boxshow?'../../../static/img/comm/slide-up.png':'../../../static/img/comm/slide-down.png'"/>
					</div>				
				</div>
	    		<transition name="mybox">
	    			<div class="box" v-show="boxshow">
						<div class="form4_out">
							<div class="clearfix">
								<el-col :span="12">
									<el-form-item :label="$t('comp.comp_data.comp_name')">
										<el-input v-model="ruleForm.invoiceTitle" placeholder="请输入企业名称" :maxlength="25"></el-input>
									</el-form-item>
								</el-col>
							</div>
							<div class="clearfix">
								<el-col :span="12">
									<el-form-item :label="$t('comp.comp_data.bill_adress')">
										<el-input v-model="ruleForm.billingAddress" placeholder="请输入开票地址" :maxlength="55"></el-input>
									</el-form-item>
								</el-col>
							</div>
							<div class="clearfix">
								<el-col :span="12">
									<el-form-item :label="$t('comp.comp_data.bill_type')">
										 <el-select v-model="bill_typeValue" placeholder="请选择">
										    <el-option
										      v-for="item in bill_type"
										      :key="item.value"
										      :label="item.label"
										      :value="item.value">
										    </el-option>
										  </el-select>
									</el-form-item>
								</el-col>
							</div>
							<div class="clearfix">
								<el-col :span="12">
									<el-form-item :label="$t('comp.comp_data.taxpayer_id')">
										<el-input v-model="ruleForm.taxpayer" placeholder="请输入纳税人识别号" :maxlength="100"></el-input>
									</el-form-item>
								</el-col>
							</div>
							<div class="clearfix">
								<el-col :span="12">
									<el-form-item :label="$t('comp.comp_data.bank')">
										<el-input v-model="ruleForm.bank" placeholder="请输入开户银行" :maxlength="30"></el-input>
									</el-form-item>
								</el-col>
							</div>
							<div class="clearfix">
								<el-col :span="12">
									<el-form-item :label="$t('comp.comp_data.mobile')">
										<el-input v-model="ruleForm.billingPhone" placeholder="请输入开票电话" :maxlength="20"></el-input>
									</el-form-item>
								</el-col>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<div class="text-center pb-20">				
				<el-button class="cert_sub btn bg-green"  @click="submitForm('ruleForm')">{{$t('comm.submit')}}</el-button>			
			</div>
		</el-form>
	</div>
</template>

<script>
	import Vue from 'vue';
	
	import cropper from '@/components/user/comm/upload-img.vue';
	import {setCookie} from '@/assets/commjs/util.js';
	import {mapState} from 'vuex';	
	import {reg} from '@/assets/commjs/validator.js';
	export default {
		components: {
			cropper
		},
		data() {
			return {
				boxshow: false,
				post_ation: this.$root.urlPath.UPLOAD +'/upload/c',
//				post_ation: '/proxy/html/upload/c',
				imgurlObj: '',
				imageUrl: '',
				area: {
//					country: [],
					province: [],
					city: []
				},
				loading: false,
				select:{province: '',city: ''},
				areaSelect:{province: '',city: ''},//三级联动地区回显
				ruleForm: {
					name: '', //企业名称
					logo:'',//企业logo
//					businessLicense : '',//营业执照图片
					province: '',
					city: '', //县市
					address: '', //详细地址
					zipCode: '', //邮政编码
					mainProduct: '', //主营产品
					establishment_Date: '', //注册时间,前端回显用
					establishmentDate: '',//注册时间
					registeredCapital: '', //注册资本
					businessNo: '', //统一社会信用代码
					comprehensive_kind: [], //经营种类，前端显示用
					comprehensive: '',//经营种类
					manageBusiness: '', //经营范围
					type: '', 
					introduction: '', //企业简介
					businessLicense: '', //营业执照
					path: '',
					staffNumber: '', //员工人数
					turnover: '', //营业额
					realField: '', //厂房面积
					export: '', //年出口额
					quality: '', //质量控制，0内部1第三方2无
					yon: '', //是否对外加工定制
					managementSystem_kind: [], //管理体系认证,前端回显用
					managementSystem: '',//管理体系认证
					contactName: '', //联系人姓名
					email: '',
					countryCode: '',//国家号
					areaCode: '',//区号
					mobile: '', //电话
					tel: '', //手机号
					department: '', //所属部门
					contactPosition: '', //职务
					invoiceTitle : '',//发票企业名称
					billingAddress: '', //开票地址
					billingType: '', //发票类型，0增值税普通发票,1增值税专用发票
					taxpayer: '', //纳税人识别号
					bank: '', //开户银行
					billingPhone: '' //开票电话

				},
				imageUrl1: '',//营业执照  
				imageUrl2: '',
				imageUrl3: '',
				imageUrl4: '',
				staff_num: [{
				  value: '少于50人',
		          label: '少于50人'
		        }, {
		          value: '50~150人',
		          label: '50~150人'
		        }, {
		          value: '150~500人',
		          label: '150~500人'
		        }, {
		          value: '500~1000人',
		          label: '500~1000人'
		        }, {
		          value: '1000人以上',
		          label: '1000人以上'
		        }],
		        turnover: [{
		        	value: '10万元以下'
		        },{
		        	value: '10万元-30万元'
		        },{
		        	value: '31万元-50万元'
		        },{
		        	value: '51万元-00万元'
		        },{
		        	value: '101万元-200万元'
		        },{
		        	value: '201万元-500万元'
		        },{
		        	value: '500万元-1000万元'
		        },{
		        	value: '1000万元-2000万元'
		        },{
		        	value: '2000万元-5000万元'
		        },{
		        	value: '5000万元-1亿元'
		        },{
		        	value: '1亿元以上'
		        },{
		        	value: '10亿以上'
		        }],
		        bus_export: [{
		        	value: '人民币10万元/年以下'
		        },{
		        	value: '人民币10万元/年-人民币30万元/年'
		        },{
		        	value: '人民币31万元/年-人民币50万元/年'
		        },{
		        	value: '人民币51万元/年-人民币100万元/年'
		        },{
		        	value: '人民币101万元/年-人民币200万元/年'
		        },{
		        	value: '人民币201万元/年-人民币500万元/年'
		        },{
		        	value: '人民币500万元/年-人民币1000万元/年'
		        },{
		        	value: '人民币1000万元/年-人民币2000万元/年'
		        },{
		        	value: '人民币2000万元/年-人民币5000万元/年'
		        },{
		        	value: '人民币5000万元/年-1亿元/年'
		        },{
		        	value: '1亿元以上/年'
		        },{
		        	value: '10亿以上/年'
		        }],
				bill_type: [{
		          value: 0,
		          label: '增值税普通发票'
		        }, {
		          value: 1,
		          label: '增值税专用发票'
		        }],
		        bill_typeValue: '',
				rules: {
					name: [
						{required: true, message: '请输入企业名称', trigger: 'blur'}
					],
					city: [
						{required: true, message: '请选择活动区域', trigger: 'change'}
					],
					address: [
						{required: true, message: '请输入详细区域', trigger: 'blur'}
					],
					zipCode: [				
						{required: false, validator: reg.number, message: '请输入正确的邮政编码', trigger: 'blur'}
					],
					mainProduct: [
						{required: true, message: '请输入公司主营产品', trigger: 'change'}
					],
					establishment_Date: [
						{type: 'date', required: true, message: '请选择日期'}
					],
					registeredCapital:[
						{validator: reg.number, message:'请输入正确的注册资本', trigger: 'blur'}
					],
					businessNo: [
						{required: true, message: '请输入统一社会信用代码', trigger: 'change'}
					],
					comprehensive_kind: [
						{type: 'array', required: true, message: '请至少选择一种经营种类', trigger: 'change' }
					],
					type: [
						{required: true, message: '请选择企业类型', trigger: 'blur'}
					],
					introduction: [
						{required: true, message: '请输入企业简介', trigger: 'change' },
						{ min: 50, max: 1000, message: '长度在 50 到 1000 个字符', trigger: 'blur' }
					],
					realField: [
						{validator: reg.number, message:'请输入正确的厂房面积', trigger: 'blur'}						
					],
//					managementSystem_kind: [
//						{type: 'array', required: true, message: '请至少选择一中经营种类', trigger: 'change' }
//						
//					],
					contactName: [
						{required: true, message: '请输入联系人姓名', trigger: 'change' }
						
					],
					email: [
						{required: true, message: '请输入邮箱', trigger: 'blur' },
						{validator: reg.email, message: '请输入正确的邮箱', trigger: 'blur' },
					],
					mobile: [
						{required: true, message: '请输入联系电话', trigger: 'blur' },
						{validator: reg.tel, message:'请输入正确的联系电话', trigger: 'change'}
					],
					countryCode: [
						{required: true, message: '请输入国家号', trigger: 'blur' }
						
					],
					areaCode: [
						{required: true, message: '请输入区号', trigger: 'blur' }
						
					],
				}
			};
		},
		computed: mapState({
//			userStates: store => store.userInfo.userStates		
		}),
		created() {
			var userStates = sessionStorage.getItem("userStates"); 
			if (userStates == '4'||userStates == 'null'||userStates == '3') {		
				this.load();	
			} else {
				this.$router.push('/user/user_index')
			}
		},	
		methods: {
			load() {
				const params= {}
				var that = this;
				this.$http.get(this.$root.urlPath.MJK+'/area/subArea?pId=1').then(function(res){
					this.area.province = res.body.data;
				})
				this.$http.get(this.$root.urlPath.MJK + '/company/selectCompayAndCompanyLang').then(function(res) { 
					if(res.body.success) {					
						this.userBO = res.body.data;
						console.log(this.userBO);
						this.ruleForm.name = this.userBO.name;
						this.ruleForm.logo = this.userBO.logo;
//						this.areaSelect.country = this.userBO.country.split(',')[1];
						this.areaSelect.province = this.userBO.province?this.userBO.province.split(',')[0] : '';
						this.areaSelect.city = this.userBO.city?this.userBO.city.split(',')[0] : '';
						console.log(this.areaSelect)
//						this.ruleForm.country = this.userBO.country.split(',')[0];
						this.ruleForm.province = this.userBO.province?this.userBO.province.split(',')[1] : '';				
						this.ruleForm.city = this.userBO.city?this.userBO.city.split(',')[1] : '';
						this.ruleForm.address = this.userBO.address;
						this.ruleForm.zipCode = this.userBO.zipCode;
						this.ruleForm.mainProduct = this.userBO.mainProduct;
						this.ruleForm.website = this.userBO.website;
						this.ruleForm.establishment_Date = new Date(this.userBO.establishmentDate);
						this.ruleForm.establishmentDate = this.userBO.establishmentDate;
						this.ruleForm.registeredCapital = this.userBO.registeredCapital;
						this.ruleForm.businessLicense = this.userBO.businessLicense;
						this.imageUrl1 = this.userBO.businessLicense;
						this.ruleForm.path = this.userBO.path;
						this.imageUrl2 = this.userBO.path?this.userBO.path.split(',')[0]: '';
						this.imageUrl3 = this.userBO.path?this.userBO.path.split(',')[1]: '';
						this.imageUrl4 = this.userBO.path?this.userBO.path.split(',')[2]: '';
						
						this.ruleForm.businessNo = this.userBO.businessNo;
						this.ruleForm.comprehensive = this.userBO.comprehensive;
						const comprehensive_kindArr = this.userBO.comprehensive.split(',') 
						this.ruleForm.comprehensive_kind = comprehensive_kindArr.map(function(item,index,array){
							return Number(item)
						});
//						this.comprehensive_kind = [1,2,4]
						this.ruleForm.manageBusiness = this.userBO.manageBusiness;
						this.ruleForm.type = this.userBO.type;
						this.ruleForm.introduction = this.userBO.introduction;
//						this.ruleForm.businessLicense = this.userBO.businessLicense;
						this.ruleForm.staffNumber = this.userBO.staffNumber;
						this.ruleForm.turnover = this.userBO.turnover;
						this.ruleForm.realField = this.userBO.realField;
						this.ruleForm.export = this.userBO.export;
						this.ruleForm.quality = this.userBO.quality;				
						this.ruleForm.yon = Number(this.userBO.yon);
						this.ruleForm.managementSystem = this.userBO.managementSystem;
						this.ruleForm.managementSystem_kind = this.userBO.managementSystem?this.userBO.managementSystem.split(','):[];
						this.ruleForm.contactName = this.userBO.contactName;
						this.ruleForm.email = this.userBO.email;
						this.ruleForm.countryCode = this.userBO.countryCode;
						this.ruleForm.areaCode = this.userBO.areaCode;
						
						this.ruleForm.mobile = this.userBO.mobile;
						this.ruleForm.tel = this.userBO.tel;
						this.ruleForm.department = this.userBO.department;
						this.ruleForm.contactPosition = this.userBO.contactPosition;
						this.ruleForm.invoiceTitle  = this.userBO.invoiceTitle ;
						this.ruleForm.billingAddress = this.userBO.billingAddress;
						this.ruleForm.billingType = that.userBO.billingType;
						that.bill_typeValue = that.userBO.billingType;
//						this.bill_type.forEach(function(item,index){
//							if(item.value == that.userBO.billingType){
//							}
//						})
						this.ruleForm.taxpayer = this.userBO.taxpayer;
						this.ruleForm.bank = this.userBO.bank;
						this.ruleForm.billingPhone = this.userBO.billingPhone;
					}
				}, function(res) {
					console.log()
				})
			},
	        getUrl(msg) {
		      	this.imgurlObj = msg;
//		      	console.log(this.imgurlObj)
		      	this.ruleForm.logo = JSON.parse(this.imgurlObj).path;
		    },
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			handleAvatarSuccess1(res, file) {
				console.log(res.path);
//				this.imageUrl1 = URL.createObjectURL(file.raw);
				this.imageUrl1 = res.path;
				this.ruleForm.businessLicense = res.path;
			},
			handleAvatarSuccess2(res, file) {
				console.log(res);
//				this.imageUrl2 = URL.createObjectURL(file.raw);
				this.imageUrl2 = res.path
			},
			handleAvatarSuccess3(res, file) {
				console.log(res);
//				this.imageUrl3 = URL.createObjectURL(file.raw);
				this.imageUrl3 = res.path
			},
			handleAvatarSuccess4(res, file) {
				console.log(res);
//				this.imageUrl4 = URL.createObjectURL(file.raw);
				this.imageUrl4 = res.path
			},
			beforeAvatarUpload1(file) {
				const isJPG = file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('请上传正确格式的头像图片!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			beforeAvatarUpload2(file) {
				const isJPG = file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('请上传正确格式的头像图片!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			beforeAvatarUpload3(file) {
				const isJPG = file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('请上传正确格式的头像图片!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			beforeAvatarUpload4(file) {
				const isJPG = file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if(!isJPG) {
					this.$message.error('请上传正确格式的头像图片!');
				}
				if(!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			selProvince(current) {			
				if(parseInt(current)){
					this.$http.get(this.$root.urlPath.MJK+'/area/subArea?pId='+current).then(function(res){
						if(res.body.success){						
							this.area.city = res.body.data;
						}
					});
				}				
				this.area.province.forEach((item)=>{
					if(item.id == current){
						console.log(item.areaname)
						this.select.province = item.areaname;
						this.ruleForm.province = item.id;
					}
				})	
				this.select.city = '';
				this.ruleForm.city = '';				
			},
			selCity(current) {			
				this.area.city.forEach((item)=>{
					if(item.id == current){
						this.select.city = item.areaname;
						this.ruleForm.city = item.id;
					}
				})	
			},
			submitForm(formName) {
//				console.log(this.ruleForm)
				if(!this.ruleForm.logo){
					this.$message.error('请上传企业logo');
					return false;
				}
		        this.$refs[formName].validate((valid) => {
		          	if (valid) {
		          		if(!this.ruleForm.businessLicense){
		          			this.$message.error('请上传营业执照');
		          			return false;
		          		}
		          		const path_arr = [];
		          		if (this.imageUrl2) {		          			
		          			path_arr.push(this.imageUrl2);
		          		}
		          		if (this.imageUrl3) {		          			
		          			path_arr.push(this.imageUrl3);
		          		}
		          		if (this.imageUrl4) {		          			
		          			path_arr.push(this.imageUrl4);		          		
		          		}
		          		const path = path_arr.join(',');
		          		this.ruleForm.billingType = this.bill_typeValue;
		          		var d = this.ruleForm.establishment_Date
		          		this.ruleForm.establishmentDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
		          		this.ruleForm.comprehensive = this.ruleForm.comprehensive_kind.join(',');
		          		this.ruleForm.managementSystem = this.ruleForm.managementSystem_kind.join(',');
		          		this.ruleForm.path = path;
						const params = this.ruleForm;
						console.log(params)
						this.$confirm('确认提交所有资料?', '提示', {
				          	confirmButtonText: '确定',
				          	cancelButtonText: '取消',
				          	type: 'success'
				       	}).then(() => {				          	
				       		this.loading = true;
			            	this.$http.post(this.$root.urlPath.MJK + '/company/saveCompany',params).then(function(res){
			          			this.loading = false;	            	
				            	if(res.body.success){				            		
				            		this.$message({
							          showClose: true,
							          message: '资料已提交,请您耐心等待审核结果！',
							          type: 'success'
							        });
							       	this.$router.push('/user/user_index')
				            	}else{  
				            		this.$message({
							          	showClose: true,
							          	message: res.body.errMsg,
							          	type: 'error'
							        });
				            	}
				            },function(res){
				          		this.loading = false;		            	
				            })
				        }).catch(() => {
			          		         
				        });
	          		} else {		          	
		           		this.$message({
				          	showClose: true,
				          	message: '资料不完整',
				          	type: 'error'
				        });
		            	return false;
		          	}
		        });
	      	}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
	.form1_out .el-checkbox{
		margin: 0 30px 0 0;
	}
	.form1_out .el-checkbox+.el-checkbox{
		margin-left: 0;
	}
	.label-none .el-form-item__content{
		margin-left: 0!important;
	}
	.avatar-upload{
		padding: 20px 72px;
	    border-bottom: 1px solid #d9d9d9;
	   	
	}
	.img-out{
		float: left;
	}
	.img-out img{
		border-radius: 10px;
	    overflow: hidden;
	    border: 1px solid #b5b5b5;
	    width: 140px !important;
	    height: 140px!important;
	}
	.upload-out{
		text-align: left;
	    padding-left: 165px;
	}
	.hint{
		font-size: 16px;
		margin-top: 15px;
		display: block;
		width: 100%;
		float: left;
		text-align: left;
		margin-bottom: 20px;
	}
	.file-uploads{
	    width: 100%;
	    padding: 8px 0;
	    border-radius: 30px;
	    color: white;
	    font-size: 24px;
	    background: #32b16c;
	}
	.box{
        height: 404px;
        background-color:black;  
         overflow: hidden;                       
    }
    .mybox-leave-active,.mybox-enter-active{
        transition:  all .6s ease; 
    }
    .mybox-leave-active,.mybox-enter{
        height:0px !important;
    }
    .mybox-leave,.mybox-enter-active{
        height: 404px;
    }
</style>