
const state = {
	userInfo: '',
	userId: '',
	userName: '',
	userStates: ''//判断当前进入企业中心的用户身份	
}
const mutations = {
	userInfo: function (state, data){
		state.userInfo = data
	},
	userId: function (state, data){
		state.userId = data
	},
	userName: function (state, data){
		state.userName = data
	},
	userStates: function (state, data){
		state.userStates = data
		sessionStorage.setItem("userStates", data)
	}
}
const getters = {
//	compInfo: state => state.compInfo
}
const actions = {
	
}
export default {
	state,
	mutations,
	getters,
	actions,
}
