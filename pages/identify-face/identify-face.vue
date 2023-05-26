<template>
	<view>
		<page-head :steps="steps" :active="2"></page-head>
		<scroll-view scroll-y="true" >
			<view class="identify" v-if="readyShow">
				<page-title :imgTitle="'person'" :textTitle="'身份识别'"></page-title>
				<will-confirm></will-confirm>
				<full-light></full-light>
				<uni-popup ref="popup" type="message">
					<uni-popup-message type="warn" :message="msg" :duration="2000"></uni-popup-message>
				</uni-popup>
				<view class="page-bottom-btn">
					<button class="page-bottom-btn-ok" @click="toIdentity()">去认证</button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getAuthProtocol,scanHumanFace,pullScanResult,showTost} from '../../static/js/tool.js'
	import PreRead from '@/components/pre-read.vue';
	import PageHead from '@/components/page-head.vue';
	import PageTitle from '@/components/page-title.vue';
	import WillConfirm from '@/components/will-confirm.vue';
	import FullLight from '@/components/full-light.vue';
	export default {
		data() {
			return {
				readyShow:true,
				steps:[{title: '实名认证'},{title: '确认信息'}, {title: '身份认证'}, {title: '完成'}],
				pageOption: {},
				identifyFlag:false,
				msg:'请重新扫脸认证'
			};
		},
		onLoad(option){
			this.pageOption = {...option};
		},
		methods: {
			toIdentity(){
				let self = this;
				scanHumanFace().then((res)=>{
					if(res &&(res.result==true || res.result=='true')){
            let aplatToken = uni.getStorageSync('appToken');
            let aplatObj = JSON.parse(aplatToken);
						getAuthProtocol(self,{...this.pageOption,...aplatObj,authLevel: "L4"}).then((res)=>{
							if(res.code==200){
								let {qrCodeFlowNum,callbackUrl,certificateNum} = {...this.pageOption};
								let {token} = {...res.data};
								let paramOption = {certificateNum,qrCodeFlowNum,authLevel: "L4",token};
								pullScanResult(self,paramOption).then(res=>{
									if(res.code==200){
										if(callbackUrl&&callbackUrl.length>0){
											window.location.href = decodeURIComponent(callbackUrl)+'?option='+JSON.stringify(res);
										}else{
											uni.navigateTo({
												url:'../identify-result/identify-result?res='+JSON.stringify(res)+'&callbackUrl=../index/index'
											});
										}
									}
								});
							}
						});
					}else{
            showTost({msg:data.msg||'认证失败',icon: 'error'});
					}
				}).catch(err=>{
					console.log(err)
				})
			},
		},
		components:{PreRead,PageHead,PageTitle,WillConfirm,FullLight}
	}
</script>

<style lang="scss">
.identify{
	padding: 20rpx 60rpx;
	.page-bottom-btn{
		@include bottomBtn($uni-color-primary,$uni-text-color-inverse);
	}
}
</style>

