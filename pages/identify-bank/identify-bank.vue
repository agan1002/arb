<template>
	<view class="identify">
		<PreRead @sureIdentify="sureIdentify"></PreRead>
		<will-confirm :willSrc="willSrc"></will-confirm>
		<info-form @toIdentity="toIdentity" :identifyFlag="identifyFlag" :isFuLight="false">
			<template v-slot:form>
				<uni-forms validate-trigger="bind" ref="form" :modelValue="formData" label-align="right" :rules="rules">
						<uni-forms-item label="姓名" name="name">
								<uni-easyinput type="text" disabled  v-model="formData.name" />
						</uni-forms-item>
						<uni-forms-item label="证件类型" name="idType">
							<uni-easyinput type="text" disabled  v-model="formData.idType" />
						</uni-forms-item>
						<uni-forms-item label="证件号码" name="idCardNo">
								<uni-easyinput type="text" disabled  v-model="formData.idCardNo" />
						</uni-forms-item>
						<uni-forms-item label="手机号" name="tel">
								<uni-easyinput type="number" v-model="formData.tel" />
						</uni-forms-item>
						<uni-forms-item label="银行卡" name="idCard">
								<uni-easyinput type="number" v-model="formData.idCard" />
						</uni-forms-item>
						<uni-forms-item label="验证码" name="idCardNo">
							<view class="form-auth">
								<uni-easyinput type="text" v-model="formData.idCardNo" class="form-auth-inp" /><button @click="getAuthcode" :type="/^1[3|4|5|8]\d{9}$/.test(formData.tel)?'primary':'default'" :disabled="/^1[3|4|5|8]\d{9}$/.test(formData.tel)?false:true" class="form-auth-code">获取验证码</button>
							</view>
						</uni-forms-item>
				</uni-forms>
			</template>
		</info-form>
	</view>
</template>

<script>
	import PreRead from '@/components/pre-read.vue';
	import WillConfirm from '@/components/will-confirm.vue';
	import InfoForm from '@/components/info-form.vue';
	export default {
		data() {
			return {
				prereadContent:'{AAAAA}',
				willSrc:'../../static/imgs/bank.png',
				formData: {},
				rules:{},
				identifyFlag:false
			}
		},
		onReady() {
		        // 需要在onReady中设置规则
		        this.$refs.form.setRules(this.rules)
		    },
		methods: {
			//获取验证码
			getAuthcode(){
				
			},
			toIdentity(){
				uni.navigateTo({
					url:'../identify-result/identify-result?tip=恭喜您，已通过银行实名认证'
				});
			},
			sureIdentify(flag){
				this.identifyFlag = flag;
			}
		},
		components:{PreRead,WillConfirm,InfoForm}
	}
</script>

<style lang="scss">
.identify{
	padding: 20rpx 60rpx;
	.form-auth{
		display: flex;
		justify-content: space-between;
		.form-auth-inp{
			margin-right: 40rpx;
		}
		.form-auth-code{
			height: 36px;
			line-height: 2;
			&[type=primary]{
				background-color: $uni-color-primary;
			}
		}
	}
}
</style>
