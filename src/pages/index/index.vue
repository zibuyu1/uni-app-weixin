<template>
	<view class="content">
		<image v-if="shareImage" style="width: 250px; height: 200px;" :src="shareImage" />
		<CanvasDrawer v-if="show" :painting="painting" @getImage="getImage" />
	</view>
</template>

<script>
import CanvasDrawer from '@/components/canvasdrawer/canvasdrawer';
import shareMixin from '@/mixins/share';
	export default {
		data() {
			return {
				show: true,
			}
		},
		mixins: [shareMixin],
		components: {
			CanvasDrawer
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
