<template>
  <view class="ensignature-success">
    <signingSuccessVue />
  </view>
</template>

<script>
import signingSuccessVue from '../../components/signing-success.vue'
export default {
  name: 'ENSignatureSuccess',
  components: { signingSuccessVue }
}
</script>

<style lang="scss" scoped>
.ensignature-success {

}
</style>