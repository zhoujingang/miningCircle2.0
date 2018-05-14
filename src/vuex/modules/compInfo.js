const state = {
	compInfo: {},
	rule: {},//权限
	companyId: '',//企业ID
}
const mutations = {
	compInfo: function (state, data){
		state.compInfo = data
	},
	rule: function (state, data){
		state.rule = data
	},
	companyId: function (state, data){
		state.companyId = data
	}
}
const getters = {
//	compInfo: state => state.compInfo
}
const actions = {
//	getCompInfo: function({commit}){
//		var info = {
//			
//		}
//		commmit('getCompInfo',info)
//	}
}
export default {
	state,
	mutations,
	getters,
	actions,
}
