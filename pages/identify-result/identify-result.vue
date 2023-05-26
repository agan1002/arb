<template>
	<view class="identify-tip">
		<image class="identify-tip-img" :src="option.code===200?imgSuccess:imgFail" mode=""></image>
		<view class="identify-tip-text">{{option.msg}}</view>
		<navigator :url="url" hover-class="other-navigator-hover">
				<button class="identify-tip-btn" type="primary">返回</button>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgSuccess:'../../static/imgs/success.png',
				imgFail:'../../static/imgs/fail.png',
				url:'../index/index',
				option:{}
			};
		},
		onLoad(option) {
			this.option = {...JSON.parse(option.res)};
			this.url = option.callbackUrl;
		}
	}
</script>

<style lang="scss">
.identify-tip{
	padding: 100rpx;
	text-align: center;
	.identify-tip-img{
		width: 200rpx;
		height: 200rpx;
	}
	.identify-tip-text{
		padding: 50rpx;
	}
	.identify-tip-btn{
		width: 400rpx;
		margin-top: 300rpx;
		background-color: $uni-color-primary;
	}
}
</style>