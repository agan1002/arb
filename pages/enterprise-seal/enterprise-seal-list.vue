<template>
	<view class="enterprise">
		<view class="enterprise-list">
			<page-title :imgTitle="'info'" :textTitle="'已申请印章'"></page-title>
			<view v-if="datas.length==0" class="enterprise-list-space">
				您还没有印章添加记录
			</view>
			<view class="" v-if="datas.length>0" v-for="(item,index) in datas" :key="index">
				<uni-card class="enterprise-list-card" v-for="(subItem,subIndex) in item.sealInfoVoList" :key="subIndex">
					<uni-row>
						<uni-col class="enterprise-list-card-img" :span="8">
							<image class="" :src="'data:image/png;base64,'+subItem.imageSrcBase64" mode=""></image>
						</uni-col>
						<uni-col class="enterprise-list-card-desc" :span="16">
							<uni-title type="h4" :title="item.enterpriseName"></uni-title>
							<view class="enterprise-list-card-content">
								<view>印章类型：{{subItem.alias}}</view>
								<view>申请时间：{{item.applyDate}}</view>
								<view>状态：<text class="enterprise-list-card-content-text"
										:style="{color:verifyResult(item.verifyResult)}">{{item.verifyResult|filterVerifyResult}}</text>
								</view>
								<view v-show="item.verifyResult===0">原因:{{item.verifyNote}}</view>
							</view>
						</uni-col>
					</uni-row>
				</uni-card>
			</view>
			
			<view class="" v-if="newDatas.sealInfos.length>0">
			<page-title :imgTitle="'info'" :textTitle="'待申请印章'"></page-title>
				<uni-card v-if="cardFlag" class="enterprise-list-card" v-for="(item,index) in newDatas.sealInfos" :key="index">
					<uni-row>
						<uni-col class="enterprise-list-card-img" :span="8">
							<image class="" :src="'data:image/png;base64,'+item.image" mode=""></image>
						</uni-col>
						<uni-col class="enterprise-list-card-desc" :span="16">
							<uni-title type="h4" :title="enterpriseName"></uni-title>
							<view class="enterprise-list-card-content">
								<view>印章类型：{{seals[index].alia}}</view>
								<view class="enterprise-list-card-content-btn">
									<view @click="editSeal(index)">修改</view>
									<view @click="delSeal(index)" class="enterprise-list-card-content-btn--del" type="default">删除</view>
								</view>
							</view>
						</uni-col>
					</uni-row>
				</uni-card>
			</view>
			
		</view>
		<view v-show="newDatas.sealInfos.length===0" class="enterprise-jump" hover-class="other-navigator-hover" @click="handleFlag">
			<uni-icons class="enterprise-jump-img" type="plus" size="60"></uni-icons>
			<view class="enterprise-jump-text">上传印章</view>
		</view>
		<view class="enterprise-btn">
			<button v-show="newDatas.sealInfos.length>0" class="enterprise-btn-ok" type="primary" plain="true" @click="submit">申请</button>
			<button v-show="newDatas.sealInfos.length==0" class="enterprise-btn-cancel"  plain="true" type="default">申请</button>
		</view>
	</view>
</template>

<script>
	import {getBase64Image,showTost} from '../../static/js/tool.js'
	import PageTitle from '@/components/page-title.vue';
	export default {
		name:'enterprise-seal-list',
		props:['pageOption','flag'],
		data() {
			return {
				
				cardFlag:true,
				datas: [],
				newDatas: {
					"operationType": "2",
					"requestId": "paperless4",
					"socialCreditCode": "",
					"idCardNo": "",
					"sealInfos": [],
					"applyId": ""
				},
				seals:[]
			}
		},
		created() {
				this.enterpriseName = this.pageOption.enterpriseName;
				this.newDatas.idCardNo = this.pageOption.idCardNo;
				this.newDatas.socialCreditCode = this.pageOption.socialCreditCode;
				this.getSealApplyList(this.newDatas.idCardNo,this.newDatas.socialCreditCode);
		},
		watch:{
			flag(val){
				if(val){
					let sealOption = uni.getStorageSync('sealOption');
					if(sealOption&&(sealOption.editNum||sealOption.editNum===0)){
						let image = getBase64Image(sealOption.image);
						this.newDatas.sealInfos[sealOption.editNum] = {order:this.newDatas.sealInfos[sealOption.editNum].order,"id": "",image,sealType:sealOption.sealType}
						
						this.seals[sealOption.editNum] = {alia:sealOption.alia,img:sealOption.image,sealType:sealOption.sealType};
						this.cardFlag = false;
						this.$nextTick(function(){this.cardFlag = true;})
					}else{
						let image = getBase64Image(sealOption.image);
						let order = Math.round(Math.random()*10000);
						this.newDatas.requestId = this.newDatas.socialCreditCode+order;
						this.newDatas.sealInfos.push({order,"id": "",image,sealType:sealOption.sealType});
						this.seals.push({alia:sealOption.alia,img:sealOption.image,sealType:sealOption.sealType});
					}
				}
			}
		},
		methods: {
			cancel() {
			},
			getSealApplyList(idCardNo,socialCreditCode) {
				this.req.getway({
					url: '/paperless/H5Interface/sealApplyList',
					data:{idCardNo,socialCreditCode}
				}).then(res => {
					this.datas = res.data||[];
				});
			}
			,handleFlag(){
				this.$emit('handleFlag',false);
			},
			editSeal(index){
				this.$emit('handleFlag',false);
				uni.setStorageSync("editSeal",{...this.seals[index],index});
			},
			delSeal(index){
				this.newDatas.sealInfos.splice(index,1);
				this.seals.splice(index,1);
			},
			submit(){
				let self = this;
				this.req.getway({
					url:'/paperless/H5Interface/sealApply',
					data:{...this.newDatas}
				}).then(res=>{
					let obj= res.data;
					if(res.code==200){
						Object.keys(obj).forEach(key=>{
							if(obj[key].indexOf('@')>-1){
                showTost({msg:obj[key].substring(1)||"上传印章失败",icon: 'error'});
							}else{
								this.newDatas.sealInfos.length = 0
                showTost({msg:"上传印章成功",icon: 'success'});
								self.getSealApplyList(self.newDatas.idCardNo,this.newDatas.socialCreditCode);
							}
						})
					}
				})
			},
			verifyResult(verifyResult){
				let colorStatus = (verifyResult===1||verifyResult===6||verifyResult===5)?'#4BE36C':'#ff0000'
				return colorStatus;
			}
		},
		filters:{
			filterVerifyResult(verifyResult){
				let result = '';
				switch (verifyResult){
					case 0:
						result = '审核不通过 ';
						break;
					case 1:
						result = '审核通过';
						break;
					case 2:
						result = '待制章';
						break;
					case 3:
						result = '待审核';
						break;
					case 4:
						result = '待授权';
						break;
					case 5:
						result = '已授权';
						break;
					case 6:
						result = '已制章处理';
						break;
				}
				return result;
			}
		},
		components:{
			PageTitle
		}
	}
</script>

<style lang="scss">
	.enterprise {
		padding:20rpx rpx;
			.enterprise-title {
				background-color: #B6D2FC;
				color: $uni-text-color-inverse;
				padding: 10px 30rpx;
			}
			
			.enterprise-list {
				.enterprise-list-space {
					text-align: center;
					font-size: 40rpx;
					padding: 50rpx;
				}
			
				.enterprise-list-card {
					background-color: $uni-bg-color-grey !important;
			
					.enterprise-list-card-img {
						// border: 1px solid red;
						text-align: center;
			
						image {
							width: 200rpx;
							height: 200rpx;
						}
					}
			
					.enterprise-list-card-desc {
						text-indent: 20rpx;
			
						.enterprise-list-card-content {
							font-size: 26rpx;
							line-height: 46rpx;
			
							.enterprise-list-card-content-text {
								font-weight: 600;
							}
			
							.enterprise-list-card-content-btn {
								display: flex;
								justify-content: space-between;
								color: $uni-color-primary;
								text-decoration: underline;
								width: 260rpx;
								font-size:32rpx;
								font-weight: 600;
							}
						}
					}
			
				}
			}
			
			.enterprise-jump {
				margin: 30rpx;
				background-color: $uni-bg-color-grey !important;
				display: flex;
				padding: 20rpx;
				// text-align: center;
				justify-content: center;
			
				.enterprise-jump-img {
					color: #7A88DE !important;
				}
			
				.enterprise-jump-text {
					line-height: 120rpx;
					color: #7A88DE !important;
					font-size: 36rpx;
					font-weight: 600;
				}
			}
			
			.enterprise-btn {
				text-align: center;
				padding: 20px 200rpx 30rpx;
			.enterprise-btn-cancel{
				@include plainBtn($uni-text-color-grey);
			}
				.enterprise-btn-ok {
					@include plainBtn($uni-text-color-success);
				}
			}
		
		
	}

	/* .enterprise-upload{
		margin: 30rpx;
		background-color: $uni-bg-color-grey!important;
		&:active{
			background-color: #FCE7EB!important;
		}
		text-align: center;
		.enterprise-upload-main{
			display: flex;
			justify-content: space-between;
			image{
				width: 150rpx;
				height: 150rpx;
			}
			.enterprise-upload-text{
				line-height: 150rpx;
				color: #7A88DE;
				font-weight: 600;
			}
		}
	} */
</style>
