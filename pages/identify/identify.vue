<template>
	<view class="identify">
		<page-head :steps="steps" :active="0"></page-head>
		<view class="" v-if="readyShow">
			<page-title :imgTitle="'info'" :textTitle="'实名认证'"></page-title>
			<view v-if="!matchFlag" class="contract-identify">
				<match-account :matchText="matchText"></match-account>
			</view>
			<view v-else class="identify-content">
				<view v-if="authLevel==='L3'" class="identify-describe">
					<view class="identify-describe-goal">{{discripInfo.agreement}}</view>
					<view class="identify-describe-info">法人姓名：{{formData.legalPersonName}}</view>
					<view class="identify-describe-info">法人证件号码：{{formData.legalPersonCertificateNum}}</view>
				</view>
				<view v-else class="identify-describe">
					<view class="identify-describe-goal">{{discripInfo.agreement}}</view>
					<view class="identify-describe-info">姓名：{{formData.personName}}</view>
					<view class="identify-describe-info">证件号码：{{formData.certificateNum}}</view>
				</view>
				<uni-card v-for="(item,i) in identifys" :key="i">
					 <uni-row class="identify-content-card">
							 <uni-col :span="4">
								 <view class="identify-content-card-img">
									 <image mode="aspectFit" :src="'../../static/imgs/'+item.img+'.png'" @error="imageError"></image>
								 </view>
							 </uni-col>
							 <uni-col :span="14">
									 <view class="identify-content-card-title"><text>{{item.title}}</text><text class="identify-content-card-text">{{item.level}}</text></view>
									 <view class="identify-content-card-description">{{item.description}}</view>
							 </uni-col>
							 <uni-col :span="6">
									 <view class="identify-content-card-btn">
										 <navigator v-if="authLevel===item.level&&discripInfo.agreement.length>0" :url="'../identify-'+item.url+'/identify-'+item.url+'?qrCodeFlowNum='+qrCodeFlowNum">
												 <button class="identify-content-card-btn-identify" type="primary" size="mini">去认证</button>
										 </navigator>
										 <button v-else class="identify-content-card-btn-identify" type="default" disabled="true" size="mini">去认证</button>
									 </view>
							 </uni-col>
					 </uni-row>
				</uni-card>
			</view>
		</view>
	</view>
</template>

<script>
	import {getPersonOrEnterpriseInfo,getAuthProtocol,scanHumanFace} from '../../static/js/tool.js'
	import PageHead from '@/components/page-head.vue';
	import PageTitle from '@/components/page-title.vue';
	import MatchAccount from '@/components/match-account.vue';
	export default {
		data() {
			return {
				readyShow:false,
				steps:[{title: '实名认证'},{title: '确认信息'}, {title: '身份认证'}, {title: '完成'}],
				src: '../../static/imgs/face_identify.png',
				qrCodeFlowNum:'',
				aplatObj:{},
				formData:{},
				authLevel:'',
				discripInfo:{
					agreement:'',
					token:''
				},
				identifys:[
					{img:'light_phone',title:'运营商验证认证',level:'L3',description:'验证当前用户的手机号和身份证号绑定情况',url:'oprator'},
					{img:'light_phone',title:'人像识别认证',level:'L4',description:'验证当前用户的身份证号是否和人脸信息比对正确',url:'person'},
					{img:'light_phone',title:'银行卡认证',level:'L5',description:'验证当前用户的银行卡是否和身份证号匹配',url:'bank'},
				],
				matchFlag:false,
				matchText:''
			}
		},
		onLoad(option){
			this.qrCodeFlowNum = option.qrCodeFlowNum;
			this.pageOption = {...option};
		},
		methods: {
			imageError: function(e) {
			            console.error('image发生error事件，携带值为' + e.detail.errMsg)
			        },
			getJwtToken(){
				uni.showLoading({
					title: '加载中',
					mask:true
				})
				let self = this;
				let aplatToken = uni.getStorageSync('appToken');
				
				this.aplatObj = JSON.parse(aplatToken);
       
					// rybObj.socialCode = '6251785189785789';
					 this.authLevel = this.aplatObj.socialCode?'L3':'L4';
					// this.authLevel = this.aplatObj?'L3':'contractSign';
					let qrCodeFlowNum = this.qrCodeFlowNum;
					getPersonOrEnterpriseInfo(self,{qrCodeFlowNum}).then((res)=>{
						this.readyShow = true;
						let code = res.code;
						if(code==200){
							this.formData = {...res.data}
							this.matchFlag = true;
							this.getDescription();
						}else{
							this.matchFlag = false;
							this.matchText = res.msg;
						}
					})
			},
			getDescription(){
				let self = this;
				getAuthProtocol(self,{...self.formData,...this.aplatObj,authLevel:'L4'}).then((res)=>{
					if(res.code==200){
						this.discripInfo = {...res.data};
					}
				});
			}
		},
		components:{MatchAccount,PageHead,PageTitle}
	}
</script>

<style lang="scss">
.identify {
			font-size: 28rpx;
			height: 100vh;
			background: #FFFCFC;
			.identify-title{
				background: #8DDDFA;
				text-align: center;
				display: flex;
				flex-direction: column;
				padding: 30px 0;
				image{
					width: 200rpx;
					height: 200rpx;
				}
				.identify-title-text{
					font-size: 32rpx;
				}
			}
			.identify-content{
				.identify-describe{
					line-height: 20px;
					padding: 20rpx 80rpx;
					.identify-describe-goal{
						text-indent:2em;
						padding-bottom: 20rpx;
					}
					.identify-describe-info{
						color: $uni-text-color-tip;
					}
				}
				.identify-content-card{
					height: 50px;
					.identify-content-card-img{
						line-height: 1;
						image{
							width: 80rpx;
							height: 50px;
						}
					}
					.identify-content-card-title{
						width: 300rpx;
						display: flex;
						justify-content: space-between;
					}
					.identify-content-card-text{
						color: $uni-color-primary;
						font-weight: 600;
					}
					.identify-content-card-description{
						color: $uni-text-color-disable;
					}
					.identify-content-card-btn{
						text-align: right;
						margin-top: 20rpx;
						.identify-content-card-btn-identify[type=primary]{
							background-color: $uni-color-primary;
							color: $uni-text-color-inverse;
						}
					}
				}
			}
				
		}
</style>

