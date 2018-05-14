<template>
	<div class="flex-1 main-right">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm bg-white">
			<div class="cert-com">
				
				<div class="tit dis-tab vert-b f-18">
					<span class="">{{$t('comp.investor_data.tit')}}</span><span class="f-12 ml-20">(*红色星号部分为必填项，请真实填写，增加更高信用值)</span>
				</div>
				<div class="form1_out">
						
						<el-row>
							<el-col :span="10">
								<el-form-item :label="$t('comp.investor_data.amount')" prop="amount">
									<el-input v-model="ruleForm.amount" placeholder="万元"></el-input>
								</el-form-item>								
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">							
								<el-form-item :label="$t('comp.investor_data.currency')" prop="currency">
									<el-select v-model="ruleForm.currency" class="full-w" placeholder="请选择">
										<el-option
									      v-for="item in currency"
									      :key="item.value"
									      :label="item.label"
									      :value="item.value">
									    </el-option>
									</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="10">
								<el-form-item :label="$t('comp.investor_data.mode')" prop="mode">
									<el-input v-model="ruleForm.mode" placeholder=""></el-input>
								</el-form-item>							
							</el-col>
						</el-row>
						<el-form-item :label="$t('comp.investor_data.minerals')" prop="minerals">
							<el-checkbox-group v-model="ruleForm.minerals">
								<el-checkbox label="1" name="mineral_type">金属矿产</el-checkbox>
								<el-checkbox label="2" name="mineral_type">有色金属</el-checkbox>
								<el-checkbox label="4" name="mineral_type">黑色金属</el-checkbox>
								<el-checkbox label="8" name="mineral_type">能源矿产</el-checkbox>
								<el-checkbox label="16" name="mineral_type">稀土分散</el-checkbox>
								<el-checkbox label="32" name="mineral_type">非金属</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-row>
							<el-col :span="24">
								<el-form-item :label="$t('comp.investor_data.address')" prop="province">
									<el-select v-model="select.country" :placeholder="areaSelect.country?areaSelect.country:'洲/国家'" @change="selContinent">
										<template v-for="(item,index) in area.country">									
											<el-option :label="item.areaname" :value="item.id">
												
											</el-option>
										</template>
									</el-select>
									<el-select v-model="select.province" :placeholder="areaSelect.province?areaSelect.province:'国家/地区'" @change="selCountry">
										<template v-for="(item,index) in area.province">									
											<el-option :label="item.areaname" :value="item.id">
												
											</el-option>
										</template>
									</el-select>
									<el-select v-model="select.city" :placeholder="areaSelect.city?areaSelect.city:'省份/地区'" @change="selProvince">
										<template v-for="(item,index) in area.city">
											<el-option :label="item.areaname" :value="item.id">
												
											</el-option>
										</template>
									</el-select>
									<el-select v-model="select.county" :placeholder="areaSelect.county?areaSelect.county:'城市/地区'" @change="selCity">
										<template v-for="(item,index) in area.county">
											<el-option :label="item.areaname" :value="item.id">
												
											</el-option>
										</template>
									</el-select>								
								</el-form-item>
							</el-col>				
						</el-row>
						<el-form-item :label="$t('comp.investor_data.require')" prop="requirement">
							<el-input v-model="ruleForm.requirement" type="textarea" placeholder="请输入您的投资要求"></el-input>
							<p class="f-12 col-999 text-right line-h-25">请详细介绍您的投资意向，及现阶段投资的标准，如种类，属性等。</p>					
						</el-form-item>
				</div>
				<!--<div class="pd-5">
					<label class="checkbox pos-r mt-0">
						<input type="checkbox" v-model="agree"><i></i>我已阅读并同意 			
						<a target="_blank" style="color: #2da5da;" href="">《矿业圈网站服务协议》
						</a>	
						<p class="col-red mb-0 mt-5" v-show="agreeError">请同意以上协议</p>
					
					</label>
				</div>-->
				<el-row>
					<el-col :offset="2">
						<el-checkbox v-model="agree">
							我已阅读并同意<a target="_blank" style="color: #2da5da;" href="http://www.miningcircle.com/static/help_agreement_yi_baomibukuayue.html">《投资认证保密及不跨越协议》
						</a></el-checkbox>
						<p class="col-red mb-0 mt-5 pl-20 ml-5" v-show="agreeError">请同意以上协议!</p>					
					</el-col>
				</el-row>
				<el-row class="pb-20 mt-20 text-center">			
						<el-button class="cert_sub btn bg-green"  @click="submitForm('ruleForm')">发布投资人信息</el-button>			
				</el-row>
			</div>
		</el-form>
	</div>
</template>

<script>
	import Vue from 'vue';
	
	export default {
		data() {
			return{
//				investor: '',
				area: {
					country: [],
					province: [],
					city: [],
					county: []
				},
				select:{country: '',province: '',city: '',county: ''},	
				areaSelect:{country: '',province: '',city: '',county: ''},//联动地区回显
				ruleForm:{
					minerals: [],// 矿种，String 逗号间隔
					country: '',//洲
					province: '',// 国家 
					city: '',// 省
					county: '',// 市
					currency: '',// 币种
					amount: '',// 可投资金额
					mode: '',// 投资方式
					requirement:''// 投资要求
				},
//				mineral: [],
				agree: false,
				agreeError: false,
				rules: {
					amount: [
						{required: true, message: '请输入投资金额', trigger: 'change' }
					],
					mode: [
						{required: true, message: '请输入投资方式', trigger: 'change' }
					],
					minerals: [
						{type: 'array', required: true, message: '请至少选择一种矿种', trigger: 'change' }
					],
					province: [
						{required: true, message: '请选择地址', trigger: 'change' }
					],
					requirement: [
						{required: true, message: '请输入投资要求', trigger: 'change' }
					],
				},
				currency: [{
		          	value: 'CNY',
		          	label: 'CNY人民币'
		        }, {
		          	value: 'USD',
		          	label: 'USD美元'
		        }, {
		          	value: 'EUR',
		          	label: 'EUR欧元'
		        }, {
		          	value: 'HKD',
		          	label: 'HKD港币'
		        }, {
		          	value: 'GBP',
		          	label: 'GBP英镑'
		        }, {
		          	value: 'JPY',
		          	label: 'JPY日元'
		        }, {
		          	value: 'KRW',
		          	label: 'KRW韩元'
		        }]
			}
		},
		created() {
//			this.ruleForm.mineral = [1,2]
			this.$http.get(this.$root.urlPath.MJK + '/company/getInvestor').then(function(res){
				if(res.body.success){
					if(res.body.data.investorVO){						
						const investor = res.body.data.investorVO;
						this.ruleForm.amount = investor.amount.toString();
						this.ruleForm.currency = investor.currency;
						this.ruleForm.mode = investor.mode;
						this.ruleForm.requirement = investor.requirement;
						var str = investor.mineral;
						this.ruleForm.minerals = str.split(',');
						this.ruleForm.country = investor.country?investor.country.split(',')[0] : '';
						this.ruleForm.province = investor.province?investor.province.split(',')[0] : '';
						this.ruleForm.city = investor.city?investor.city.split(',')[0] : '';
						this.ruleForm.county = investor.county?investor.county.split(',')[0] : '';
						this.areaSelect.country = investor.country?investor.country.split(',')[1] : '';
						this.areaSelect.province = investor.province?investor.province.split(',')[1] : '';
						this.areaSelect.city = investor.city?investor.city.split(',')[1] : '';
						this.areaSelect.county = investor.county?investor.county.split(',')[1] : '';
					}
				}
			})
//			this.ruleForm.minerals = [1,2]
			this.$http.get(this.$root.urlPath.MJK+'/area/primaryArea').then(function(res){
				if(res.body.success){
					this.area.country = res.body.data;
				}
			},function(){
				
			});
		},
		watch: {
			agree() {
				if(this.agree){
					this.agreeError = false;
				}
			}
		},
		methods: {
			submitForm(formName) {
				console.log(this.ruleForm)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(!this.agree){
							this.agreeError = true;
							return false;					
						}
						const params = this.ruleForm
						const mineral = this.ruleForm.minerals.join(',');
						this.$http.get(this.$root.urlPath.MJK+'/company/saveInvestor?mineral='+mineral,{params:params}).then(function(res){
							if(res.body.success){
								this.$router.push('comp_investor')
							}else{
								this.$message({
						          	showClose: true,
						          	message: res.body.errMsg,
						          	type: 'error'
						        });
							}
						},function(){
							
						})
					} else {
						
					}
				})
			},
			selContinent(current) {
				console.log(current)
				this.ruleForm.country = current;
				this.$http.get(this.$root.urlPath.MJK+'/area/subArea?pId='+current).then(function(res){
					this.area.province = res.body.data;
				})
				this.select.province = '';
				this.select.city = '';
				this.select.county = '';
				this.ruleForm.province = '';
				this.ruleForm.city = '';
				this.ruleForm.county = '';
				this.area.city = [];
				this.area.county = [];
				this.areaSelect = '';
//				this.areaSelect.city = '';
//				this.areaSelect.county = '';
//				Vue.set(this.areaSelect);
				
			},
			selCountry(current) {			
				this.ruleForm.province = current;
				this.$http.get(this.$root.urlPath.MJK+'/area/subArea?pId='+current).then(function(res){
					console.log(res.body)
					this.area.city = res.body.data;
				})
				this.select.city = '';
				this.select.county = '';		
				this.ruleForm.city = '';
				this.ruleForm.county = '';						
			},
			selProvince(current) {		
				console.log(current)
				this.ruleForm.city = current;	
				if(parseInt(current)){
					this.$http.get(this.$root.urlPath.MJK+'/area/subArea?pId='+current).then(function(res){
						if(res.body.success){	
							console.log((res))
							this.area.county = res.body.data;
						}
					});
				}				
				this.select.county = '';
				this.ruleForm.county = '';
				
			},
			selCity(current) {		
				this.ruleForm.county = current;
			}
		}
		
	}
</script>

<style>
	  @import '../../../static/css/user/user.css'; 
</style>