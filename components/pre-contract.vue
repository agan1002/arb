<template>
  <view class="pre-contract">
    <view class="pdf-box">合同内容</view>
    <view class="bottom-btn">
      <text class="record" @click="goRecord">签署记录</text>
      <text v-if="status === 1" class="refuse" @click="refuse">拒签</text>
      <button v-if="status === 1" class="next-btn default-btn" @click="toNext">信息无误，下一步</button>
    </view>

    <!-- 拒签弹窗 -->
    <uni-popup ref="popup" type="dialog">
      <view class="action-tip-dialog">
        <view class="action-tip-dialog-title">拒签</view>
        <view class=""></view>
        <uni-easyinput type="textarea" v-model="reason" placeholder="请输入拒签原因"></uni-easyinput>
        <view class="bottom-btns">
          <view @click="$refs.popup.close()">取消</view>
          <view class="confirm" @click="confirm">确定</view>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
export default {
  name: 'PreContract',
  components: {  },
  data () {
    return {
      status: 1,
      reason: ''
    }
  },
  methods: {
    // 查看签署记录
    goRecord () {
      uni.navigateTo({ url: '/pages/electronic-signature/record?test=111' })
    },

    // 拒签
    refuse () {
      this.$refs.popup.open('center')
    },

    // 提交拒签原因
    confirm () {
      if (!this.reason) {
        uni.showToast({
          title: '请输入拒签原因',
          icon: 'none'
        });
        return
      }
      console.log('调用接口')
      this.$refs.popup.close()
    },

    // 去签章
    toNext () {
      uni.navigateTo({ url: '/pages/contract/contract' })
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-contract {
  .bottom-btn {
    padding: 0 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 20rpx;
    left: 0;
    right: 0;
    .record {
      color: #8080FF;
      margin-left: 20rpx;
      text-decoration:underline;
    }
    .refuse {
      margin-left: 60rpx;
      color: #D9001B;
      text-decoration:underline;
    }
    .next-btn {
      @include defaultBtn($uni-color-primary,$uni-text-color-inverse);
      margin-left: 60rpx;
    }
  }
  .action-tip-dialog {
    padding: 0;
    .uni-easyinput {
      padding: 10px;
      width: auto;
    }
    .bottom-btns {
      display: flex;
      position: relative;
      margin-top: 20rpx;
      height: 80rpx;
      line-height: 80rpx;
      &:after {
        @include top1px();
      }
      view {
        width: 50%;
        color: $uni-color-primary;
      }
      .confirm {
        position: relative;
        &:after {
          @include left1px();
        }
      }
    }
  }
}
</style>