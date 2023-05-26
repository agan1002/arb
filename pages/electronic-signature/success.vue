<template>
  <view class="signature-success">
    <signingSuccessVue />
  </view>
</template>

<script>
import signingSuccessVue from '../../components/signing-success.vue'
export default {
  name: 'SignatureSuccess',
  components: { signingSuccessVue }
}
</script>

<style lang="scss" scoped>
.signature-success {

}
</style>