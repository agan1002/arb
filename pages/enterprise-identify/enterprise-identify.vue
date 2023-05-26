<template>
	<view class="">
		<page-head :steps="steps" :active="1"></page-head>
		<scroll-view scroll-y="true" >
			<view class="content">
				<page-title :imgTitle="'person'" :textTitle="'身份识别'"></page-title>
				<will-confirm>
					<template v-slot:elecContractNo>
						<view class="content-info-will">{{discripInfo.agreement}}</view>
					</template>
				</will-confirm>
				<full-light></full-light>
				
				<view class="page-bottom-btn">
					<button v-if="discripInfo.agreement.length===0" size="default" type="default" disabled>去认证</button>
					<button v-else class="page-bottom-btn-ok" @click="openPopup('popupSubmitForm')">去认证</button>
				</view>
				<uni-popup ref="popupSubmitForm" type="dialog">
				    <uni-popup-dialog mode="base" type="warn" content="您正在进行二手房买卖,请提高警惕" :duration="2000" :before-close="true" @close="closePopup('popupSubmitForm')" @confirm="confirmPopup('popupSubmitForm')"></uni-popup-dialog>
				</uni-popup>
		</view>
		</scroll-view>
	</view>
	
</template>

<script>
	import {getAuthProtocol,asyncLoadJs,scanHumanFace,getCurrentTime,pullScanResult,showTost} from '../../static/js/tool.js'
	import PageHead from '@/components/page-head.vue';
	import PageTitle from '@/components/page-title.vue';
	import WillConfirm from '@/components/will-confirm.vue'
	import FullLight from '@/components/full-light.vue';
	
	export default {
		data() {
			return {
				steps:[{title: '确认信息'}, {title: '身份认证'}, {title: '企业信息'}, {title: '电子印章'}, {title: '完成'}],
				pageOption:{},
				discripInfo:{
					agreement:''
				},
			};
		},
		onLoad(option){
			this.pageOption = {qrCodeFlowNum:option.qrCodeFlowNum,...JSON.parse(option.formDataStr)};
			
			this.getDescription();
		},
		methods:{
			openPopup(name){
				this.$refs[name].open('center');
			},
			closePopup(name){
				 this.$refs[name].close();
			},
			confirmPopup(name){
				this.$refs[name].close();
				this.toIdentity()
			},
			toIdentity(){
				let self = this;
				scanHumanFace().then((res)=>{
					if(res &&(res.result==true || res.result=='true')){
						getAuthProtocol(self,{...this.pageOption,authLevel:'L3'}).then((res)=>{
							if(res.code==200){
								let {qrCodeFlowNum,socialCreditCode} = {...this.pageOption};
								// ,jwtToken,username
								let {token} = {...res.data};
								let paramOption = {qrCodeFlowNum,authLevel: "L4",token,socialCreditCode};
								pullScanResult(self,paramOption).then(res=>{
									if(res.code==200){
										uni.navigateTo({
											url:'../enterprise-info/enterprise-info?qrCodeFlowNum='+qrCodeFlowNum
										});
									}
								});
							}
						});
					}else{
            showTost({msg:'R扫脸:'+data.msg,icon: 'error'});
					}
				}).catch(err=>{
					console.log(err)
				})
			},
			
			getDescription(){
				let self = this;
				getAuthProtocol(self,{...this.pageOption,authLevel:'L3'}).then((res)=>{
					if(res.code==200){
						this.discripInfo = {...res.data};
					}
				});
			}
		},
		components:{PageHead,PageTitle,WillConfirm,FullLight}
	}
</script>

<style lang="scss">
.content{
	height:83vh;
	padding: 20rpx 60rpx;
	
	.content-info-will{
		text-align:center;
		font-size: 28rpx;
		padding-bottom: 20rpx;
	}
	
	.page-bottom-btn{
		@include bottomBtn($uni-color-primary,$uni-text-color-inverse);
	}
}
</style>
