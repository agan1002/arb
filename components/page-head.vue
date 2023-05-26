<template>
	<view class="head">
		<uni-steps :options="steps" :active="active"></uni-steps>
	</view>
</template>
<script>
	export default {
		name:"page-head",
		props:['steps','active']
	}
</script>

<style lang="scss">
	.head{
		background:url('../static/imgs/bg_head.png');
		background-size: cover;
		height:13vh;
		display:flex;
		align-items:center;
	}
</style>
