<template>
	<view class="">
		<page-head :steps="steps" :active="1"></page-head>
		<scroll-view scroll-y="true" >
			<view class="contract">
				<page-title :imgTitle="'person'" :textTitle="'身份识别'"></page-title>
				<will-confirm>
					<template v-slot:elecContractNo>
						<view class="contract-info-will">{{discripInfo.agreement}}</view>
					</template>
				</will-confirm>
				<full-light></full-light>
				
				<view class="page-bottom-btn">
					<button v-if="discripInfo.agreement.length===0" size="default" type="default" disabled>去认证</button>
					<button v-else class="page-bottom-btn-ok" @click="openPopup('popupSubmitForm')">去认证</button>
				</view>
				<uni-popup ref="popupSubmitForm" type="dialog">
					<view class="action-tip-dialog">
						<view class="action-tip-dialog-title">提示</view>
						<view class="action-tip-dialog-text">您正在进行二手房买卖，请提高警惕</view>
						<button type="primary" @click="confirmPopup('popupSubmitForm')" class="action-tip-dialog-btn" size="mini" >我知道了</button>
					</view>
				</uni-popup>
				<uni-popup ref="signSampleDialog" type="dialog">
					<view class="action-tip-dialog">
						<view class="action-tip-dialog-title">提示</view>
						<view class="action-tip-dialog-text">{{signSampleText}}</view>
						<button type="primary" @click="confirmSign('signSampleDialog')" class="action-tip-dialog-btn" size="mini" >我知道了</button>
					</view>
				</uni-popup>
				<uni-popup ref="resetSampleDialog" type="dialog">
					<view class="action-tip-dialog">
						<view class="action-tip-dialog-title">提示</view>
						<view class="action-tip-dialog-text">笔迹留样鉴定失败，请重试</view>
						<button type="primary" @click="confirmResetSign('resetSampleDialog')" class="action-tip-dialog-btn" size="mini" >我知道了</button>
					</view>
				</uni-popup>
				<view>
					aaaaaa
				</view>
		</view>
		</scroll-view>
	</view>
	
</template>

<script>
	import {getAuthProtocol,asyncLoadJs,scanHumanFace,getCurrentTime,pullScanResult,showTost} from '../../static/js/tool.js'
	import PageHead from '@/components/page-head.vue';
	import PageTitle from '@/components/page-title.vue';
	import WillConfirm from '@/components/will-confirm.vue'
	import FullLight from '@/components/full-light.vue';
	
	export default {
		data() {
			return {
				steps:[{title: '确认信息'}, {title: '身份认证'}, {title: '完成'}],
				pageOption:{},
				discripInfo:{
					agreement:''
				},
				AosInstance:null,
				aoToken:'',
				aoCount:0,
				isSignSample:false,
				signSampleText:'',
				aosObj:{},
				signErrorCount:0
			};
		},
		onLoad(option){
			this.aosObj = this.req.whichEnv === 'cdszjjwzhzt'?{
				aosJsUrl:'https://open.isigning.cn/isigning-open-basic-adapter/iSign-basic-adapter.js',
				aosTokenUrl:'https://paas.isigning.cn/gateway/paas-auth/oauth/token',
				aosUserInfo:'Basic RjRrZ3BSTTE2NDAxNTE0MjMxNTU6VFlaem1STDE2NDAxNTE0MjMxNjM=',
				aosFetchUserInfoUrl:'https://zw.cdzjryb.com/esign/paperless/AOSInterface/personInfo'
				}:{
					aosJsUrl:'https://cdflstandard.isigning.cn/isigning-open-basic-adapter/iSign-basic-adapter.js',
					// aosTokenUrl:'https://paasstandard.isigning.cn/gateway/paas-auth/oauth/token',
					aosTokenUrl:'https://paasext.isigning.cn/gateway/paas-auth/oauth/token',
					aosUserInfo:'Basic WDZraGh4czE2MzY0MjczNTA5NDQ6ekwwbkZRcDE2MzY0MjczNTA5NDQ=',
					aosFetchUserInfoUrl:'http://125.71.215.213:12730/paperless/AOSInterface/personInfo'
				};
				if(this.aosObj.aosJsUrl.length>0){
					this.getAos();
				}
			this.pageOption = {...option};
			this.getDescription();
		},
		onUnload(){
			if(this.AosInstance){
				this.AosInstance.closeSign();
			}
		},
		methods:{
			
			openPopup(name){
				this.$refs[name].open('center');
			},
			closePopup(name){
				 this.$refs[name].close();
			},
			confirmPopup(name){
				this.$refs[name].close();
				this.toIdentity()
			},
			confirmSign(name){
				this.$refs[name].close();
				this.sign()
			},
			confirmResetSign(name){
				this.AosInstance.resetBatchSample(this.pageOption.certificateNum);
				this.confirmSign(name)
			},
			openSignPopup(name){
				this.signSampleText = this.isSignSample?'您正在进行电子合同签订，请认真书写':'您正在进行笔迹留样采集，请认真清晰的书写您的姓名！';
				this.openPopup(name)
			},
			toIdentity(){
				let self = this;
				scanHumanFace().then((res)=>{
					if(res &&(res.result==true || res.result=='true')){
						getAuthProtocol(self,{...this.pageOption,authLevel:'contractSign'}).then((res)=>{
							if(res.code==200){
								let {qrCodeFlowNum,certificateNum} = {...this.pageOption};
								let {token} = {...res.data};
								let paramOption = {certificateNum,qrCodeFlowNum,authLevel: "L4",token};
								pullScanResult(self,paramOption).then(res=>{
									if(res.code==200){
										this.isSignSample = res.data.isSignSample;
										// this.isSignSample = false;
										this.openSignPopup('signSampleDialog');
									}
								});
							}
						});
					}else if(res &&(res.result==false || res.result=='false')){
            showTost({msg:'扫脸不通过，请重试',icon: 'error'});
					}else{
						if(uniappUserAgent.indexOf('tfryb') > -1){
							showTost({msg:'ryb账号过期，请重新登录账号',icon: 'error'});
						}
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			sign(){
				let self = this;
				this.aoCount = 0;
				if(window.axBaseLib){
					if(this.AosInstance){
						if(self.isSignSample){
							self.AosInstance.startSign({
								token:self.aoToken,
								signDistinguish:true,
								options:{
									logo: false, // 可移除右上logo
									noteContent: '' // 可移除右下文字描述
								}
							});
						}else{
							self.signSample();
						}
					}
					else{
						console.log('A:初始化失败')
						this.getSign().then(()=>{
							console.log('A:重新初始化')
							this.sign()
						});
					}
				}else{
					console.log('A:加载失败')
					this.getAos();
				}
			},
			signSample(){
				this.aoCount++;
				let {personName,certificateNum} = {...this.pageOption}
				this.AosInstance.startSignSample({
					token:this.aoToken,
					mode:'singleStep',
					count:2,
					name:personName,
					personIdentity:certificateNum,
					options:{
						logo: false, // 可移除右上logo
						noteContent: '' // 可移除右下文字描述
					}
				});
			},
			pullSign(handwritingImage){
				let self = this;
				let {elecContractNo,qrCodeFlowNum,personName,phoneNumber,certificateNum} = {...this.pageOption};
				this.req.getway({
					url:'/paperless/H5Interface/getSignContractProtocol',
					data:{elecContractNo,"signerRealName":personName,phoneNumber,"idCardNo":certificateNum}
				}).then(res=>{
					if(res.code==200){
						let protocal = res.data.id;
						let signTime = getCurrentTime();
						self.req.getway({
								url: '/paperless/H5Interface/signContract',
								data: {elecContractNo,qrCodeFlowNum,protocal,"authType": 2,signTime,
									"idCardNo": certificateNum,"signImage": handwritingImage},
							}).then(res => {
                console.log('是否跳转res:',res)
								if(res.code==200){
									if(self.pageOption.callbackUrl.length>0){
										window.location.href = decodeURIComponent(self.pageOption.callbackUrl)+'?option='+JSON.stringify(res);
									}else{
										console.log('没有提供跳转路经')
										/* uni.navigateTo({
											url:'../identify-result/identify-result?res='+JSON.stringify(res)+'&callbackUrl=../index/index'
										}); */
									}
								}
							})
					}
				})
			},
			
			getAos(){
				asyncLoadJs(this.aosObj.aosJsUrl).then(()=>{//测试环境
					this.getSign();
				}).catch(err=>{
					console.log(err,'A:加载失败')
				});
			},
			getSign(){
				let qrCodeFlowNum = this.pageOption.qrCodeFlowNum;
				let self = this;
				return new Promise((resolve, reject) => {
					uni.request({
						method:'post',
						url: self.aosObj.aosTokenUrl,
						data: {
							'clientToken': qrCodeFlowNum,
							'grant_type': 'aos_exchange_token',
							'userInfoUrl': self.aosObj.aosFetchUserInfoUrl
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
							'Authorization': self.aosObj.aosUserInfo
						},
						success: (res) => {
							if(res.data.code==200){
								this.aoToken = res.data.data.access_token;
								this.AosInstance = window.axBaseLib.init();
								let {certificateNum, elecContractNo} = {...self.pageOption};
								this.AosInstance.on('sign-complete', (data) => {
									console.log('sign-complete')
									if(self.isSignSample){
										const {handwritingImage,handwritingImageId,payload} = data;
										// console.log('A签字:',data)
										// handwritingImage [string] 签字笔迹图⽚base64
										// handwritingImageId [string] 签字笔迹图⽚ID，后续可通过ID获取签字笔迹图⽚
										// payload [string] 部分需要finishSign事件携带的数据
										if(handwritingImageId){
											this.pullSign(handwritingImage);
										}
									}else{
										if(this.aoCount===1){
											this.signSample();
										}
									}
								});
								this.AosInstance.on('sign-validate-error', (data) => {
									if(data.type=='error'){
										if(this.signErrorCount<3){
											this.signErrorCount++;
										}
										if(this.signErrorCount==3){
											this.AosInstance.closeSign();
											// this.$nextTick(function(){
											// 	this.sign();
											// })
										}
									}
								});
								
								// console.log(handwritingImages[0],certificateNum);//handwritingImage数组
								this.AosInstance.on('sample-complete', (data) => {
									console.log('sample-complete')
									const {handwritingImages} = data;
									console.log(handwritingImages[0])
									self.req.getway({
											url: '/paperless/H5Interface/signSample',
											data: {"idCardNo": certificateNum,"signImage": handwritingImages[0], "elecContractNo": elecContractNo},
										}).then(res => {
											if(res.code==200){
												this.isSignSample = true;
												this.openSignPopup('signSampleDialog');
											}
										})
								});
								this.AosInstance.on('sample-error', (data) => {
									console.log('sample-error')
									this.AosInstance.closeSign();
									this.openPopup('resetSampleDialog');
								})
								resolve();
							}else{
								showTost({msg:"AX-token获取提示："+res.data.code+'，'+res.data.msg,icon: 'error'});
							}
						},
						fail:(err) => {
							console.log(err,'A:token获取失败')
						}
					})
				})
			},
			getDescription(){
				let self = this;
				getAuthProtocol(self,{...this.pageOption,authLevel:'contractSign'}).then((res)=>{
					if(res.code==200){
						this.discripInfo = {...res.data};
					}
				});
			}
		},
		components:{PageHead,PageTitle,WillConfirm,FullLight}
	}
</script>

<style lang="scss">
.contract{
	height:83vh;
	padding: 20rpx 60rpx;
	
	.contract-info-will{
		text-indent:2em;
		text-align:left;
		font-size: 28rpx;
		padding-bottom: 20rpx;
	}
	
	.page-bottom-btn{
		@include bottomBtn($uni-color-primary,$uni-text-color-inverse);
	}
}
</style>
