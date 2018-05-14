import Vue from 'vue'
import Router from 'vue-router'
import {getCookie} from '@/assets/commjs/util.js'




import Main from '@/components/main.vue'
import Reg from '@/components/reg/reg.vue'
import Login from '@/components/reg/login.vue'
import Forget from '@/components/reg/forget.vue'
import email_set_pwd from '@/components/reg/email_set_pwd.vue'
//页面测试
import language from '@/components/testpage/language.vue'
//个人中心和企业中心公共页面
import addBank from '@/components/user/add-bankcard.vue'//添加银行卡
import comp_Cert from '@/components/user/comp-cert.vue'
//=====个人中心页面
import User from '@/components/user/user.vue'
import user_Index from '@/components/user/user-index.vue'
import act_Info from '@/components/user/act-info.vue'
import act_Security from '@/components/user/act-security.vue'
import act_Set_phone from '@/components/user/act-set-phone.vue'
import act_Set_email from '@/components/user/act-set-email.vue'

import act_Funds from '@/components/user/act-funds.vue'
import act_Recharge from '@/components/user/act-recharge.vue'//充值
import act_Withdraw from '@/components/user/act-withdraw.vue'//提现
import act_Coin from '@/components/user/act-coin.vue'
import act_Gift from '@/components/user/act-gift.vue'
import act_Coupon from '@/components/user/act-coupon.vue'
import order_Offer from '@/components/user/order-offer.vue'
import order_Buy from '@/components/user/order-buy.vue'
import act_Cert from '@/components/user/act-cert.vue'
import act_Data from '@/components/user/act-data.vue'
import act_Atten from '@/components/user/act-atten.vue'
import act_News from '@/components/user/act-news.vue'
import act_Set_pwd from '@/components/user/act-set-pwd.vue'
import act_Set_fundspwd from '@/components/user/act-set-fundspwd.vue'

//=====企业中心页面
import Comp from '@/components/user/comp.vue'
import comp_Index from '@/components/user/comp-index.vue'
import comp_info from '@/components/user/comp-info.vue'
import comp_Funds from '@/components/user/comp-funds.vue'
import comp_Recharge from '@/components/user/comp-recharge.vue'//充值
import comp_Withdraw from '@/components/user/comp-withdraw.vue'//提现
import comp_Set_fundspwd from '@/components/user/comp-set-fundspwd.vue'
import comp_Coin from '@/components/user/comp-coin.vue'
import comp_Gift from '@/components/user/comp-gift.vue'
import comp_Coupon from '@/components/user/comp-coupon.vue'
import comp_Offer from '@/components/user/comp-offer.vue'
import comp_Buy from '@/components/user/comp-buy.vue'
import comp_Data from '@/components/user/comp-data.vue'
import comp_Child_act from '@/components/user/comp-child-act.vue'
import investor_Cert from '@/components/user/investor-cert.vue'
import comp_Investor from '@/components/user/comp-investor.vue'
import comp_News from '@/components/user/comp-news.vue'
import comp_Buy_Details from '@/components/user/order-buy-details.vue'

Vue.use(Router)

const router=new Router({
	mode: 'history',
  routes: [
	{
	  path: '/test',
	  component: language
	},
    {
      path: '/reg',
      component: Reg
    },
    {
      path: '/login',
      component: Login
    },
    { path: '/forget', component: Forget },
    { path: '/send_email', component: email_set_pwd },
    {
    	path: '/user',
    	name: 'user',
    	component: User,
    	redirect: '/user/user_index',
    	children:[
            { path: '/user/user_index', component: user_Index, meta: {requireAuth :true}},
    		{ path: '/user/comp_cert', component: comp_Cert},           
            { path: '/user/act_info', component: act_Info, meta: {requireAuth :true}},
            { path: '/user/act_security', component: act_Security, meta: {requireAuth :true}},
            { path: '/user/act_funds', component: act_Funds, meta: {requireAuth :true}},
            { path: '/user/act_funds/recharge', component: act_Recharge, meta: {requireAuth :true}},  //充值
            { path: '/user/act_funds/withdraw', component: act_Withdraw, meta: {requireAuth :true}},  //提现
            { path: '/user/act_funds/add_bank', component: addBank, meta: {requireAuth :true}},  //添加银行卡
            
            { path: '/user/act_coin', component: act_Coin, meta: {requireAuth :true}},
            { path: '/user/act_gift', component: act_Gift, meta: {requireAuth :true}},
            { path: '/user/act_coupon', component: act_Coupon, meta: {requireAuth :true}},
            { path: '/user/order_offer', component: order_Offer, meta: {requireAuth :true}},
            { path: '/user/order_buy', component: order_Buy, meta: {requireAuth :true}},
            { path: '/user/act_cert', component: act_Cert, meta: {requireAuth :true}},
            { path: '/user/act_data', component: act_Data, meta: {requireAuth :true}},           
            { path: '/user/act_atten', component: act_Atten, meta: {requireAuth :true}},
            { path: '/user/act_news', component: act_News, meta: {requireAuth :true}},
            { path: '/user/act_security/act_set_phone', component: act_Set_phone, meta: {requireAuth :true}},
    		{ path: '/user/act_security/act_set_email', component: act_Set_email, meta: {requireAuth :true}},
    		{ path: '/user/act_security/act_set_pwd', component: act_Set_pwd, meta: {requireAuth :true}},
    		{ path: '/user/act_security/act_set_fundspwd', component: act_Set_fundspwd, meta: {requireAuth :true}},          
            { path: '/user/order_buy/details', component: comp_Buy_Details, meta: {requireAuth :true}}
        ],
    	meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        }
    },
    {
    	path: '/comp',
    	component: Comp,
    	redirect: '/comp/comp_index',
    	children: [
    		{ path: '/comp/comp_index', component: comp_Index},
    		{ path: '/comp/comp_info', component: comp_info},  		
    		{ path: '/comp/comp_funds', component: comp_Funds},
    		{ path: '/comp/comp_set_fundspwd', component: comp_Set_fundspwd},
    		
    		{ path: '/comp/comp_funds/recharge', component: comp_Recharge},  //充值
            { path: '/comp/comp_funds/withdraw', component: comp_Withdraw},  //充值
            { path: '/comp/comp_funds/add_bank', component: addBank},  //添加银行卡
            
    		{ path: '/comp/comp_coin', component: comp_Coin},
    		{ path: '/comp/comp_gift', component: comp_Gift},
    		{ path: '/comp/comp_coupon', component: comp_Coupon},
    		{ path: '/comp/comp_offer', component: comp_Offer},
    		{ path: '/comp/comp_buy', component: comp_Buy},
    		{ path: '/comp/comp_cert', component: comp_Cert},
    		{ path: '/comp/comp_data', component: comp_Data},
    		
    		{ path: '/comp/investor_cert', component: investor_Cert},
    		{ path: '/comp/comp_investor', component: comp_Investor},   		
    		{ path: '/comp/child_act', component: comp_Child_act},
    		{ path: '/comp/comp_news', component: comp_News},
    		{ path: '/comp/order_buy/details', component: comp_Buy_Details, meta: {requireAuth :true}}
    	]  	
    }
  ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (getCookie('MC_UID')) {  //获取当前的token是否存在
//	if(true){
//			console.log(getCookie('MC_UID'))
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})

export default router