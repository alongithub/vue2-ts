/*
 * @Description: 前端打包文件测试服务，负责接口代理
 * @Author: sunwenlong
 * @Date: 2020-11-10 11:48:43
 * @LastEditors: sunwenlong
 * @LastEditTime: 2020-11-10 22:16:48
 */
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 托管 dist 目录
app.use('/vdist', express.static(path.join(__dirname, '../dist')));

// 转发代理接口
app.use('/front', createProxyMiddleware({
	target: "http://edufront.lagou.com",
	changeOrigin: true // 设置请求头中的 host 为 target，防止后端反向代理服务器无法 识别
}));
app.use('/boss', createProxyMiddleware({
	target: "http://eduboss.lagou.com",
	changeOrigin: true
}));

app.listen(3000, () => {
	console.clear()
	
	console.log('success 3000 !!!');
});
