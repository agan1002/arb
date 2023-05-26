<template>
  <view class="signing-success">
    <uni-icons type="checkbox-filled" size="80" color="#13BC64"></uni-icons>
    <view class="text">签署成功</view>
    <view class="page-bottom-btn">
			<button class="page-bottom-btn-ok" @click="toNext">确认</button>
		</view>
  </view>
</template>

<script>
export default {
  name: 'Success',
  data () {
    return {

    }
  },
  methods: {
    toNext () {}
  }
}
</script>

<style lang="scss" scoped>
.signing-success {
  padding-top: 160rpx;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .text {
    margin-top: 10rpx;
  }
  .page-bottom-btn{
    margin-top: 40rpx;
    @include bottomBtn($uni-color-primary,$uni-text-color-inverse);
    .page-bottom-btn-ok {
      padding: 0rpx 140rpx;
    }
  }
}
</style>