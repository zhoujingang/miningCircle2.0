<template>
	<div class="flex-1 pers-news">
		<div class="box-con bg-white">
			<p class="com-title bg-pri">{{$t('user.message.tit')}}</p>
			<div class="con1">
				<div class="news-out">
					<div class="clearfix t-header">
						<div class="th text-center" style="width: 13.5%;">
							{{$t('user.message.status')}}
						</div>
						<div class="th text-center" style="width: 5%;">
						</div>
						<div class="th" style="width:63%">
							{{$t('user.message.title')}}
						</div>
						<div class="th" style="width: 18.5%;">
							{{$t('user.message.time')}}
						</div>
					</div>
					<div v-loading="loading">
						<div v-for="(item,index) in list" class="news-list clearfix cur-p" @click="open_model(item.title,item.content,item.createdTime,item.id)">
							<div class="td" style="width: 16.5%;">
								<input type="checkbox" :id="index" name="check" v-model="checkboxModel" :value="item.id" @click.stop="blank" />
								<label :for="index" @click.stop="blank"></label>
								<span class="status f-13 ml-20" :class="item.status == $t('user.message.unread')?'unread':''">{{item.status}}</span>
							</div>
							<div class="td" style="width: 62%;">{{item.title}}</div>
							<div class="td" style="width: 21.5%;">{{item.createdTime}}</div>
						</div>
					</div>
					<div class="news-data-none" v-show="list.length <= 0">
						<div class="text-center con">
							<img src="/static/img/comm/data-none.png" alt="" />
							<p class="mt-10 ml-10">{{$t('comm.no_data')}}</p>
						</div>
					</div>
				</div>
				<div class="clearfix pt-20 pb-20 pl-20">
					<div class="all-check">
						<input type="checkbox" id="all" name="check" :checked="allCheck" @click="allcheck" />
						<label for="all">{{$t('user.message.check_all')}}</label>
						<!--<span class="f-13" @click="allcheck">全选</span>-->
					</div>
					<div class="pull-left">
						<button class="del btn" @click="delOrread">{{$t('user.message.delete')}}</button>
					</div>
					<div class="pull-left">
						<button class="read btn" @click="Rread">{{$t('user.message.marked_read')}}</button>
					</div>
					<div class="pull-right">
						<div class="block">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="numPerPage" layout="prev, pager, next, jumper" :total="totalCount">
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
	import { getTime2 } from "@/assets/commjs/util.js";
	export default {
		data() {
			return {
				totalCount: 0,
				pageNum: 1,
				numPerPage: 10,
				list: [],
				readStatus: {
					"0": this.$t('user.message.unread'),
					"1": this.$t('user.message.read')
				},
				checkboxModel: [],
				allCheck: false,
				loading: false,
			}
		},
		created() {
			this.loading = true;
			this.load(this.pageNum, this.numPerPage);
		},
		methods: {
			load(pageNum, numPerPage) { //加载数据
				this.$http.get(this.$root.urlPath.MJK + '/note/noteList?cat=0&pageNum=' + pageNum + '&numPerPage=' + numPerPage).then(function(res) {
					//				var a = res.body.substring(1,res.body.length-1);
					console.log(res);
					if(res.body.success) {
						this.loading = false;
						if(res.body.data.noteVOS) {
							this.list = res.body.data.noteVOS;
							this.totalCount = res.body.data.totalCount;
							for(var i = 0; i < this.list.length; i++) {
								this.list[i].createdTime = getTime2(this.list[i].createdTime + "");
								this.list[i].status = this.readStatus[(this.list[i].status + "")];
//								this.list[i].ischeck = false;
							}
							this.loading = false;
						}
					} else {
						this.loading = false;
					}
				}, function(res) {

				})
			},
			delOrread() { //删除
				var id = this.checkboxModel.join(',');
				if(!id) {
					return false;
				}
				this.loading = true;
				this.$http.get(this.$root.urlPath.MJK + '/note/noteOperate?function=noteDelete&status=0&ids=' + id).then(function(res) {
					if(res.body.success) {
						this.allCheck = false;
						this.checkboxModel = [];
						this.load(this.pageNum, this.numPerPage);
					}
				}, function() {

				})
			},
			Rread() { //标记已读
				var id = this.checkboxModel.join(',');
				if(!id) {
					return false;
				}
				this.loading = true;
				this.$http.get(this.$root.urlPath.MJK + '/note/noteOperate?function=noteClick&status=0&ids=' + id).then(function(res) {
					if(res.body.success) {
						this.allCheck = false;
						this.load(this.pageNum, this.numPerPage);
					}
				}, function() {

				})
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				this.loading = true;
				this.pageNum = val;
				this.allCheck = false;
				this.load(this.pageNum, this.numPerPage);
			},
			allcheck() { //全选
				var _this = this;
				if(_this.allCheck) {
					_this.checkboxModel = [];
				} else {
					this.checkboxModel = this.list.map((item, index) => {
						return item.id
					})
				}
			},
			open_model(tit, content, time, id) { //详细详情

				const h = this.$createElement;
				this.$msgbox({
					title: tit, //标题
					customClass: 'new-model', //自定义类名
					message: h('div', {
						class: ''
					}, [
						h('div', {
							class: 'news-content'
						}, content),
						h('p', {
							class: 'news-from text-right col-pri pt-10'
						}, "矿业圈"),
						h('p', {
							class: 'news-time text-right pt-5'
						}, time),

					]),
					//		          	showCancelButton: true,
					confirmButtonText: '确定',
					//		          	cancelButtonText: '取消',
					//		          	cancelButtonClass: 'pull-left',//取消按钮自定义类名
					beforeClose: (action, instance, done) => {
						if(action === 'confirm') {
							//		            		alert(1);
							this.$http.get(this.$root.urlPath.MJK + '/note/noteOperate?function=noteClick&status=0&ids=' + id).then(function(res) {
								if(res.body.success) {
									this.load(this.pageNum, this.numPerPage);
								}
							}, function() {});
							done()
						} else {
							this.$http.get(this.$root.urlPath.MJK + '/note/noteOperate?function=noteClick&status=0&ids=' + id).then(function(res) {
								if(res.body.success) {
									this.load(this.pageNum, this.numPerPage);
								}
							}, function() {});
							done()
						}
					}
				}).then(action => {

				}, function() {

				});
			},
			blank() {
				return false;
			},

		},
		watch: { //深度 watcher
			'checkboxModel': {
				handler: function(val, oldVal) {
					console.log(this.checkboxModel)
					if(this.checkboxModel.length === this.list.length) {
						this.allCheck = true;
					} else {
						this.allCheck = false;
					}
				},
				deep: true
			}
		}
	}
</script>

<style>
	@import '../../../static/css/user/user.css';
</style>