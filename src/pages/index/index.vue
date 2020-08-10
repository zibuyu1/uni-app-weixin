<template>
	<view class="content">
		<image v-if="shareImage" style="width: 250px; height: 200px;" :src="shareImage" />
		<CanvasDrawer v-if="show" class="canvasdrawer" :painting="painting" @getImage="getImage" />
		<button @click="paintImage">生成图片</button>
		<button open-type="share">分享</button>
	</view>
</template>

<script>
import CanvasDrawer from '@/components/canvasdrawer/canvasdrawer.vue';
import shareMixin from '@/mixins/share';
const app = getApp();
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
		if (app.globalData.loginLoading) {
      this.getUserLoginInfo();
    } else {
      app.globalData.callbackEvent = () => {
        this.getUserLoginInfo();
      }
    }
	},
	onShareAppMessage(ops) {
		return {
			title: '这是我的名片，请惠存！',
			path: '/pages/index/index', // 路径，传递参数到指定页面。
			imageUrl: this.shareImage, // 分享的封面图
		};
	},
	methods: {
		getUserLoginInfo() {
			// 这里调用接口
		}
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
