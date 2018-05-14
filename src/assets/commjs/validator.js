
export const reg = {
	number: (rule,value,callback)=>{
		if(value){
			 if(/^[0-9]*$/.test(value) == false){
	            callback(new Error("请输入正确的数字"));
	        }else{
	            callback();
	        }
		}else{
			callback();
		}
       
    },
    tel: (rule,value,callback)=>{
    	if(value){  		
    		if(/^^1[34578]\d{9}$/.test(value) == false){
    		    callback(new Error("请输入正确的手机号"));
    		}else{
    		    callback();
    		}
    	}else{
    		callback();
    	}
    },
    idCard: (rule,value,callback)=>{
    	if(value){  		
    		if(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value) == false){
    		    callback(new Error("请输入正确的身份证号"));
    		}else{
    		    callback();
    		}
    	}else{
    		callback();
    	}
    },
    email: (rule,value,callback)=>{
    	if(value){  		
    		if(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value) == false){
    		    callback(new Error("请输入正确的 邮箱"));
    		}else{
    		    callback();
    		}
    	}else{
    		callback();
    	}
    },
    pwd: (rule,value,callback)=>{
    	if(value){  		
    		if(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/.test(value) == false){
    		    callback(new Error("请输入合理的密码"));
    		}else{
    		    callback();
    		}
    	}else{
    		callback();
    	}
    },
}
