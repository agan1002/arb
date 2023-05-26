<template>
	<view class="identify">
		<PreRead @sureIdentify="sureIdentify"></PreRead>
		<will-confirm :willSrc="willSrc"></will-confirm>
		<info-form @toIdentity="toIdentity" :identifyFlag="identifyFlag" :isFuLight="false">
			<template v-slot:form>
				<uni-forms validate-trigger="bind" ref="form" :modelValue="formData" label-align="right" :rules="rules">
						<uni-forms-item label="姓名" name="legalPersonName">
								<uni-easyinput type="text" disabled  v-model="formData.legalPersonName" />
						</uni-forms-item>
						<uni-forms-item label="证件类型" name="legalPersonCertificateTypeName">
							<uni-easyinput type="text" disabled  v-model="formData.legalPersonCertificateTypeName" />
						</uni-forms-item>
						<uni-forms-item label="证件号码" name="legalPersonCertificateNum">
								<uni-easyinput type="text" disabled  v-model="formData.legalPersonCertificateNum" />
						</uni-forms-item>
						<uni-forms-item label="手机号" name="legalPersonPhoneNumber">
								<uni-easyinput type="number" v-model="formData.legalPersonPhoneNumber" />
						</uni-forms-item>
						<!-- <uni-forms-item label="验证码" name="idCardNo">
							<view class="form-auth">
								<uni-easyinput type="text" v-model="formData.idCardNo" class="form-auth-inp" /><button @click="getAuthcode" :type="/^1[3|4|5|8]\d{9}$/.test(formData.tel)?'primary':'default'" :disabled="/^1[3|4|5|8]\d{9}$/.test(formData.tel)?false:true" class="form-auth-code">获取验证码</button>
							</view>
						</uni-forms-item> -->
				</uni-forms>
			</template>
		</info-form>
	</view>
</template>

<script>
	import {getCertificate,getCurrentTime} from '../../static/js/tool.js'
	import PreRead from '@/components/pre-read.vue';
	import WillConfirm from '@/components/will-confirm.vue';
	import InfoForm from '@/components/info-form.vue';
	export default {
		data() {
			return {
				prereadContent:'{AAAAA}',
				willSrc:'../../static/imgs/face_identify.png',
				formData: {},
				rules:{},
				token:'',
				qrCodeFlowNum:'',
				identifyFlag:false
			}
		},
		onReady() {
		        // 需要在onReady中设置规则
		        this.$refs.form.setRules(this.rules)
		    },
				onLoad(option){
					this.token = option.token;
					this.qrCodeFlowNum = option.qrCodeFlowNum;
					this.getEnterpriseInfo();
				},
		methods: {
			//获取验证码
			getAuthcode(){
				
			},
			getEnterpriseInfo(){
				this.req.getway({
					url:'/paperless/H5Interface/enterpriseInfo',
					data:{"qrCodeFlowNum": this.qrCodeFlowNum},
				}).then(res=>{
					this.formData = {...res.data};
				})
			},
			toIdentity(){
				// let authResult = data.result === "true"?1:0;
				let authResult = 1;
				let authTime = getCurrentTime();
				this.req.getway({
					url:'/paperless/H5Interface/receiveEnterpriseAuthResult',
					data:{"socialCreditCode": this.formData.socialCreditCode,"qrCodeFlowNum": this.qrCodeFlowNum,"authLevel": "L4","token":this.token,authResult,authTime}
				}).then(res=>{
					uni.navigateTo({
						url:'../identify-result/identify-result?tip=恭喜您，已通过认证'
					});
				}).catch(err=>{
					console.log(err)
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
