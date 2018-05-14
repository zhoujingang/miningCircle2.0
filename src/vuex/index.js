import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import compInfo from './modules/compInfo'
import userInfo from './modules/userInfo'
export default new Vuex.Store({
	modules: {
		compInfo,
		userInfo
	}
})
