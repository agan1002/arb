<template>
  <view class="contract-signature">
    <view v-if="!signatureList && signatureList.length">
      <view class="title">请选择电子签章: </view>
      <scroll-view style="height: 82vh" scroll-y="true">
        <view class="signature-list">
          <radio-group @change="radioChange">
            <label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in signatureList" :key="item.value">
              <view>
                <radio :value="item.value" :checked="index === current" />
              </view>
              <image
                :src="item.imgSrc"
                mode="scaleToFill"
              />
              <view>{{item.name}}</view>
            </label>
          </radio-group>
        </view>
      </scroll-view>
      <button hover-class="button-hover">签章</button>
    </view>
    <view class="not-data" v-else>
      <view class="text"><uni-icons type="info" size="20" color="#E1384E"></uni-icons>未查询到相关企业印章</view>
      <view class="apply">请点击链接进行印章申请：<text @click="apply">申请链接</text></view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'ContractSignature',
  data () {
    return {
      current: 0,
      signatureList: [
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '企业公章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        },
        {
          id: 1,
          imgSrc: 'https://pic.616pic.com/ys_bnew_img/00/16/15/DyvZZHIaEO.jpg',
          name: '业务专用章'
        }
      ]
    }
  },
  methods: {
    radioChange () {

    },

    // 申请印章
    apply () {

    },
  }
}
</script>

<style lang="scss" scoped>
.contract-signature {
  padding: 20rpx;
  .title {
    margin-bottom: 10rpx;
  }
  .signature-list {
    margin-top: 10rpx;
    .uni-list-cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      uni-image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
      }
    }
  }
  uni-button {
    width: 360rpx;
    background-color: $uni-color-primary;
    color: $uni-text-color-inverse;
    position: fixed;
    bottom: 40rpx;
    left: 0;
    right: 0;
  }
  .not-data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .text {
      margin-top: 100rpx;
      display: flex;
      font-size: 32rpx;
      .uni-icons {
        margin-right: 10rpx;
      }
    }
    .apply {
      margin-top: 80rpx;
      font-size: 32rpx;
      text {
        color: $uni-color-primary;
      }
    }
  }
}
</style>