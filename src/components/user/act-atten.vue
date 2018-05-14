<template>
	<div class="flex-1 pers-news user-atten">
		<div class="box-con bg-white">
			<div class="com-title bg-pri clearfix">
				<el-col :span="4" class="col-white" style="margin-top: 2px;">{{$t('user.atten.tit')}}</el-col>
				<el-col :span="4">
				    <el-select v-model="recordType" :placeholder="$t('user.atten.all')" @change="listFilter" class="listFilter">
					    <el-option
					      v-for="item in type"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-col>
				<el-col :span="3" class="pull-right text-center">
					<button class="all-cancle f-13 btn" @click="allCancle">{{$t('user.atten.unfollow')}}</button>
				</el-col>
				<el-col :span="2" class="pull-right text-center">
					<div class="all-check">
						<input type="checkbox" id="all" name="allcheck" :checked="isCheck" @click="allCheck" />
							<!--<input type="checkbox" id="8" v-model="allCheck" name="check" @click="allcheck">-->
						<label for="all" class="f-13">{{$t('user.atten.check_all')}}</label>
							<!--<span class="f-13"></span>-->
					</div>
				</el-col>
				
			</div>
			<div class="con1">
				<div class="news-out">
					<div class="t-header text-center f-w">
						<div class="clearfix">
							<div class="th text-left" style="width: 48%;">
								<span class="pl-20 ml-20">{{$t('user.atten.name')}}</span>
							</div>
							<div class="th" style="width:13%">
								{{$t('user.atten.type')}}
							</div>
							<div class="th" style="width: 13%;">
								{{$t('user.atten.time')}}
							</div>
							<div class="th" style="width: 13%;">
								{{$t('user.atten.detail')}}
							</div>
							<div class="th" style="width: 13%;">
								{{$t('user.atten.operate')}}
							</div>
						</div>									
					</div>
					<div class="tab-atten">
						<table class="full-w">
							<tr class="head">
								<th style="width: 48%;"></th>
								<th style="width: 13%;"></th>
								<th style="width: 13%;"></th>
								<th style="width: 13%;"></th>
								<th style="width: 13%;"></th>
							</tr>
							<tr v-for="(item,index) in list">
								<td>
									<input type="checkbox" :id="index" name="check" @click="check(index)" :checked="item.isCheck">
									
									<label :for="index"></label>
									<span>{{item.type == '510'?item.name : item.title}}</span>
								</td>
								<td>{{item.type1}}</td>
								<td>{{item.update_time}}</td>
								<td><button class="check btn" @click="lookOver(item.res_id,item.type)">{{$t('user.atten.view')}}</button></td>
								<td><button class="cancle btn" @click="cancleAtten(item.id,item.type,index)">{{$t('user.atten.unfollow')}}</button></td>
							</tr>											
						</table>			
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
						      :total="this.totalCount">
						    </el-pagination>
						 </div>
					</div>	
				</div>
							
			</div>
		</div>					
	</div>
</template>

<script>
	import Vue from 'vue';
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	import {getTime2} from "@/assets/commjs/util.js";
	export default{
		data(){
			return{
				list:[],
				numPerPage: 10,
				pageNum: 1,
		        totalCount: 0,
		        recordType: '000',
		        isCheck: false,
		        isCheckArr: [],
		        type: [{
		          value: '000',
		          label: this.$t('user.atten.all')
		        },{
		          value: '510',
		          label: this.$t('user.atten.flag_store')
		        }, {
		          value: '410',
		          label: this.$t('user.atten.goods')
		        }, {
		          value: '110',
		          label: this.$t('user.atten.selling_floor')
		        }, {
		          value: '240',
		          label: this.$t('user.atten.program_trade')
		        }, {
		          value: '610',
		          label: this.$t('user.atten.exhibition')
		        }, {
		          value: '420',
		          label: this.$t('user.atten.serving_product')
		        }],
		        value: '',
		        type2: {
		        	'000': this.$t('user.atten.all'),
		        	'510': this.$t('user.atten.flag_store'),
		        	'410': this.$t('user.atten.goods'),
		        	'110': this.$t('user.atten.selling_floor'),
		        	'240': this.$t('user.atten.program_trade'),
		        	'610': this.$t('user.atten.exhibition'),
		        	'420': this.$t('user.atten.serving_product')
		        }
			}
		},
		created() {
			this.loading = true;
			this.load(this.pageNum,this.numPerPage,this.recordType)
		},
		watch: {
			
		},
		methods: {
			load(pageNum,numPerPage,recordType){
				this.$http.get(this.$root.urlPath.MJK+'/attentioncenter/attention?pageNum='+pageNum+'&numPerPage='+numPerPage+'&recordType='+recordType).then(function(res){				
					if(res.body.success){
		      			this.isCheck =false;						
						this.loading = false;
						this.list = res.body.data.attlst;
						console.log(this.list)
						this.totalCount = res.body.data.totalCount;
						var that = this
						for (var i = 0; i < this.list.length; i++) {
							this.list[i].type1 = that.type2[this.list[i].type];
							this.list[i].isCheck = false;
							this.list[i].update_time = getTime2(this.list[i].timesUp);
						}
					}else{
						this.loading = false;
					}
				},function(){
					
				})
			},
	        handleSizeChange(val) {
	        	console.log(`每页 ${val} 条`);
	        },
	        handleCurrentChange(val) {
	        	this.pageNum = val;
				this.load(this.pageNum,this.numPerPage,this.recordType)
	        },
	    	listFilter(val) {
				this.load(this.pageNum,this.numPerPage,this.recordType)			
		    },
		    check(index){
		    	console.log(this.isCheckArr)
		      	var a = [];
		      	a = this.list;
		      	this.list = [];
		      	if(a[index].isCheck){
		      		Vue.set(a[index],"isCheck",false)
		      		this.isCheckArr[index] = false;
		      	}else{
		      		Vue.set(a[index],"isCheck",true)
		      		this.isCheckArr[index] = true;
		      	}
		      	this.list = a;
		      	Vue.set(this.list);
		      	for (var i = 0;i<this.isCheckArr.length;i++) {
		      		if(this.isCheckArr[i]!=true){
		      			this.isCheck =false;
		      			console.log("false");
		      			return;
		      		}else{
		      			this.isCheck =true;
		      			console.log("true");
		      		}
		      		console.log(i);
		      	}
		    },
		    allCheck() { //全选/全不选
		    	console.log(this.isCheck)
		      	var a = [];
		      	a = this.list;
		      	this.list = [];
		      	if(this.isCheck){
		      		this.isCheck = false;
		      		for (var i = 0;i<a.length;i++) {
		      			Vue.set(a[i],"isCheck",false)
		      			this.isCheckArr[i]=false;
		      		}
		      	}else{
		      		this.isCheck = true;
		      		for (var i = 0;i<a.length;i++) {
		      			Vue.set(a[i],"isCheck",true)
		      			this.isCheckArr[i]=true;
		      		}
		      	}
		      	this.list = a;
		      	Vue.set(this.list);
		      	console.log(this.list)
		    },
		    cancleAtten(id,type,index) {//单条取消关注
		    	const str = id;
		    	console.log(str);
		    	this.$http.get(this.$root.urlPath.MJK+ '/attentioncenter/cancelAttention?ids='+str).then(function(res){
		    		if(res.body.success){
						this.load(this.pageNum,this.numPerPage,this.recordType)		    			
		    		}
		    	})
		    },
		    allCancle() {//多条取消关注
		    	if (!this.isCheckArr.length){
		    		return false;
		    	}
		    	var data = [];
		    	this.list.forEach(function(item,index){
		    		if(item.isCheck){
		    			data.push(item.id);
		    		}
		    	});
		    	const str = data.join(',')
		    	this.$http.get(this.$root.urlPath.MJK+ '/attentioncenter/cancelAttention?ids='+str).then(function(res){
		    		if(res.body.success){
		    			this.isCheck = false;
						this.load(this.pageNum,this.numPerPage,this.recordType)					  			
		    		} else {
		    			
		    		}
		    	})
		    },
		    lookOver(id,type) {
		    	if(type == '510'){
		    		window.location.href = 'http://www.miningcircle.com/store.do?web&id='+id
		    	} else {
		    		window.location.href = 'http://www.miningcircle.com/i.do?o='+id		    		
		    	}
		    }
	    }
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>