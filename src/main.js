// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import 'babel-polyfill'
import Vue from 'vue'
//引入Element组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use (ElementUI)
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import bus from './bus'

//引入vue-resource插件
import VueResource from 'vue-resource';
Vue.use(VueResource);

//引入vuex插件
import store from './vuex/index.js'

//多语言切换
import VueI18n from 'vue-i18n'
import langs from './vueI18/local'
Vue.use(VueI18n)
var navLang = ''
if (navigator.languages) {
	navLang = navigator.languages[0] // 检测系统语言
} else {
	navLang = navigator.userLanguage
}
var localLang = ''

if (navLang === 'zh-CN' || navLang === 'zh' || navLang == undefined) {
  localLang = 'zh-cn'
} else {
  localLang = 'en'
}

const _lang = window.localStorage.getItem('language') || localLang || 'zh-cn'
Vue.config.lang = _lang
// 饿了吗语言包和项目自身语言包合并
const mergeZH = Object.assign(zhLocale, langs['chinese']['zh-CN'])
const mergeEN = Object.assign(enLocale, langs['english']['en-US'])
Vue.locale('zh-cn', mergeZH)
Vue.locale('en', mergeEN)
// 监控语言切换
bus.$on('chang-langs', function (type) {
  Vue.config.lang = type
  window.localStorage.setItem('language', type)
})

import App from './App'
import VueRouter from 'vue-router'
import router from './router/index.js'
import rootPath from './assets/config/api.js'//接口路径


import header from './components/comm/header.vue'
import footer from './components/comm/footer.vue'
import {getCookie} from '@/assets/commjs/util.js';
Vue.component('mc-header',header)
Vue.component('mc-footer',footer)


Vue.use(VueRouter)

//设置请求头
//Vue.http.options.xhr = { withCredentials: true }
Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
}
Vue.http.interceptors.push(function(request, next) {//拦截器
// 跨域携带cookie
	request.credentials = true;
	request.headers.set('MC_SMS', getCookie('MC_SMS')); //setting request.headers
	request.headers.set('MC_UID', getCookie('MC_UID')); //setting request.headers
    next((response) => {
      return response
   })
 
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
	store,//使用store
  	template: '<App/>',
  	components: { App },
  	data: {
    	urlPath : rootPath.pathUrl()//通过api.js 控制 开发 和线上环境
  	}
})
