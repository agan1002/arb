<template>
	<view>
		<PreRead @sureIdentify="sureIdentify"></PreRead>
		<page-head :steps="steps" :active="0"></page-head>
		<scroll-view scroll-y="true" >
			<view class="content">
				<page-title :imgTitle="'info'" :textTitle="'认证信息'"></page-title>
				<view v-if="!matchFlag" class="contract-identify">
					<match-account :matchText="matchText"></match-account>
				</view>
				<info-form v-else :identifyFlag="identifyFlag" @toNext="toNext">
					<template v-slot:form>
						<uni-forms ref="form" :modelValue="formData" label-align="right">
								<uni-forms-item label="姓名" name="legalPersonName">
										<uni-easyinput type="text" disabled  v-model="formData.legalPersonName" />
								</uni-forms-item>
								<uni-forms-item label="证件类型" name="legalPersonCertificateTypeName">
									<uni-easyinput type="text" disabled  v-model="formData.legalPersonCertificateTypeName" />
								</uni-forms-item>
								<uni-forms-item label="证件号码" name="legalPersonCertificateNum">
										<uni-easyinput type="text" disabled  v-model="formData.legalPersonCertificateNum" />
								</uni-forms-item>
								<uni-forms-item label="企业名称" name="enterpriseName">
										<uni-easyinput type="text" disabled  v-model="formData.enterpriseName" />
								</uni-forms-item>
								<uni-forms-item label="统一信用码" name="socialCreditCode">
										<uni-easyinput type="text" disabled  v-model="formData.socialCreditCode" />
								</uni-forms-item>
						</uni-forms>
					</template>
					<template v-slot:light>
						<full-light></full-light>
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
	import MatchAccount from '@/components/match-account.vue';
	import InfoForm from '@/components/info-form.vue';
	import FullLight from '@/components/full-light.vue';
	export default {
		data() {
			return {
				steps:[{title: '确认信息'}, {title: '身份认证'}, {title: '企业信息'}, {title: '电子印章'}, {title: '完成'}],
				formData: {},
				pageOption:{},
				discripInfo:{
					agreement:""
				},
				identifyFlag:false,
				matchFlag:false,
				matchText:''
			};
		},
		onLoad(option){
			this.pageOption = {...option};
		},
		methods:{
			getJwtToken(){
				let self = this;
				let {qrCodeFlowNum} = {...this.pageOption};
					getPersonOrEnterpriseInfo(self,{qrCodeFlowNum,socialCreditCode:'socialCreditCode'}).then((res)=>{
						let code = res.code;
						if(code==200){
							this.formData = {...res.data}
							this.matchFlag = true;
						}else{
							this.matchFlag = false;
							this.matchText = res.msg;
						}
					})
			},
			toNext(){
				let {qrCodeFlowNum} = {...this.pageOption};
				// let {qrCodeFlowNum,callbackUrl} = {...this.pageOption};
				// let {personName,certificateNum,phoneNumber} = {...this.formData}
				
				uni.navigateTo({
					url:'../enterprise-identify/enterprise-identify?qrCodeFlowNum='+qrCodeFlowNum+'&formDataStr='+JSON.stringify(this.formData)
				});
			},
			
			sureIdentify(flag){
				this.identifyFlag = flag;
			},
			getDescription(){
				let self = this;
        let aplatToken = uni.getStorageSync('appToken');
				aplatObj = JSON.parse(aplatToken);
				getAuthProtocol(self,{...this.formData,...aplatObj,authLevel:'L3'}).then((res)=>{
					if(res.code==200){
						this.discripInfo = {...res.data};
					}
				});
			}
		},
		components:{PreRead,PageHead,PageTitle,WillConfirm,MatchAccount,InfoForm,FullLight}
	}
</script>

<style lang="scss">
.content{
	height:83vh;
	padding: 30rpx 60rpx;
	.contract-info-tip{
		color: #ff0000;
		font-size: 28rpx;
	}
}
</style>
