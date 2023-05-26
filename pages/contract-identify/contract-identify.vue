<template>
	<view class="">
		<page-head :steps="steps" :active="1"></page-head>
		<scroll-view scroll-y="true">
			<view class="contract">
				<page-title :imgTitle="'person'" :textTitle="'身份识别'"></page-title>
				<will-confirm>
					<template v-slot:elecContractNo>
						<view class="contract-info-will">{{discripInfo.agreement}}</view>
					</template>
				</will-confirm>
				<full-light></full-light>

				<view class="page-bottom-btn">
					<button v-if="discripInfo.agreement.length!==0" size="default" type="default"
						disabled="true"  loading="true">信息加载中....</button>
					<button v-else @click="userConfirm" :type="loadSuccess?'default':'primary'"
						:disabled="loadSuccess" :loading="loadSuccess">意愿确认</button>
				</view>
				<uni-popup ref="resetSampleDialog" type="dialog">
					<view class="action-tip-dialog">
						<view class="action-tip-dialog-title">提示</view>
						<view class="action-tip-dialog-text">笔迹留样鉴定失败，请重试</view>
						<button type="primary" @click="confirmResetSign('resetSampleDialog')"
							class="action-tip-dialog-btn" size="mini">我知道了</button>
					</view>
				</uni-popup>
			</view>
		</scroll-view>
		<view v-if="isShowSignView" class="sign-view">
			<p>
				您的手写签字无法通过笔迹鉴定，您可以使用留样采集签字的书写方式进行重新书写或者使用系统为您自动生成的个人签章。
			</p>
			<p>
				系统为您自动生成的个人签章如下，确认无误后点击"确认使用"：
			</p>
			<view class='sign-view-img'>
				<image class="sign-view-img-show" :src="canvasUrl" mode=""></image>
			</view>
			<view class="page-bottom-btn">
				<button class="page-bottom-btn-cancel" plain="true" type="default" @click="reSign()">重新签署</button>
				<button class="page-bottom-btn-ok" plain="true" type="primary"
					@click="rePullSign(canvasUrl)">确认使用</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAuthProtocol,
		asyncLoadJs,
		scanHumanFace,
		getCurrentTime,
		pullScanResult,
		showTost
	} from '../../static/js/tool.js'
	import PageHead from '@/components/page-head.vue';
	import PageTitle from '@/components/page-title.vue';
	import WillConfirm from '@/components/will-confirm.vue'
	import FullLight from '@/components/full-light.vue';

	export default {
		data() {
			return {
				steps: [{
					title: '确认信息'
				}, {
					title: '意愿确认'
				}, {
					title: '合同签署'
				}, {
					title: '完成'
				}],
				pageOption: {},
				discripInfo: {
					agreement: ''
				},
				isSignSample: false,
				signSampleText: '',
				signErrorCount: 0,
				canvasUrl: '',
				isShowSignView: false,
				loadSuccess: false,
				payload:null
			};
		},
		onLoad(option) {
			this.pageOption = {
				...option
			};
			this.getDescription();
		},
		onUnload() {
		},
		methods: {
			openPopup(name) {
				this.$refs[name].open('center');
			},
			closePopup(name) {
				this.$refs[name].close();
			},
			confirmPopup(name) {
				this.$refs[name].close();
				this.toIdentity()
			},
			confirmSign(name) {
				this.$refs[name].close();
				this.sign()
			},
			confirmResetSign(name) {
				this.confirmSign(name)
			},
			toIdentity() {
				let self = this;
				scanHumanFace().then((res) => {
					if (res && (res.result == true || res.result == 'true')) {
						getAuthProtocol(self, {
							...this.pageOption,
							authLevel: 'contractSign'
						}).then((res) => {
							if (res.code == 200) {
								let {
									qrCodeFlowNum,
									certificateNum
								} = {
									...this.pageOption
								};
								let {
									token
								} = {
									...res.data
								};
								let paramOption = {
									certificateNum,
									qrCodeFlowNum,
									authLevel: "L4",
									token
								};
								pullScanResult(self, paramOption).then(res => {
									if (res.code == 200) {
										this.isSignSample = res.data.isSignSample;
										var signSampleText = this.isSignSample ?
											'您将进入电子合同签署页面，请您清晰的书写您的签名并和采样时保持一致，否则将可能无法通过笔迹鉴定！' :
											'您将进入笔迹留样采集页面，为保障您的合法权益，提高签署效率，请使用正楷清晰的书写您的姓名！';
										var self = this;
										uni.showModal({
											title: '提示',
											cancelText: '考虑一下',
											confirmText: '我已知晓',
											confirmColor: '#FF0000',
											content: signSampleText,
											success: function(res) {
												if (res.confirm) {
													self.sign();
												} else if (res.cancel) {
													console.log('用户点击取消');
												}
											}
										});
									}
								});
							}
						});
					} else if (res && (res.result == false || res.result == 'false')) {
						uni.showModal({
							title: '提示',
							content: '人脸识别未通过，请保持面部无遮挡，露出额头',
							success: function(res) {}
						});
					} else {
						if (uniappUserAgent.indexOf('tfryb') > -1) {
							showTost({
								msg: 'ryb账号过期，请重新登录账号',
								icon: 'error'
							});
						}
					}
				}).catch(err => {
					console.log(err)
				})
			},
			sign() {
				let self = this;

			},
			signSample() {
				let {
					personName,
					certificateNum
				} = {
					...this.pageOption
				}

			},
			pullSign(handwritingImage) {
				let self = this;
				let {
					elecContractNo,
					qrCodeFlowNum,
					personName,
					phoneNumber,
					certificateNum
				} = {
					...this.pageOption
				};
				this.req.getway({
					url: '/paperless/H5Interface/getSignContractProtocol',
					data: {
						elecContractNo,
						"signerRealName": personName,
						phoneNumber,
						"idCardNo": certificateNum
					}
				}).then(res => {
					if (res.code == 200) {
						let protocal = res.data.id;
						let signTime = getCurrentTime();
						self.req.getway({
							url: '/paperless/H5Interface/signContract',
							data: {
								elecContractNo,
								qrCodeFlowNum,
								protocal,
								"authType": 2,
								signTime,
								"idCardNo": certificateNum,
								"signImage": handwritingImage
							},
						}).then(res => {
							console.log('是否跳转res:', res)
							if (res.code == 200) {
								var beforeHash = res.data.beforeHash;
								var afterHash = res.data.afterHash
								console.log('beforeHash:'+beforeHash)
								console.log('afterHash'+afterHash)

								if (self.pageOption.callbackUrl.length > 0) {
									window.location.href = decodeURIComponent(self.pageOption
										.callbackUrl) + '?option=' + JSON.stringify(res);
								} else {
									console.log('没有提供跳转路经')
									/* uni.navigateTo({
										url:'../identify-result/identify-result?res='+JSON.stringify(res)+'&callbackUrl=../index/index'
									}); */
								}
							}else{
								if (res.msg == '合同已签署，无法继续操作'||'SCCA：合同已签署，无法继续操作' || res.msg == 'SCCA：合同签署已完成,无法继续操作') {
									uni.showModal({
										title: '提示',
										cancelText: '确认',
										confirmText: '同步状态',
										confirmColor: '#FF0000',
										content: res.msg,
										success: function(res) {
											if (res.confirm) {
												self.repushStatus();
											} else if (res
												.cancel) {
													var result = {}
													result.success = false;
													result.message = res.msg;
													result.code = 200;
												window.location.href = decodeURIComponent(self.pageOption
													.callbackUrl) + '?option=' + JSON.stringify(result);
											}
										}
									});
								}
							}
						})
					}else{
						var result = {}
						result.success = false;
						result.message = res.msg;
						result.code = 200;
						if (res.msg == '合同已签署，无法继续操作'||'SCCA：合同已签署，无法继续操作' || res.msg == 'SCCA：合同签署已完成,无法继续操作') {
							uni.showModal({
								title: '提示',
								cancelText: '确认',
								confirmText: '同步状态',
								confirmColor: '#FF0000',
								content: res.msg,
								success: function(res) {
									if (res.confirm) {
										self.repushStatus();
									} else if (res
										.cancel) {
											var result = {}
											result.success = false;
											result.message = res.msg;
											result.code = 200;
										window.location.href = decodeURIComponent(self.pageOption
											.callbackUrl) + '?option=' + JSON.stringify(result);
									}
								}
							});
						}else{
							window.location.href = decodeURIComponent(self.pageOption
								.callbackUrl) + '?option=' + JSON.stringify(result);
						}
					}
				})
			},

			getAos() {

			},
			getSign() {
				
				let elecContractNo = this.pageOption.elecContractNo;
				let qrCodeFlowNum = this.pageOption.qrCodeFlowNum;
				let self = this;
			},
			getDescription() {
				let self = this;
				getAuthProtocol(self, {
					...this.pageOption,
					authLevel: 'contractSign'
				}).then((res) => {
					if (res.code == 200) {
						this.discripInfo = {
							...res.data
						};
					}
				});
			},
			reSign() {
				this.isShowSignView = false;
				this.sign();
			},
			rePullSign(canvas) {
				this.isShowSignView = false;
				this.pullSign(canvas);
			},
			textToImage(text, fontsize) {
				var canvas = document.createElement('canvas');
				canvas.height = 120;
				canvas.width = 200;
				var context = canvas.getContext('2d');
				context.font = "40px '宋体'";
				context.fillStyle = '#FA4040';
				context.textAlign = "center";
				context.textBaseline = 'middle';
				context.fillText(text, 100, 60);
				context.font = "40px '宋体'";
				var dataUrl = canvas.toDataURL('image/png'); //注意这里背景透明的话，需要使用png
				this.canvasUrl = dataUrl;

			},
			userConfirm() {
				var self = this;
				uni.showModal({
					title: '提示',
					cancelText: '考虑一下',
					confirmText: '我已知晓',
					confirmColor: '#FF0000',
					content: '您正在进行农业农村局电子签章，点击确定将唤起人脸核身进行意愿确认。人脸核身需要通过摄像头扫脸，请打开摄像头权限。',
					success: function(res) {
						if (res.confirm) {
							self.toIdentity();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			repushStatus(){
				let {
					elecContractNo
				} = {
					...this.pageOption
				};
				console.log('elecContractNo:'+elecContractNo)
				this.req.getway({
					url: '/paperless/H5Interface/syncSignStatus',
					data: {
						elecContractNo
					},
				}).then(res => {
					window.location.href = decodeURIComponent(this.pageOption
						.callbackUrl)+ '?option=' + JSON.stringify(result);
				});
			}
		},
		components: {
			PageHead,
			PageTitle,
			WillConfirm,
			FullLight
		}
	}
</script>

<style lang="scss">
	.contract {
		height: 83vh;
		padding: 20rpx 60rpx;

		.contract-info-will {
			text-indent: 2em;
			text-align: left;
			font-size: 28rpx;
			padding-bottom: 20rpx;
		}

		.page-bottom-btn {
			@include bottomBtn($uni-color-primary, $uni-text-color-inverse);
		}
	}

	.sign-view {
		position: fixed;
		left: 0;
		top: 0;
		background: #fff;
		height: 100vh;
		padding: 20rpx 60rpx;

		p {
			text-indent: 62rpx;
			letter-spacing: 1rpx;
			font-size: 36rpx;
			line-height: 2;
			color: #000;
		}

		.sign-view-img {
			text-align: center;
			margin-top: 50rpx;

			.sign-view-img-show {
				border: 1px dotted $uni-border-color;
				width: 480rpx;
				height: 300rpx;
			}
		}

		.page-bottom-btn {
			text-align: center;
			display: flex;
			justify-content: space-around;
			margin: 20px 60rpx;

			.page-bottom-btn-cancel {
				@include plainBtn($uni-text-color-grey);
			}

			.page-bottom-btn-ok {
				@include plainBtn($uni-color-primary);
			}
		}
	}
</style>