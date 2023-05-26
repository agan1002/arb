<template>
  <view class="signing-record">
    <view class="steps">
      <view class="step-item" v-for="item in options" :key="item.id">
        <view class="icon"></view>
        <view class="poa time">{{item.time}}</view>
        <view class="poa date">{{item.date}}</view>
        <view class="poa status">{{item.status}}</view>
        <view class="poa desc">{{item.desc}}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'SigningRecord',
  props: {
    options: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.signing-record {
  padding: 60rpx 20rpx 0 20rpx;
  .steps {
    .step-item {
      margin: 100rpx 0 0 200rpx;
      position: relative;
      .poa {
        position: absolute;
        font-size: 28rpx;
        color: #999999;
      }
      .icon {
        width: 20rpx;
        height: 20rpx;
        border: 6rpx solid #0079FE;
        border-radius: 50%;
        background: #fff;
      }
      .status {
        left: 20rpx;
        top: -6rpx;
        left: 50rpx;
      }
      .desc {
        left: 50rpx;
        top: 50rpx;
      }
      .time {
        color: #000;
        font-weight: 600;
        width: 180rpx;
        text-align: right;
        left: -200rpx;
        top: -6rpx;
      }
      .date {
        width: 180rpx;
        text-align: right;
        left: -200rpx;
        top: 52rpx;
        font-size: 26rpx;
      }
      &::after {
        content: '';
        height: 100rpx;
        width: 4rpx;
        display: inline-block;
        background-color: #E4E4E4;
        position: absolute;
        left: 12rpx;
      }
    }
    .step-item:nth-child(1) {
      margin-top: 0;
    }
  }
  
}
</style>