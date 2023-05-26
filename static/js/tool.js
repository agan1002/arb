
const scanHumanFace = () => {
	return new Promise((resolve, reject) => {
		if (uniappUserAgent.indexOf('tfsmy') > -1) {
			eshimin.invoke('facialIdentification', {
			  type: 'self'
			}, function (response) {
				if(response.errorCode == 0){
					resolve({
				  "result": "true",
				  "msg": "成功"
				});
				}else{
					showTost({
						msg: 'S:' +  response.errorMessage,
						icon: 'error'
					});
				}
			}); 
		}else if(uniappUserAgent.indexOf('tfryb') > -1) {
			lightAppJssdk.user.scanHumanFace({
				success: function(data) {
					// var data = {result:true}
					resolve(data);
				},
				fail: function(data) {
					showTost({
						msg: 'R:' + data,
						icon: 'error'
					});
					reject(data);
				}
			});
		}
	})
};

const asyncLoadJs = (url) => {
	return new Promise((resolve, reject) => {
		let script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		document.body.appendChild(script);
		script.onload = () => {
			resolve()
		};
		script.onerror = reject
	})
};
const showTost = (option) => {
	let {
		msg,
		icon
	} = {
		...option
	}
	uni.showToast({
		title: msg || '认证失败',
		icon: icon || 'none',
		mask: true
	})
};
const getCurrentTime = () => {
	var d = new Date(),
		str = '';
	str += d.getFullYear() + '-';
	let m = d.getMonth() + 1;
	str += (m > 9 ? m : ('0' + m)) + '-';
	str += d.getDate() + ' ';
	str += d.getHours() + ':';
	str += d.getMinutes() + ':';
	str += d.getSeconds();
	return str;
};


const appTokenFun = (option) => {
	return new Promise((resolve, reject) => {
		uni.removeStorageSync('appToken');
		const uniappUserAgent = window.navigator.userAgent.toLowerCase();
		if (uniappUserAgent.indexOf('tfsmy') > -1) {
			console.log('市民云');
			uni.setStorageSync('appType', 'TFSMY');
			uni.setStorageSync('appToken', JSON.stringify(uni.getStorageSync('smyUserInfo')));
			resolve();
		} else if(uniappUserAgent.indexOf('tfryb') > -1) {
			
			console.log('蓉易办')
			uni.setStorageSync('appType', 'RYB');
			lightAppJssdk.user.getUserInfo({
		 	success: function(data) {
		 		if (data == '未登录') {
		 			alert("当前未登录,无用户信息");
		 		} else {
		 			resolve(data);
		 			uni.setStorageSync('appToken', data);
		 		}
		 	},
		 	fail: function(data) {
		 		alert(data);
		 	}
		 });
		}
	})
};
const getPersonOrEnterpriseInfo = (self, option) => {
	return new Promise((resolve, reject) => {
		let {qrCodeFlowNum,socialCreditCode} = {
			...option
		};
    let appType = uni.getStorageSync('appType');
    let {jwtToken,username} = {...JSON.parse(uni.getStorageSync('appToken'))};
		let url = '';
		
		let data = {
			qrCodeFlowNum,
			jwtToken,
			username,
			appType
		};
		let authLevel = socialCreditCode ? 'L3' : 'L4';
		switch (authLevel) {
			case "L3":
				url = '/paperless/H5Interface/enterpriseInfo';
				break;
			case "L4":
				url = '/paperless/H5Interface/personInfo';
				break;
			case "L5":
				url = '';
				break;
		}
		self.req.getway({
			url,
			data
		}).then(res => {
			resolve(res);
		})
	})
};
const getAuthProtocol = (self, option) => {
	return new Promise((resolve, reject) => {
		let {
			personName,
			certificateNum,
			phoneNumber,
			socialCreditCode,
			enterpriseName,
			legalPersonName,
			legalPersonCertificateType,
			legalPersonCertificateNum,
			legalPersonPhoneNumber,
			authLevel
		} = {
			...option
		};
		// let authLevel = socialCreditCode?'L3':'L4';
		let url = '',
			dataParam = {};
		let baseUrl = '/paperless/H5Interface/';
		switch (authLevel) {
			case "L3":
				url = baseUrl + 'getEnterpriseAuthProtocol';
				dataParam = {
					socialCreditCode,
					enterpriseName,
					legalPersonName,
					legalPersonCertificateType,
					legalPersonCertificateNum,
					legalPersonPhoneNumber
				};
				break;
			case "L4":
				url = baseUrl + 'getPersonAuthProtocol';
				dataParam = {
					personName,
					idCardNo: certificateNum,
					phoneNumber
				};
				break;
			case "contractSign":
				url = baseUrl + 'getPersonSignAuthProtocol';
				dataParam = {
					personName,
					idCardNo: certificateNum,
					phoneNumber
				};
				break;
			case "L5":
				url = '';
				break;
		}
		self.req.getway({
			url: url,
			data: dataParam
		}).then(res => {
			resolve(res);
		})
	})
};
const pullScanResult = (self, option) => {
	return new Promise((resolve, reject) => {
		let {
			qrCodeFlowNum,
			certificateNum,
			authLevel,
			token,
			socialCreditCode
		} = {
			...option
		};
		let authResult = 1;
		let authTime = getCurrentTime();
		let baseUrl = '/paperless/H5Interface/';
		self.req.getway({
			url: socialCreditCode ? baseUrl + 'receiveEnterpriseAuthResult' : baseUrl +
				'receivePersonAuthResult',
			data: socialCreditCode ? {
				qrCodeFlowNum,
				socialCreditCode,
				authLevel,
				token,
				authResult,
				authTime
			} : {
				qrCodeFlowNum,
				idCardNo: certificateNum,
				authLevel,
				token,
				authResult,
				authTime
			}
		}).then(res => {
			resolve(res);
		});
	})
};

function getBase64Image(imgSrc) {
	var img = document.createElement('img');
	img.src = imgSrc; //此处自己替换本地图片的地址

	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);

	var dataURL = canvas.toDataURL("image/png");

	return dataURL.replace("data:image/png;base64,", "");;
}
export {
	// getCertificate,
	scanHumanFace,
	asyncLoadJs,
	getCurrentTime,
	// getToken,
	getBase64Image,
	appTokenFun,
	getPersonOrEnterpriseInfo,
	getAuthProtocol,
	pullScanResult,
	showTost
}
