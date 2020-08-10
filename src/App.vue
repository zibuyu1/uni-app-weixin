<script>
let flag = false;
export default {
	globalData: {
		loginLoading: false, // 是否加载完成
		callbackEvent: null, // 回调函数
	},
  onLaunch: function () {
		// 启动小程序，是否存在登录cookie
		// 1、存在，校验登录是否过期，过期继续调用uni.login重新登录
		// 2、不存在，调用uni.login登录
		const cookieName = this.$cache.get(urls.cookieName);
		this.globalData.loginLoading = false;
		if (cookieName) {
			this.getCheckLogin();
		} else {
			this.uniLogin();
		}
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
		uniLogin() {
      if (!flag) {
        flag = true;
        uni.login({
          provider: "weixin",
          success: loginRes => {
            const code = loginRes.code;
            this.setAuthLogin(code);
          },
          complete: res => {
          	flag = false;
          }
        });
      }
    },
    setAuthLogin(code) {
      const params = {
        code,
      };
      this.$minApi
        .authLogin(params)
        .then((res) => {
					const bizCode = res.data.rspResult.bizCode;
          if (bizCode === 200) {
            const token = res.header["Set-Cookie"];
            this.$util.header.cookie = token || "";
						this.$cache.set(urls.cookieName, token, 0); // 存储到本地
						this.globalData.loginLoading = true;
						if (this.globalData.callbackEvent) {
              this.globalData.callbackEvent();
            }
          } else if (bizCode === 14005) {
            this.uniLogin();
          } else {
            uni.showToast({
              title: res.data.rspResult.message,
              icon: "none",
              duration: 3000,
            });
          }
        })
        .catch((err) => {
					
        });
		},
		/** 校验cookie是否过期 */
		getCheckLogin() {
			this.$minApi
        .checkLogin(params)
        .then((res) => {
          const bizCode = res.data.rspResult.bizCode;
          if (bizCode === 200) {
						this.globalData.loginLoading = true;
						if (this.globalData.callbackEvent) {
              this.globalData.callbackEvent();
            }
            console.log('未过期')
          } else if (bizCode === 14001 || bizCode === 401) {
            this.uniLogin();
          }
        })
        .catch((err) => {
					
        });
		}
  },
};
</script>

<style>
/*每个页面公共css */
</style>
