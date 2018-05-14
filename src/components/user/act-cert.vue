<template>
	<div class="flex-1 main-right">
		<div class="cert-com">
			<div class="tit dis-tab vert-b f-20">
				<span class="">{{$t('user.act_cert.tit')}}</span><span class="f-12 ml-20">(*红色星号部分为必填项，请真实填写，增加更高信用值)</span>
			</div>
			<div class="tip f-13">
				<p class="mb-10">1.您还没有认证旗舰店，请填写企业信息，拥有自己的旗舰店和企业中心页（旗舰店可发布商品和服务，企业中心可对自己发布的商品和服务等信息进行管理）</p>
				<p>2.企业介绍是企业重要的展示信息，为保障信息真实性、合法性、有效性和完整性，建议实名发布！</p>
			</div>
			<!--<div class="tit dis-tab vert-b f-18">
				<span class="">个人头像</span>
			</div>-->
			<div class="pos-r">
				<p class="hint col-green pl-20" v-if="ruleForm.headImgUrl">点击“上传”，修改个人头像。</p>
      			<p class="hint col-green" v-else>您的目前还没有头像,请点击“上传”，上传个人头像。</p>
				<cropper @transferUser="getUrl" :headImg="this.ruleForm.headImgUrl"></cropper>
			</div>
		</div>
		<div class="cert-com">
			<div class="tit dis-tab vert-b f-18">
				<span class="">{{$t('user.act_cert.set')}}</span><span class="f-12 ml-20"></span>
			</div>
			<div class="form4_out">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<div class="clearfix">
						<el-col :span="12">
							<el-form-item :label="$t('user.act_cert.name')" prop="realName">
								<el-input  placeholder="请输入真实姓名" v-model="ruleForm.realName" :maxlength="25"></el-input>
							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="12">
							<el-form-item :label="$t('user.personal.majors')" prop="major">
								<el-input  placeholder="请输入专业" v-model="ruleForm.major" :maxlength="25"></el-input>
							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="12">
							<el-form-item :label="$t('user.personal.tel')" prop="mobile">
								<el-input  placeholder="请输入联系电话" v-model="ruleForm.mobile"></el-input>
							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="12">
							<el-form-item :label="$t('user.personal.email')" prop="email">
								<el-input  placeholder="请输入邮箱" v-model="ruleForm.email"></el-input>
							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="12">
							<el-form-item :label="$t('user.personal.address')" prop="address">
								<el-input  placeholder="请输入地址" v-model="ruleForm.address" :maxlength="80"></el-input>
							</el-form-item>
						</el-col>
					</div>
					<div class="clearfix">
						<el-col :span="24">
							<el-form-item :label="$t('user.personal.self_evaluation')" prop="resume">
								<el-input type="textarea" v-model="ruleForm.resume" placeholder="请输入自我评价,最多200个字符" class="textarea-100" :maxlength="200"></el-input>
							</el-form-item>
						</el-col>
					</div>
				</el-form>
				<div class="mt-20 mb-20 text-center"><button class="cert_sub btn bg-green" @click="submitForm('ruleForm')">完成提交</button></div>
			</div>
		</div>
		<!--<cropper></cropper>-->
	</div>
</template>

<script>
	import Vue from 'vue';
	import cropper from '@/components/user/comm/upload-img.vue';
	
	export default {
		components: {
			cropper
		},
    data() {
      return {
      	imgurlObj: '',
        ruleForm: {
        	headImgUrl: '',
        	realName: '',
        	major: '',
        	mobile: '',
        	email: '',
        	address: '',
        	resume: ''
        },
        imageUrl: '',
        rules: {
          realName: [
            { required: true, message: '请输入姓名！', trigger: 'blur' }
          ],
          major: [
            { required: true, message: '请输入专业！', trigger: 'blur' }
          ],
          mobile: [
          	{ required: true, message: '请输入手机号码！', trigger: 'blur'},
          	{validator:(rule,value,callback)=>{
                if(/^^1[34578]\d{9}$/.test(value) == false){
                    callback(new Error("请输入正确的手机号！"));
                }else{
                    callback();
                }
            }, trigger:'blur'}
          ],
          email: [
          	{ required: true, message: '请输入邮箱！', trigger: 'change'},
            { type: 'email', message: '请输入正确邮箱', trigger: 'change' }
          ],
          address: [
            { required: true, message: '请输入地址！', trigger: 'change' }
          ],
          resume: [
            { required: true, message: '请输入自我评价！', trigger: 'change' }
          ]
        }
      };
    },
    created() {
    	this.$http.get(this.$root.urlPath.MJK + '/auth/userAuth').then(function(res){
    		console.log(res)
    		if(res.body.data){
    			this.echo = res.body.data
    			this.ruleForm.realName = this.echo.realName;
    			this.ruleForm.major = this.echo.major;
    			this.ruleForm.mobile = this.echo.mobile;
    			this.ruleForm.email = this.echo.email;
    			this.ruleForm.resume = this.echo.resume;
    			this.ruleForm.headImgUrl = this.echo.headImgUrl;
    			this.ruleForm.address = this.echo.address;    			
    		}
    	},function(res){
    		
    	})
    },
    methods: {
      	submitForm(formName) {
	      	if(this.ruleForm.headImgUrl){
	      		this.$refs[formName].validate((valid) => {
		          	if (valid) {
			          	this.$http.post(this.$root.urlPath.MJK+'/auth/saveUserAuth',this.ruleForm).then(function(res){
			          		if(res.body.success){
			          			this.$router.push('act_data')
			          		}
			          		
			          	},function(res){
		          		
		          		})
		          	} else {
		            	console.log('error submit!!');
		            	return false;
		          	}
		        });
	      	}else{
	      		this.$message({
		          showClose: true,
		          message: '请上传个人头像',
		          type: 'error'
		        });
	      	}
        
     	},
      	getUrl(msg) {
      		this.imgurlObj = msg;
      		console.log("shishi",this.ruleForm.headImgUrl)
      		this.ruleForm.headImgUrl = JSON.parse(msg).path;     
      	}
    }
  }
</script>

<style>
	@import '../../../static/css/user/user.css'; 
	/*图片上传*/
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
</style>