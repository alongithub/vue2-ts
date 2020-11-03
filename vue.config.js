module.exports = {
	css: {
		loaderOptions: {
			scss: {
				// scss 加载是自动注入这行代码
				prependData: "@import \"~@/styles/variables.scss\";"
			}
		}
	},
	devServer: {
		proxy: {
			"/front": {
				target: "http://edufront.lagou.com",
				changeOrigin: true // 设置请求头中的 host 为 target，防止后端反向代理服务器无法 识别
			},
			"/boss": {
				target: "http://eduboss.lagou.com",
				changeOrigin: true
			}
		}
	}
};
