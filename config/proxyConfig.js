module.exports = {
  proxyList: {
		'/apis': {
//			target:'http://memberapi.miningcircle.com:8090',
//			target: 'http://member.miningcircle.com:8090',			
//				target: 'http://memberapi.miningcircle.com:8090',			
//				target: 'http://zjl.miningcircle.com:8090',			
//			target: 'http://qmn.miningcircle.com:8080',	
//			target: 'http://jf.miningcircle.com:8090',			
			target: 'http://shw.miningcircle.com:8090',			
			changeOrigin: true,
			pathRewrite: {
				'^/apis': ''
			}
		},
		'/upload': {
			target: 'http://www.miningcircle.com',			
			changeOrigin: true,
			pathRewrite: {
				'^/upload': ''
			}
		},
		'/mc1': {
			target: 'http://www.miningcircle.com',			
			changeOrigin: true,
			pathRewrite: {
				'^/mc1': ''
			}
		}
  }
}