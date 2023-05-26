		
let domain = window.location.host;
// let currentEnv = domain.indexOf('funi')>-1?'cdszjjwzhzt_test':'cdszjjwzhzt';// 打包环境
let currentEnv = (domain.indexOf('ryb')>-1||domain.indexOf('cdzjryb')>-1)?'cdszjjwzhzt':'cdszjjwzhzt_test';// 打包环境
// let currentEnv = 'cdszjjwzhzt_test';//本地
const getwayUrl = (option)=>{
	return new Promise((resolve, reject) => {
		let appType = uni.getStorageSync('appType');//https://paperless.funi365.com
	console.log(currentEnv)
		let baseUrl = currentEnv === 'cdszjjwzhzt_test'?(appType==='RYB'?"https://paperless.funi365.com/rybgateway/api/jmas-api-gateway-server/":'https://paperless.funi365.com'):(appType==='RYB'?"https://h5.tfryb.com/api/jmas-api-gateway-server/":'https://zw.cdzjryb.com/esign');
		uni.request({
			url: baseUrl + option.url,
			data: option.data,
			method: option.method || 'post',
			header: {
				'Content-Type': appType==='RYB'?'application/x-www-form-urlencoded':'application/json'
			},
			success: (res) => {
				/* if (res.statusCode === 403 || res.statusCode === 401) {
				    uni.reLaunch({// 错误处理，返回登录页
				        url: '/pages/login/login'
				    })
				}*/
				if(res.statusCode == 200){
					resolve(res.data);
				}else{
					uni.hideLoading();
					uni.showToast({
							title: res.statusCode+'-P:请求接口失败'
					})
				}
			},
			fail: ((err) => {
				uni.hideLoading();
				uni.showToast({
						title: 'P:'+err.errMsg,
						icon:'error',
						mask:true
				})
				reject(err)
			})
		})
	})
};

export default {
	whichEnv:currentEnv,
	getway (option) {
		let self = this;
		return new Promise((resolve, reject) => {
			let appType = uni.getStorageSync('appType');
				if(appType === 'RYB'){
					let rybObj = JSON.parse(uni.getStorageSync('appToken'));
								// username&@&jwttoken&@&socialCreditCode
								let rybJwtTokenStr = rybObj.username+'&@&'+rybObj.jwtToken
									rybJwtTokenStr += rybObj.socialCreditCode?('&@&'+rybObj.socialCreditCode):'';
								let rybJwtToken = btoa(encodeURI(rybJwtTokenStr));
								let timestamp = new Date().valueOf();
								let dataParam = {
									"app_id":"cdszjjclfjy",
									"interface_id":self.whichEnv,
									timestamp,
									"biz_content":JSON.stringify({"bizCode":option.url,"bizContent":option.data||{},"reqType":"json","rybJwtToken":rybJwtToken}),
									"version":"1.0",
									"header":"",
									"charset":"utf-8",
									"origin":"APP"
									};
									uni.showLoading({
										title: '加载中',
										mask:true
									})
								getwayUrl({url:'createsign',data:dataParam}).then(signRes=>{
									if(signRes.success){
										getwayUrl({url:'gateway.do',data:{...dataParam,"sign":signRes.data.sign}}).then(res=>{
											let data = JSON.parse(res.data);
											resolve(data);
											uni.hideLoading();
											if(data.code!==200){
												uni.showModal({
													title: '消息提示',
													showCancel:false,
													content: 'P:'+data.msg||'',
													success: function (res) {
														if (res.confirm) {
															console.log('用户点击确定');
														} else if (res.cancel) {
															console.log('用户点击取消');
														}
													}
												});
												// uni.showToast({
												// 		title: 'P:'+data.msg||'',
												// 		icon:'error',
												// 		mask:true
												// })
											}
										})
									}else{
										uni.hideLoading();
										uni.showToast({
												title: 'P:cs请求sign失败',
												icon:'error',
												mask:true
										})
									}
								})
				}else{
					uni.showLoading({
						title: '加载中',
						mask:true
					})
					let params = {url:option.url,data:JSON.stringify(option.data)}
					getwayUrl(option).then(res=>{
						resolve(res);
						uni.hideLoading();
						if(res.code!==200){
							uni.showModal({
								title: '消息提示',
								showCancel:false,
								content: 'P:'+data.msg||'',
								success: function (res) {
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					})
				}
		})
	}
}