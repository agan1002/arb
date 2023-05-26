<template>
	<view>
		<PreRead @sureIdentify="sureIdentify"></PreRead>
		<page-head :steps="steps" :active="1"></page-head>
		<scroll-view scroll-y="true" >
			<view class="identify">
				<page-title :imgTitle="'person'" :textTitle="'确认信息'"></page-title>
				<info-form @toNext="toNext" :identifyFlag="identifyFlag">
					<template v-slot:form>
						<uni-forms ref="form" :modelValue="formData" label-align="right">
								<uni-forms-item label="姓名" name="personName">
										<uni-easyinput type="text" disabled  v-model="formData.personName" />
								</uni-forms-item>
								<uni-forms-item label="证件类型" name="certificateTypeName">
									<uni-easyinput type="text" disabled  v-model="formData.certificateTypeName" />
								</uni-forms-item>
								<uni-forms-item label="证件号码" name="certificateNum">
										<uni-easyinput type="text" disabled  v-model="formData.certificateNum" />
								</uni-forms-item>
						</uni-forms>
					</template>
				</info-form>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getPersonOrEnterpriseInfo,getAuthProtocol,scanHumanFace,pullScanResult,showTost} from '../../static/js/tool.js'
	import PreRead from '@/components/pre-read.vue';
	import PageHead from '@/components/page-head.vue';
	import PageTitle from '@/components/page-title.vue';
	
	import WillConfirm from '@/components/will-confirm.vue';
	import InfoForm from '@/components/info-form.vue';
	export default {
		data() {
			return {
				steps:[{title: '实名认证'},{title: '确认信息'}, {title: '身份认证'}, {title: '完成'}],
				formData: {},
				identifyFlag:false
			};
		},
		onLoad(option){
			this.pageOption = {...option};
			this.getJwtToken();
		},
		methods: {
			getJwtToken(){
				let self = this;
				let qrCodeFlowNum = this.pageOption.qrCodeFlowNum;
				getPersonOrEnterpriseInfo(self,{qrCodeFlowNum}).then((res)=>{
					let code = res.code;
					if(code==200){
						this.formData = {...res.data}
					}
				})
			},
			toNext(){
				let {qrCodeFlowNum,callbackUrl} = {...this.pageOption};
				let {personName,certificateNum,phoneNumber} = {...this.formData}
				uni.navigateTo({
					url:'../identify-face/identify-face?qrCodeFlowNum='+qrCodeFlowNum+'&callbackUrl='+callbackUrl+'&certificateNum='+certificateNum+'&personName='+personName+'&phoneNumber='+phoneNumber
				});
			},
		
			sureIdentify(flag){
				this.identifyFlag = flag;
			}
		},
		components:{PreRead,PageHead,PageTitle,WillConfirm,InfoForm}
	}
</script>

<style lang="scss">
.identify{
	padding: 20rpx 60rpx;
}
</style>

