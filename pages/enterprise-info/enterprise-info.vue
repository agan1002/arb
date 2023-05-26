<template>
	<view class="">
		<page-head :steps="steps" :active="2"></page-head>
		<scroll-view scroll-y="true" >
			<view class="content">
				<view class="content-main">
					<page-title :imgTitle="'info'" :textTitle="'企业基础信息'"></page-title>
					<uni-forms class="enterprise-form" ref="form" :modelValue="formData" label-align="right">
							<uni-forms-item label="企业名称" name="enterpriseName">
									<uni-easyinput type="text" disabled  v-model="formData.enterpriseName" />
							</uni-forms-item>
							<uni-forms-item label="社会统一信用代码" name="socialCreditCode">
								<uni-easyinput type="text" disabled  v-model="formData.socialCreditCode" />
							</uni-forms-item>
							<uni-forms-item label="注册地址" name="registeredAddress">
									<uni-easyinput type="text" disabled  v-model="formData.registeredAddress" />
							</uni-forms-item>
							<uni-forms-item label="法定代表人" name="legalPersonName">
									<uni-easyinput type="text" disabled v-model="formData.legalPersonName" />
							</uni-forms-item>
							<uni-forms-item label="法定代表人证件号" name="legalPersonCertificateNum">
									<uni-easyinput type="number" disabled v-model="formData.legalPersonCertificateNum" />
							</uni-forms-item>
							<uni-forms-item label="法定代表人电话" name="legalPersonPhoneNumber">
									<uni-easyinput type="number" disabled v-model="formData.legalPersonPhoneNumber" />
							</uni-forms-item>
					</uni-forms>
				</view>
				<view class="content-divid"></view>
				<view class="content-main">
					<page-title :imgTitle="'info'" :textTitle="'印章管理员(默认法定代表人)'"></page-title>
					<uni-forms class="enterprise-form" ref="form2" :modelValue="formData" label-align="right">
							<uni-forms-item label="姓名" name="legalPersonName">
									<uni-easyinput type="text" disabled  v-model="formData.legalPersonName" />
							</uni-forms-item>
							<uni-forms-item label="身份证号" name="legalPersonCertificateNum">
								<uni-easyinput type="text" disabled  v-model="formData.legalPersonCertificateNum" />
							</uni-forms-item>
							<uni-forms-item label="电话号码" name="legalPersonPhoneNumber">
									<uni-easyinput type="text" disabled  v-model="formData.legalPersonPhoneNumber" />
							</uni-forms-item>
					</uni-forms>
				</view>
				<view class="page-bottom-btn">
					<button class="page-bottom-btn-cancel" plain="true" type="default" @click="navigateBack">取消</button>
					<button class="page-bottom-btn-ok" plain="true" v-show="formData.enterpriseName&&formData.enterpriseName.length>0" type="primary" @click="submit('dynamicForm')">确认并申请印章</button>
				</view>
				
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	import {getPersonOrEnterpriseInfo} from '../../static/js/tool.js'
	import PageHead from '@/components/page-head.vue';
	import PageTitle from '@/components/page-title.vue';
	export default {
		data() {
			return {
				steps:[{title: '确认信息'}, {title: '身份认证'}, {title: '企业信息'}, {title: '电子印章'}, {title: '完成'}],
				"formData":{
					enterpriseName:''
				}
			}
		},
		onLoad(option) {
			this.getEnterpriseInfo(option);
		},
		methods: {
			navigateBack(){
				uni.navigateBack();
			},
			submit(){
				let {legalPersonCertificateNum,socialCreditCode,enterpriseName} = {...this.formData}
				uni.navigateTo({
					url:'../enterprise-seal/enterprise-seal?idCardNo='+legalPersonCertificateNum+'&socialCreditCode='+socialCreditCode+'&enterpriseName='+enterpriseName
				});
			},
			getEnterpriseInfo(obj){
				let self = this;
				getPersonOrEnterpriseInfo(self,{...obj,socialCreditCode:'socialCreditCode'}).then((res)=>{
					let code = res.code;
					if(code==200){
						this.formData = {...res.data}
					}
				})
				
			}
		},
		components:{
			PageHead,PageTitle
		}
	}
</script>

<style lang="scss">
	.content{
		height:83vh;
		// padding: 0rpx 0rpx;
		// background:$uni-bg-color-grey;
		.content-info-will{
			text-indent:2em;
			text-align:left;
			font-size: 28rpx;
			padding-bottom: 20rpx;
		}
		.content-main{
			padding:15rpx 60rpx;
		}
		.content-divid{
			background-color:$uni-bg-color-hover;
			height:30rpx;
		}
		.page-bottom-btn{
			text-align: center;
			display: flex;
			justify-content: space-around;
			margin: 20px 60rpx;
			
			.page-bottom-btn-cancel{
				@include plainBtn($uni-text-color-grey);
			}
			.page-bottom-btn-ok{
				@include plainBtn($uni-text-color-success);
			}
		}
	}
.enterprise{
	border-bottom: 1px solid $uni-border-color;
	.enterprise-info{
		.enterprise-title{
			background-color: #B6D2FC;
			color: $uni-text-color-inverse;
			padding: 10px 30rpx;
		}
		.enterprise-form{
			
		}
	}
}

</style>
