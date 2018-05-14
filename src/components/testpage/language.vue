<template>
	<div>
	    <h1>多语言例子</h1>
	    <div>切换语言</div>
	    <div>
	      <el-button @click="changLangs('zh-cn')">中文</el-button>
	    </div>
	    <div>
	      <el-button type="primary" @click="changLangs('en')">english</el-button>
	    </div>
	    <div>{{ $t('name') }}</div>
	    <transition name="mybox">
	        <div class="box"  v-show="boxshow"></div>
	    </transition>
	    <button @click="togglebox">按钮</button>
	    <div class="test_box" contenteditable="true" ref="text"><br />{{text}}</div> 
	    <input type="" name="" id="" value="" v-model="text" />
  	</div>
</template>
<script>
	import bus from '../../bus'
	export default {
		data() {
			return{
				boxshow:false,
				text: '789'
			}
		},
		created() {
			
		},
		mounted() {
			console.log(this.$refs.text.innerText)
			console.log(this.$t('name'))
		},
		methods: {
			changLangs: function(langType) {
				bus.$emit('chang-langs', langType)
			},
			togglebox:function(){
                this.boxshow = !this.boxshow;
            }
		}
	}
</script>

<style>
    .box{
        height:500px;
        background-color:black;  
         overflow: hidden;                       
    }
    .mybox-leave-active,.mybox-enter-active{
        transition:  all 1s ease; 
    }
    .mybox-leave-active,.mybox-enter{
        height:0px !important;
    }
    .mybox-leave,.mybox-enter-active{
        height: 500px;
    }
    .test_box {
		    width: 400px; 
		    min-height: 120px; 
		    /*max-height: 300px;*/
		    _height: 120px; 
		    margin-left: auto; 
		    margin-right: auto; 
		    padding: 3px; 
		    outline: 0; 
		    border: 1px solid #a0b3d6; 
		    font-size: 12px; 
		    word-wrap: break-word;
		    overflow-x: hidden;
		    overflow-y: hidden;
		    /*_overflow-y: visible;*/
		}
</style>