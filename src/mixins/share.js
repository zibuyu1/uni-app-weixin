export default {
  data() {
    return {
      shareImage: '', // 分享图片
      painting: null, // 分享参数
    }
  },
  methods: {
    /** 绘制图片 */
    paintImage() {
      // 图片已经绘制了无需再绘制，如果需要重新绘制，重置shareImage
      if (this.shareImage) {
        return;
      }
      uni.showLoading({
				title: '分享图片绘制中',
				mask: true
      });
      // 我这里绘制的是分享的图片，分享图片的比例为5:4
      this.painting = {
				width: 250,
				height: 200,
				clear: true,
				timestamp: new Date().getTime(), // 这里加了个时间戳，是防止重新绘制时没有检测到参数变化
				views: [
					{
            type: 'image',
            url: 'share-personal.png',
						top: 0,
						left: 0,
						width: 250,
						height: 200
          },
          {
						type: 'image',
						url: 'img_touxiang.png',
						top: 20,
						left: 200,
						width: 30,
            height: 30,
            borderRadius: 15,
					},
          {
						type: 'text',
						content: '昵称',
						fontSize: 14,
						color: '#353535',
						textAlign: 'left',
						top: 30,
            left: 20,
            width: 160,
            lineHeight: 18,
						MaxLineNumber: 1,
            breakWord: true,
            bolder: true
          },
          {
						type: 'text',
						content: '公司信息',
						fontSize: 14,
						color: '#353535',
						textAlign: 'left',
						top: 60,
            left: 20,
            width: 200,
            lineHeight: 18,
						MaxLineNumber: 2,
            breakWord: true,
            bolder: false
					},
          {
						type: 'text',
						content: '职位信息',
						fontSize: 14,
						color: '#353535',
						textAlign: 'left',
						top: 100,
            left: 20,
            width: 200,
            lineHeight: 18,
						MaxLineNumber: 2,
            breakWord: true,
            bolder: false
					},
				]
			};
    },
    /** 图片绘制完成 */
    getImage() {
      uni.hideLoading();
			const { tempFilePath, errMsg } = event;
			if (errMsg === 'canvasdrawer:ok') {
        this.shareImage = tempFilePath;
			} else {
        // 绘制失败重新绘制
        uni.showToast({
					title: '绘制失败，请重新绘制',
					icon: 'none',
					duration: 3000
				});
        this.shareImage = '';
				this.painting = null;
			}
    }
  }
}