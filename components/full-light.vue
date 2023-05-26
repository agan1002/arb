<template>
	<!-- <uni-grid :column="3" borderColor="transparent">
		<uni-grid-item v-for="(item,i) in imgs" :key=i>
			<view class="a">
				<image :src="'../../static/imgs/'+item.name+'.png'"></image>
			</view>
		</uni-grid-item>
	</uni-grid> -->
	<view class="full-light">
		<view class="full-light-item" v-for="(item,i) in imgs" :key=i>
				<image :src="'../../static/imgs/'+item.name+'.png'" mode="heightFix"></image>
				<view class="full-light-item-text">{{item.text}}</view>
		</view>
	</view>
</template>
<script>
	export default {
		name:"full-light",
		data() {
			return {
				imgs:[{name:'light_sun',text:'光线充足'},{name:'light_face',text:'放慢动作'},{name:'light_phone',text:'正对手机'}]
			};
		}
	}
</script>

<style lang="scss">
	.full-light{
		display: flex;
		justify-content: space-around;
		padding: 30rpx 20rpx 15rpx;
		.full-light-item{
			text-align:center;
			color: $uni-text-color-grey;
			font-size:32rpx;
			image{
				height: 100rpx;
			}
		}
	}
.uni-grid{
			.uni-grid-item{
				text-align: center;
				line-height: 1;
				image{
					margin-top: 15px;
					width: 120rpx;
					height: 120rpx;
					vertical-align: middle;
				}
			}
		}
</style>
