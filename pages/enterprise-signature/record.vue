<template>
  <view class="ens-signing-record">
    <signingRecordVue :options="options"/>
  </view>
</template>

<script>
import signingRecordVue from '../../components/signing-record.vue'
export default {
  name: 'ENSSigningRecord',
  components: { signingRecordVue },
  data () {
    return {
      options: [
        {
          id: 1,
          status: '张三已拒签',
          desc: '原因：合同异议',
          time: '12:00:00',
          date: '2017-04-01'
        },{
          id: 2,
          status: 'A企业已签署（经办人：张三）',
          time: '12:00:00',
          date: '2017-04-01'
        },{
          id: 3,
          status: '李四已签署',
          time: '12:00:00',
          date: '2017-04-01'
        },{
          id: 4,
          status: '张三已签署',
          time: '12:00:00',
          date: '2017-04-01'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.ens-signing-record {

}
</style>