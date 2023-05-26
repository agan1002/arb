<script>
	import vconsole from 'vconsole';
	export default {
		onLaunch: function(e) {
			// this.umengStaticFun();
			// if (e.query.debug) {
			// 	if (e.query.debug == 1 && !this.$vconsole) {
			// 		this.$vconsole = new vconsole()
			// 	}
			// }
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods:{
			umengStaticFun(){
				let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
				 list.forEach(item => {
				  //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
				  uni.addInterceptor(item, {
				   invoke(e) { 
				    // 调用前拦截
				    const {aplus_queue} = window;
						// console.log(aplus_queue)
				    aplus_queue.push({
				     action: 'aplus.sendPV',
				      arguments: [{
				          is_auto: false
				      }, {
				       source: uni.getStorageSync('source')
				      }]
				    });
				    return e;
				   },
				   fail(err) { // 失败回调拦截 
				    console.log(err);
				    if (Debug) {
				     console.log(err);
				     uni.showModal({
				      content: JSON.stringify(err),
				      showCancel: false
				     });
				    }
				   }
				  })
				 })
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */

	.uni-forms{
		
		/deep/.uni-forms-item{
			.is-disabled{
				background-color: #FFFFFF!important;
				color: $uni-text-color-disable;
			}
			.uni-forms-item__label{
				justify-content: flex-start !important;
				width: 160rpx!important;
			}
		}
	}
	.enterprise-form{
		// background:$uni-bg-color;
		// margin-bottom:30rpx;
		/deep/.uni-forms-item{
			border-bottom:1px solid $uni-bg-color-grey!important;
			.is-disabled{
				// background-color: #FFFFFF!important;
				color: $uni-text-color-placeholder;
			}
			.uni-forms-item__inner{
				padding: 0;
        margin: 0;
			}
			.uni-forms-item__label{
				width: 245rpx!important;
				// background-color: $uni-bg-color-grey!important;
			}
			.uni-easyinput__content{
				border: 0;
			}
      .uni-easyinput__content-textarea{
      height: auto;
      min-height: 40rpx!important;
      // max-height: 120rpx;
      // padding-bottom: 0;
      // padding-top: 0;
      color: red;
      word-break:break-all;
      // border: 1px saddlebrown solid;
        // overflow: hidden;
      // color: red;
      // text-overflow: ellipsis;
     word-wrap: break-word!important;
    
    // word-break: break-all;
      }
		}
		
	}
	.uni-popup__wrapper{
		max-width: 85vw;
		max-height: 80vh;
		width: 85vw;
		border-radius: 7px;
		.popup-preread-scroll{
			width: 100%;
			// border:1px solid blue;
			// height: 100%;
			.popup-preread{
				padding: 30rpx;
				// 
				.popup-preread-content{
					/* color:red;
					width: 100%;
					height: 100%; */
				}
				.popup-preread-tip{
					position:fixed;
					bottom:19.2vh;
					left:7.5vw;
					background:$uni-text-color-tip;
					opacity:0.9;
					border-top-right-radius:15rpx;
					border-bottom-right-radius:15rpx;
					padding:10rpx 30rpx;
					color:$uni-text-color-inverse;
				}
			}
			
		}
		
		
		.popup-preread-btn{
			margin: 20rpx 100rpx;
			.popup-preread-btn-text{
				color: $uni-color-primary;
				margin-right: 10rpx;
			}
			&[type=primary]{
				background-color: $uni-color-primary;
			}
		}
	}
	.enterprise-upload{
		.file-picker__box{
			width: 100%!important;
			.file-picker__box-content{
				border: 0!important;
			}
		}
	}
	.action-tip-dialog{
		// border:1px solid red;
		background-color:$uni-bg-color;
		padding:40rpx;
		border-radius:25rpx;
		text-align:center;
		.action-tip-dialog-title{
			color:$uni-text-color;
			font-size:36rpx;
			font-weight:600;
		}
		.action-tip-dialog-text{
			font-size:30rpx;
			color:$uni-text-color-placeholder;
			margin:30rpx 0;
		}
		.action-tip-dialog-btn{
			width:260rpx;
			height:70rpx;
			line-height:70rpx;
			background:$uni-text-color-tip;
		}
	}
	.enterprise-edit-upload{
		.file-picker__box{
			width: 100%!important;
			height: 300rpx!important;
			.file-picker__box-content{
				border: 0!important;
				justify-content: flex-start;
				align-items: flex-start;
				.enterprise-edit-upload-img{
					width: 160rpx;
					height: 160rpx;
				}
			}
		}
	}
</style>
