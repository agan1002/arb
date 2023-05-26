<template>
	<view class="page-title">
		<image class="page-title-img" :src="imgSrc" mode=""></image><text>{{textTitle}}</text>
	</view>
</template>

<script>
	import person from '../static/imgs/title_person.png'
	import info from '../static/imgs/title_info.png'
	let imgSrc = {
		person,info
	};
	export default {
		name:"page-title",
		props:['imgTitle','textTitle'],
		data() {
			return {
				imgSrc:imgSrc[this.imgTitle]
			};
		}
	}
</script>

<style lang="scss">
	.page-title{
		border-bottom:2px solid $uni-bg-color-grey;
		display:flex;
		color:$uni-border-color;
		padding:20rpx 20rpx;
		margin-bottom:30rpx;
		.page-title-img{
			margin-right:30rpx;
			width:40rpx;
			height:40rpx;
		}
	}
</style>
