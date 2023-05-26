<template>
  <view class="electronic-signature">
    <view></view>
    <info-form :identifyFlag="identifyFlag" tipsText="您即将签署合同，请确认是否为您本人：" @toNext="toNext">
        <template v-slot:form>
          <uni-forms ref="form" :modelValue="formData" label-align="right">
              <uni-forms-item label="姓名" name="personName">
                  <uni-easyinput type="text" disabled  v-model="formData.personName" />
              </uni-forms-item>
              <uni-forms-item label="身份证号码" name="certificateNum">
                <uni-easyinput type="text" disabled  v-model="formData.certificateNum" />
              </uni-forms-item>
              <uni-forms-item label="手机号码" name="phoneNum">
                  <uni-easyinput type="text" disabled  v-model="formData.phoneNum" />
              </uni-forms-item>
          </uni-forms>
        </template>
      </info-form>
  </view>
</template>

<script>
import InfoForm from '@/components/info-form.vue';
export default {
  name: 'ElectronicSignatureInfoConfirm',
  components: {InfoForm},
  data () {
    return {
      identifyFlag: true,
      formData: {
        personName: '甘浩添',
        certificateNum: '513029199210020453'.replace(/^(.{6})(?:\d+)(.{0})$/, '$1************$2'),
        phoneNum: '17711445250'.replace(/^(.{3})(?:\d+)(.{3})$/, '$1*****$2')
      }
    }
  },
  methods: {
    toNext () {
      uni.navigateTo({
        url: './contract-detail'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.electronic-signature {
  padding: 20rpx;
  /deep/ .uni-forms {
    .uni-easyinput__content {
      text-align: right;
      border: none;
      color: #333;
    }
  }
}
</style>