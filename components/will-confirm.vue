<template>
	<view class="will-confirm">
			<image :src="imgSrc"></image>
			<slot name="elecContractNo"></slot>
			<view class="form-tip">请确认由本人亲自操作</view>
	</view>
</template>

<script>
	import imgSrc from '../static/imgs/face_identify.png';

	export default {
		name:"will-confirm",
		data() {
			return {
				imgSrc
			};
		}
	}
</script>

<style lang="scss">
.will-confirm{
		text-align: center;
		image{
			margin:20rpx;
			width: 360rpx;
			height: 230rpx;
		}
		.form-tip{
			color: $uni-text-color-grey;
			font-size:32rpx;
		}
	}
</style>
