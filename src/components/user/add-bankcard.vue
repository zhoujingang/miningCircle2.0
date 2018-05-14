<template>
	<div class="flex-1 main-right">
		<div class="cert-com">		
			<p class="tit f-18">添加银行卡</p>
			<div class="tip f-13">
				<p class="mb-10">1. 请慎重填写以上信息，一个用户只能添加一张银行账户，添加以后不能修改！</p>
				<p>2. 您如果没有设置资金密码或者忘记资金密码，请先设置资金密码，再添加银行卡信息，我们会为您保留此页面的账户信息。</p>
			</div>
			<div class="pt-20 mb-20 bg-white clearfix">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-col :span="12" :offset="6">
						<el-row>
							<el-col :span="18">
								<el-form-item label="真实姓名：" prop="realName">
									<el-input v-model="ruleForm.realName" placeholder="银行卡开户姓名"></el-input>
								</el-form-item>							
							</el-col>
						</el-row>
						<el-row>
							<el-form-item label="身份证号：" prop="idCard">
								<el-input v-model="ruleForm.idCard" placeholder="请填写身份证号"></el-input>
							</el-form-item>
						</el-row>
						<el-row>
							<el-col :span="18">
								<el-form-item label="开户银行：" prop="bankType">
									<el-select v-model="ruleForm.bankType" placeholder="请选择" class="full-w">
									    <el-option
									      	v-for="item in bank_options"
									      	:key="item.value"
									      	:label="item.label"
									      	:value="item.value">
									    </el-option>
								  	</el-select>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="18">
								<el-form-item label="开户行网点：" prop="bankZone">
									<el-input v-model="ruleForm.bankZone" :maxlength="25" placeholder="请填写"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="18">								
								<el-form-item label="开户行所在地：" prop="address">
									<el-input v-model="ruleForm.address" :maxlength="30" placeholder="请填写"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item label="银行卡号：" prop="bankCard">
								<el-input v-model="ruleForm.bankCard" :maxlength="25" placeholder="请填写"></el-input>
							</el-form-item>
						</el-row>
						<el-row>
							<el-col :span="18">								
								<el-form-item label="资金密码：" prop="assetPwd">
									<el-input type="password" v-model="ruleForm.assetPwd" :disabled="!isFundsPwd" :maxlength="26" placeholder="请填写"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<router-link to="/user/act_set_fundspwd" class="col-pri pl-10" style="line-height: 36px;" v-if="isFundsPwd">忘记密码？</router-link>
								<a target="_blank" href="/user/act_security/act_set_fundspwd" class="col-pri pl-10" style="line-height: 36px;" v-else>去设置</a>
							</el-col>
						</el-row>
						<el-row>
							<el-form-item label="">
								<el-button class="btn bank-sub" @click="submitForm('ruleForm')">提交</el-button>
							</el-form-item>
						</el-row>
					</el-col>
				</el-form>
			</div>
		</div>	
	</div>
</template>

<script>
	import Vue from 'vue';
	import {reg} from '@/assets/commjs/validator.js';
	
	export default{
		data() {
			return{
				isFundsPwd: '',
				ruleForm: {
					realName: '',//姓名
					idCard: '',//身份证号
					bankType: '',//开户行
					bankZone: '',//开户网点
					address: '',//地址
					bankCard: '',//银行卡号
					assetPwd: ''//资金密码
				},
				rules:{
					realName: [
						{required: true, message: '请输入开户姓名', trigger: 'blur'}					
					],
					idCard: [
						{required: true, message: '请输入身份证号', trigger: 'blur'},
						{validator: reg.idCard, message: '请输入正确的身份证号', trigger: 'change'}					
					],
					bankType: [
						{required: true, message: '请选择开户银行', trigger: 'blur'}											
					],
					bankZone: [
						{required: true, message: '请输入开户网点', trigger: 'blur'}											
					],
					address: [
						{required: true, message: '请输入开户地址', trigger: 'blur'}											
					],
					bankCard: [
						{required: true, message: '请输入银行卡号', trigger: 'blur'}											
					],
					assetPwd: [
						{required: true, message: '请输入资金密码', trigger: 'blur'}											
					],
				},
				bank_options: [{
		          	value: '1',
		          	label: '中国农业银行'
		        }, {
		          	value: '2',
		          	label: '中国工商银行'
		        }, {
		          	value: '3',
		          	label: '招商银行'
		        }, {
		          	value: '4',
		          	label: '中国银行'
		        }, {
		          	value: '5',
		          	label: '交通银行'
		        }, {
		          	value: '6',
		          	label: '兴业银行'
		        }, {
		          	value: '7',
		          	label: '广东发展银行'
		        }, {
		          	value: '8',
		          	label: '中国建设银行'
		        }, {
		          	value: '9',
		          	label: '中国邮政储蓄银行'
		        }, {
		          	value: '10',
		          	label: '上海浦东发展银行'
		        }, {
		          	value: '11',
		          	label: '民生银行'
		        }, {
		          	value: '12',
		          	label: '中国光大银行'
		        }, {
		          	value: '13',
		          	label: '华夏银行'
		        }, {
		          	value: '15',
		          	label: '交通银行'
		        }, {
		          	value: '21',
		          	label: '平安银行'
		        }]
			}
		},
		created() {
			this.$http.get(this.$root.urlPath.MJK+ '/account/userAssetIsExit').then(function(res){
				if(res.body.success){
					this.isFundsPwd = res.body.data
				}
			},function(res){
				
			})
			console.log(this.isFundsPwd)
		},
		methods: {
			submitForm(formName) {
				console.log(this.ruleForm.bankType)
				this.$refs[formName].validate((valid) => {
					if (valid) {
						const params = this.ruleForm;
						this.$http.get(this.$root.urlPath.MJK + '/rechargecash/bindBankCard?status=0',{params:params}).then(function(res){
							if(res.body.success){
								this.$message({
						          	showClose: true,
						          	message: '添加银行卡成功',
						          	type: 'success'
						        });
						        this.$router.push('/user/act_funds/withdraw')
							}
						},function(){
							
						})
					} else {
						
					}
				})
			}
		}
	}
</script>

<style>
</style>