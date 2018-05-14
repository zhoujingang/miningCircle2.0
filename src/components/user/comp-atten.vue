<template>
	<div class="flex-1 pers-news user-atten">
		<div class="box-con bg-white">
			<div class="com-title bg-pri clearfix">
				<el-col :span="4" class="col-white" style="margin-top: 3px;">关注类型</el-col>
				<el-col :span="4">
				    <el-select v-model="value" placeholder="全部">
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					</el-select>
				</el-col>
				<el-col :span="3" class="pull-right text-center">
					<button class="all-cancle f-13 btn">取消关注</button>
				</el-col>
				<el-col :span="2" class="pull-right text-center">
					<div class="all-check">
							<input type="checkbox" id="8" name="check" />
							<label for="8" class=""></label>
							<span class="f-13">全选</span>
					</div>
				</el-col>
				
			</div>
			<div class="con1">
				<div class="news-out">
					<div class="t-header text-center f-w">
						<div class="clearfix">
							<div class="th text-left" style="width: 48%;">
								<span class="pl-20 ml-20">名称</span>
							</div>
							<div class="th" style="width:13%">
								关注类型
							</div>
							<div class="th" style="width: 13%;">
								关注时间
							</div>
							<div class="th" style="width: 13%;">
								详情
							</div>
							<div class="th" style="width: 13%;">
								关注操作
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
							<tr>
								<td>
									<input type="checkbox" id="1" name="check" />
									<label for="1"></label>
									<span>12132订购了您的商品</span>
								</td>
								<td>商品</td>
								<td>2017-06-13</td>
								<td><button class="check btn">查看</button></td>
								<td><button class="cancle btn">取消关注</button></td>
							</tr>
							<tr>
								<td>
									<input type="checkbox" id="1" name="check" />
									<label for="1"></label>
									<span>12132订购了您的商品</span>
								</td>
								<td>商品</td>
								<td>2017-06-13</td>
								<td><button class="check btn">查看</button></td>
								<td><button class="cancle btn">取消关注</button></td>
							</tr>
							<tr>
								<td>
									<input type="checkbox" id="1" name="check" />
									<label for="1"></label>
									<span>12132订购了您的商品</span>
								</td>
								<td>商品</td>
								<td>2017-06-13</td>
								<td><button class="check btn">查看</button></td>
								<td><button class="cancle btn">取消关注</button></td>
							</tr>
							<tr>
								<td>
									<input type="checkbox" id="1" name="check" />
									<label for="1"></label>
									<span>12132订购了您的商品</span>
								</td>
								<td>商品</td>
								<td>2017-06-13</td>
								<td><button class="check btn">查看</button></td>
								<td><button class="cancle btn">取消关注</button></td>
							</tr>
							<tr>
								<td>
									<input type="checkbox" id="1" name="check" />
									<label for="1"></label>
									<span>12132订购了您的商品</span>
								</td>
								<td>商品</td>
								<td>2017-06-13</td>
								<td><button class="check btn">查看</button></td>
								<td><button class="cancle btn">取消关注</button></td>
							</tr>
							<tr>
								<td>
									<input type="checkbox" id="1" name="check" />
									<label for="1"></label>
									<span>12132订购了您的商品</span>
								</td>
								<td>商品</td>
								<td>2017-06-13</td>
								<td><button class="check btn">查看</button></td>
								<td><button class="cancle btn">取消关注</button></td>
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
						      :current-page.sync="currentPage1"
						      :page-size="100"
						      layout="prev, pager, next, jumper"
						      :total="1000">
						    </el-pagination>
						 </div>
					</div>	
				</div>
							
			</div>
		</div>						
	</div>
</template>

<script>
//	import Vue from 'vue';
//	import VueResource from 'vue-resource';
//	Vue.use(VueResource);
	import {getTime2} from "@/assets/commjs/util.js";
	
	export default{
		data(){
			return{
				attenList: [],
				currentPage1: 1,
		        currentPage2: 5,
		        currentPage3: 5,
		        currentPage4: 4,
		        options: [{
		          value: '选项1',
		          label: '黄金糕'
		        }, {
		          value: '选项2',
		          label: '双皮奶'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
		        value: ''
			}
		},
		created() {
			this.Ehttp.get(this.$root.urlPath.MJK+'/')
		},
		methods: {
	      handleSizeChange(val) {
	        console.log(`每页 ${val} 条`);
	      },
	      handleCurrentChange(val) {
	        console.log(`当前页: ${val}`);
	      }
	    }
	}
</script>

<style>
	@import '../../../static/css/user/user.css'; 
</style>