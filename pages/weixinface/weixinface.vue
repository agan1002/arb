<template>
	<!-- <web-view :webview-styles="webviewStyles" src="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1f7125112b74db52&redirect_uri=https%3A%2F%2Fopen.faceid.qq.com%2Fv1%2Fapi%2FgetCode%3FbizRedirect%3Dhttps%253A%252F%252Ffaceid.qq.com%252Fapi%252Fauth%252FgetOpenidAndSaveToken%253Ftoken%253DA8393673-D2C0-441F-B708-059CFEDE443D&response_type=code&scope=snsapi_base&state=&component_appid=wx9802ee81e68d6dee#wechat_redirect"></web-view> -->
	<view></view>
</template>

<script>
	export default {
		data() {
			return {
				wx_url:null
			}
		},
		onLoad(option){
			window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1f7125112b74db52&redirect_uri=https%3A%2F%2Fopen.faceid.qq.com%2Fv1%2Fapi%2FgetCode%3FbizRedirect%3Dhttps%253A%252F%252Ffaceid.qq.com%252Fapi%252Fauth%252FgetOpenidAndSaveToken%253Ftoken%253DA8393673-D2C0-441F-B708-059CFEDE443D&response_type=code&scope=snsapi_base&state=&component_appid=wx9802ee81e68d6dee#wechat_redirect"
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.identify {
			font-size: 28rpx;
			height: 100vh;
			background: #FFFCFC;
			.identify-title{
				background: #8DDDFA;
				text-align: center;
				display: flex;
				flex-direction: column;
				padding: 30px 0;
				image{
					width: 200rpx;
					height: 200rpx;
				}
				.identify-title-text{
					font-size: 32rpx;
				}
			}
			.identify-content{
				.identify-describe{
					line-height: 20px;
					padding: 20rpx 80rpx;
					.identify-describe-goal{
						text-indent:2em;
						padding-bottom: 20rpx;
					}
					.identify-describe-info{
						color: $uni-text-color-tip;
					}
				}
				.identify-content-card{
					height: 50px;
					.identify-content-card-img{
						line-height: 1;
						image{
							width: 80rpx;
							height: 50px;
						}
					}
					.identify-content-card-title{
						width: 300rpx;
						display: flex;
						justify-content: space-between;
					}
					.identify-content-card-text{
						color: $uni-color-primary;
						font-weight: 600;
					}
					.identify-content-card-description{
						color: $uni-text-color-disable;
					}
					.identify-content-card-btn{
						text-align: right;
						margin-top: 20rpx;
						.identify-content-card-btn-identify[type=primary]{
							background-color: $uni-color-primary;
							color: $uni-text-color-inverse;
						}
					}
				}
			}
				
		}
</style>

