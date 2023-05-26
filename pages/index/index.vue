<template>
	<view class="container bd">
		<navigator :url="'../weixinface/weixinface'"
			hover-class="other-navigator-hover">
			<button type="default">实名认证——微信</button>
		</navigator>
		<navigator :url="'../identify/identify?qrCodeFlowNum='+currentQrCodeFlowNum"
			hover-class="other-navigator-hover">
			<button type="default">实名认证——个人</button>
		</navigator>
		<!-- <navigator url="../identify/identify?idCardNo=510610199603065632&personName=派大兴&phoneNumber=15282661756&authLevel=L5"
			hover-class="other-navigator-hover">
			<button type="default">银行卡</button>
		</navigator> -->
		<navigator            
		:url="'../contract/contract?elecContractNo=1651856349433229314&contractName=存量房合同&callbackUrl=dd&rejectUrl=/index&qrCodeFlowNum='+currentQrCodeFlowNum"
			hover-class="navigator-hover">
			<button type="default">电子签字合同</button>
		</navigator>
		<navigator :url="'../enterprise/enterprise?qrCodeFlowNum='+currentQrCodeFlowNum"
			hover-class="other-navigator-hover">
			<button type="default">企业印章</button>
		</navigator>
		<view>
			<input class="input-qr" type="number" v-model="qrCodeFlowNum" placeholder="请输入二维码流水号" />		
		</view>
		
	</view>
</template>
<script>
	
	export default {
		data() {
			return {
				qrCodeFlowNum:'',
				currentQrCodeFlowNum:''
				
			}
		},
			onLoad() {
				/* if(this.req.whichEnv === 'cdszjjwzhzt_test'){
					uni.setStorageSync("smyUserInfo",{jwtToken:'6ad7ae86-1fe1-4b17-a8ce-ade7562bffa4',username:'921059597605666816'})
				} */
				let personQrCodeFlowNum='1651850191353942016';//个人
				let contractQrCodeFlowNum='1651856745427898368';
				// contractQrCodeFlowNum:'1467028363172384768',
				// sealQrCodeFlowNum:'1468137260016734208',//走不通 
				// let sealQrCodeFlowNum='1468477356632969216';//印章企业1
				// let sealQrCodeFlowNum='1471063178481766400';//印章企业 2\
				let sealQrCodeFlowNum='1503298677011124224';//印章企业 2\
				// let sealQrCodeFlowNum='1490612210312941568';
				// this.currentQrCodeFlowNum = personQrCodeFlowNum;
				this.currentQrCodeFlowNum = contractQrCodeFlowNum;
				// this.currentQrCodeFlowNum = sealQrCodeFlowNum;
			
			},
		onUnload(){
			this.qrCodeFlowNum=null;
		},
		watch:{
			qrCodeFlowNum(val){
				if(val.length>0){
					this.currentQrCodeFlowNum = this.qrCodeFlowNum;
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		font-size: 28rpx;
		.input-qr{
			border: 1px solid $uni-text-color-tip;
			margin:100rpx;
			height:200rpx;
			text-indent:30rpx;
		}
		
	}
</style>
