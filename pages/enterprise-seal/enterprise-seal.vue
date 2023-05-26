<template>
	<view class="">
		<page-head :steps="steps" :active="3"></page-head>
		<scroll-view scroll-y="true" >
			<view class="content" v-show="flag">
				<EnterpriseSealList :pageOption="pageOption" :flag="flag" @handleFlag="handleFlag"></EnterpriseSealList>
			</view>
			<view class="content" v-show="!flag">
				<EnterpriseSealEdit @handleFlag="handleFlag" :flag="flag"></EnterpriseSealEdit>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getBase64Image} from '../../static/js/tool.js'
	import PageHead from '@/components/page-head.vue';
	import EnterpriseSealList from './enterprise-seal-list.vue'
	import EnterpriseSealEdit from './enterprise-seal-edit.vue'
	export default {
		data() {
			return {
				steps:[{title: '确认信息'}, {title: '身份认证'}, {title: '企业信息'}, {title: '电子印章'}, {title: '完成'}],
				flag:true,
				pageOption:{},
				sealOption:{}
			}
		},
		onLoad(option) {
			this.pageOption = {...option};
		},
		onUnload(){
			uni.removeStorageSync('sealOption');
		},
		methods:{
			handleFlag(flag){
				this.flag = flag;
			}
		},
		components:{
			PageHead,EnterpriseSealList,EnterpriseSealEdit
		}
	}
</script>
<style lang="scss">
	.content{
		height:83vh;
	}
</style>