<template>
  <div id="app">
    	<!--<login></login>-->
    <!--<Hello></Hello>-->	
    <router-link to="/"></router-link>
    
      <!--<router-link to="/about">About</router-link>-->
  	<router-view></router-view>
  	
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
  	return{}
  },
	created(){
//			const params = {}
//			this.$http.get(this.$root.urlPath.MJK+'/user/userHome').then(function(res){
//		console.log(res);		
//			},function(res){
//				
//			})
		}
}
</script>
<style type="text/css">
	.el-form-item__error {
    padding-top: 1px;
	}
</style>
