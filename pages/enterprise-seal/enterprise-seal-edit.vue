<template>
	<view class="enterprise">
	
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						印章类型
					</view>
					<view class="uni-list-cell-db enterprise-select">
						<picker v-if="sealTypes.length>0" mode="selector" selector-type="select" @change="bindPickerChange" :value="index"
							:range="sealTypes.map(item=>item.alias)">
							<view class="enterprise-select-picker">
								<view class="uni-input">{{(sealTypes.filter(item=>item.code===index)[0].alias)}}</view>
								<uni-icons type="arrowdown" size="20"></uni-icons>
							</view>
						</picker>
					</view>
				</view>
				<view class="uni-list-cell">
					<view class="uni-list-cell-left">
						上传印章图片
					</view>
					<view class="uni-list-cell-db enterprise-edit-upload">
						<uni-file-picker v-if="fileFlag" ref="upImg" file-extname="png,jpg" :disable-preview="true" fileMediatype="image" v-model="imageValue" :del-icon="false" return-type="object"
						@select="select" @progress="progress" @success="success" @fail="fail">
							<view class="enterprise-edit-upload-img">
								<image class="enterprise-edit-upload-img" src="../../static/imgs/upload.png" mode="aspectFit"></image>
							</view>
						</uni-file-picker>
					</view>
				</view>
			</view>
			<view class="enterprise-describe">
				<view class="">
					上传文件为png,jpg格式，请用实体印章盖到白纸上
				</view>
				<view class="">
					图片大小请不要超过2M
				</view>
				<view class="">印章必须是红色且清晰的</view>
				<view class="">示例如下</view>
				<view class="enterprise-describe-img">
					<image src="../../static/imgs/bank.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="enterprise-btn">
				<button v-show="imgBase.length==0" plain="true" class="enterprise-btn-cancel" type="primary">确认</button>
				<button v-show="imgBase.length>0" plain="true" class="enterprise-btn-ok" type="primary" @click="submit">确认</button>
			</view>
</view>
</template>

<script>
	import {showTost} from '../../static/js/tool.js';

	export default {
		name:'enterprise-seal-edit',
		props:['order','flag'],
		data() {
			return {
				imageValue: {},
				sealTypes: [],
				index: null,
				imgBase:'',
				index:1,
				alia:'',
				editNum:null,
				fileFlag:true
			}
		},
		created() {
			
		},
		watch:{
			flag(val){
				if(!val){
					if(this.sealTypes.length>0){
						let sealItem = uni.getStorageSync("editSeal");
						if(sealItem){
							this.fileFlag = false;
							this.$nextTick(function(){
								this.fileFlag = true;
								this.imageValue={"url":sealItem.img,"path":sealItem.img}
								uni.removeStorageSync("editSeal");
								this.imgBase = sealItem.img;
								this.index = sealItem.sealType;
								this.alia = sealItem.alia;
								this.editNum = sealItem.index;
							})
						}else{
							this.initSeal();
						}
					}else{
						this.getSealType();
					}
				}
				
			}
		},
		methods: {
			cancel() {
			},
			bindPickerChange: function(e) {
				this.index = this.sealTypes[e.target.value].code;
				this.alia = this.sealTypes[e.target.value].alias;
			},
			select(e){
				let img = e.tempFiles[0];
				if(img.size>2*1024*1024){
          showTost({msg:"上传的图片大小不超过2M",icon: 'error'});
					img.path = '';
					this.imgBase = '';
					return
				}else{
					this.imgBase = img.path;
				}
				
			},
			// 获取上传进度
			progress(e){
					console.log('上传进度：',e)
			},

			// 上传成功
			success(e){
					console.log('上传成功',e)
			},

			// 上传失败
			
			fail(e){
					console.log('上传失败：',e)
			},
			submit(){
				if(this.imgBase.length>0){
					let sealOption = uni.getStorageSync('sealOption');
					if(this.editNum||this.editNum===0){
						uni.setStorageSync('sealOption',{image:this.imgBase,sealType:this.index,alia:this.alia,editNum:this.editNum});
						this.editNum = null;
					}else{
						uni.setStorageSync('sealOption',{image:this.imgBase,sealType:this.index,alia:this.alia});
					}
					 this.$emit("handleFlag",true);
				}else{
					showTost({msg:"请重新上传印章图片"});
				}
				
			},
			getSealType(){
				this.req.getway({
					url:'/paperless/H5Interface/getSealType',
					data:{}
				}).then(res=>{
					this.sealTypes = res.data||[];
					this.initSeal();
				})
			},
			initSeal(){
				this.index = this.sealTypes[0].code;
				this.alia = this.sealTypes[0].alias;
				this.$refs.upImg.clearFiles();
			}
		}
	}
</script>

<style lang="scss">
	.enterprise {
				.uni-list {
					margin: 0 40rpx;
					.uni-list-cell {
						margin-top: 30rpx;
						display: flex;
						justify-content: flex-start;
						.uni-list-cell-left {
							width: 260rpx;
							padding: 20rpx 0 !important;
						}
			
						.uni-list-cell-db {
							width: 400rpx;
							&.enterprise-select {
								padding-top: 20rpx !important;
								border: 1rpx solid $uni-border-color;
								border-radius: 7px;
			
								.enterprise-select-picker {
									display: flex;
									justify-content: space-between;
									padding: 0 20rpx;
								}
							}
							.enterprise-edit-upload {
								&:active {
									background-color: #FCE7EB !important;
								}
							}
						}
					}
				}
				.enterprise-describe{
					margin: 0 40rpx;
					color: $uni-text-color-disable;
					.enterprise-describe-img{
						border: 1px solid $uni-border-color;
						margin: 10rpx 40rpx;
						text-align: center;
						image{
							width: 300rpx;
							height: 300rpx;
						}
					}
				}
			.enterprise-btn{
				text-align: center;
				padding: 20px 200rpx;
				.enterprise-btn-ok{
					@include plainBtn($uni-text-color-success);
				}
				.enterprise-btn-cancel{
					@include plainBtn($uni-text-color-grey);
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
