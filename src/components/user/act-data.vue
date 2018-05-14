<template>
	<div class="flex-1 main-right">
		<div class="cert-com">
			<div class="tit dis-tab vert-b f-20">
				<span class="">{{$t('user.personal.tit')}}</span>
			</div>
			<div class="pos-r">
				<div class="headImg-out">
					<img :src="personalInfo.headImgUrl" alt="" />
					<p class="text-center pd-10 text-overflow">{{personalInfo.realName}}</p>
				</div>
				<div class="bg-white act-data">
					<div class="text-right pb-10"><span class="col-999">{{$t('user.personal.tip')}}</span> <router-link to="act_cert" class="btn bg-green investor_edit">{{$t('user.personal.edit')}}</router-link></div>
					<div class="investor-info f-16">
						<div class="clearfix item">
							<div class="left">
								{{$t('user.personal.majors')}}：
							</div>
							<div class="right">
								{{personalInfo.major}}
							</div>
						</div>
						<div class="clearfix item">
							<div class="left">
								{{$t('user.personal.tel')}}：
							</div>
							<div class="right">
								{{personalInfo.mobile}}
							</div>
						</div>
						<div class="clearfix item">
							<div class="left">
								{{$t('user.personal.email')}}：
							</div>
							<div class="right">
								{{personalInfo.email}}
							</div>
						</div>
						<div class="clearfix item">
							<div class="left">
								{{$t('user.personal.address')}}：
							</div>
							<div class="right">
								{{personalInfo.address}}
							</div>
						</div>
						<div class="clearfix item introduce">
							<div class="left">
								{{$t('user.personal.self_evaluation')}}：
							</div>
							<div class="right" style="word-wrap:break-word;word-break:break-all;">
								{{personalInfo.resume}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	export default {
		data() {
			return {
				status: '',
				personalInfo: {}
			}
		},
		created() {
			this.$http.get(this.$root.urlPath.MJK + '/auth/userAuth').then(function(res){
	    		console.log(res)
	    		if(res.body.success){
	    			if(res.body.data){
	    				this.personalInfo = res.body.data;
	    				this.status = res.body.data.status;    				
	    			}else{
	    				this.$router.push('act_cert')	    				
	    			}	    			
	    		}
	    	},function(res){
	    		
	    	})
		}
	}
</script>

<style>
</style>