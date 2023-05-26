<template>
	<view  class="notmatch">
		<view class="notmatch-text">{{matchText}}</view>
		<button class="notmatch-btn" type="primary" @click="navigateBack">确认</button>
	</view>
</template>

<script>
	export default {
		name:"match-account",
		props:{
			matchText:{
				type:String,
				default:''
			}
		},
		methods:{
			navigateBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
.notmatch{
	text-align: center;
	font-size: 36rpx;
	color: $uni-text-color-tip;
	.notmatch-text{
		padding:80rpx 0 60rpx;
		font-weight:600;
	}
	.notmatch-btn{
		background: $uni-text-color-tip;
		width: 300rpx;
	}
}
</style>
