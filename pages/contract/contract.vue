<template>
	<view>
		<pre-read @sureIdentify="sureIdentify"></pre-read>
		<page-head :steps="steps" :active="0"></page-head>
		<scroll-view scroll-y="true" >
			<view class="contract" v-if="readyShow">
				<page-title :imgTitle="'info'" :textTitle="'认证信息'"></page-title>
				<view class="contract-disc">您正在签署电子合同号为：{{pageOption.elecContractNo}}的《{{pageOption.contractName}}》合同，现在将进行意愿确认表达</view>
				<view v-if="!matchFlag" class="contract-identify">
					<match-account :matchText="matchText"></match-account>
				</view>
				<info-form v-else :identifyFlag="identifyFlag" @toNext="toNext">
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
	import {getPersonOrEnterpriseInfo} from '../../static/js/tool.js'
	import PreRead from '@/components/pre-read.vue';
	import PageHead from '@/components/page-head.vue';
	import PageTitle from '@/components/page-title.vue';
	import MatchAccount from '@/components/match-account.vue';
	import InfoForm from '@/components/info-form.vue';
	export default {
		data() {
			return {
				readyShow:true,
				steps:[{title: '确认信息'}, {title: '意愿确认'}, {title: '合同签署'}, {title: '完成'}],
				pageOption:{
					elecContractNo:'',contractName:''
				},
				matchFlag:true,
				matchText:'',
				formData: {
					personName:''
				},
				identifyFlag:false,
				authLevel:'',
				discripInfo:{
					agreement:'',
					token:''
				},
			};
		},
		onLoad(option){
			this.pageOption = {...option};
		},
		methods:{
			getJwtToken(){
				uni.showLoading({
					title: '加载中......',
					mask:true
				})
				let self = this;
				let {qrCodeFlowNum} = {...this.pageOption};
				getPersonOrEnterpriseInfo(self,{qrCodeFlowNum}).then((res)=>{
					this.readyShow = true;
					let code = res.code;
					if(code==200){
						this.formData = {...res.data};
						this.matchFlag = true;
					}else{
						this.matchFlag = false;
						this.matchText = res.msg;
					}
				})
				
			},
			toNext(){
				let {qrCodeFlowNum,elecContractNo,callbackUrl} = {...this.pageOption};
				let {personName,certificateNum,phoneNumber} = {...this.formData}
				uni.navigateTo({
					url:'../contract-identify/contract-identify?qrCodeFlowNum='+qrCodeFlowNum+'&callbackUrl='+callbackUrl+'&elecContractNo='+elecContractNo+'&certificateNum='+certificateNum+'&personName='+personName+'&phoneNumber='+phoneNumber
				});
			},
			sureIdentify(flag){
				this.identifyFlag = flag;
			},
			
		},
		components:{PreRead,PageHead,PageTitle,MatchAccount,InfoForm}
	}
</script>

<style lang="scss">
	.contract{
		height:83vh;
		padding: 30rpx 60rpx;
		.contract-disc{
			text-indent:2em;
			color: #ff0000;
			font-size: 26rpx;
			margin-bottom:30rpx;
		}
	}
</style>