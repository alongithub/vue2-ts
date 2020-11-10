import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/layout/index.vue";
import store from '@/store';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
	{
		path: "/login",
		name: "login",
		component: () => import(/* webpackChunkName: 'login' */ "@/views/login/index.vue")
	},
	{
		path: "/",
		component: Layout,
		meta: {
			requiresAuth: true // 直接加在layout上就不用了在子路由组件上添加meta标签了。
		},
		children: [
			{
				path: "", // 默认子路由
				name: "home",
				component: () => import(/* webpackChunkName: 'home' */ "@/views/home/index.vue"),
				// 路由元信息，在路由守卫（拦截时）可以用来做判断，
				// 比如这里用自定义属性，requiresAuth,来区分哪些页面访问必须要登录
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/role",
				name: "role",
				// 懒加载模块，单独打包，webpackChunkName 可以手动配置打包后的文件名字，方便调试
				component: () => import(/* webpackChunkName: 'role' */ "@/views/role/index.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/menu",
				name: "menu",
				component: () => import(/* webpackChunkName: 'menu' */ "@/views/menu/index.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/resource",
				name: "resource",
				component: () => import(/* webpackChunkName: 'resource' */ "@/views/resource/index.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/course",
				name: "course",
				component: () => import(/* webpackChunkName: 'course' */ "@/views/course/index.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/user",
				name: "user",
				component: () => import(/* webpackChunkName: 'user' */ "@/views/user/index.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/advert",
				name: "advert",
				component: () => import(/* webpackChunkName: 'advert' */ "@/views/advert/index.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/advert-space",
				name: "advert-space",
				component: () => import(/* webpackChunkName: 'advert-space' */ "@/views/advert-space/index.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/menu/create",
				name: "menu-create",
				component: () => import(/* webpackChunkName: 'menu-create-edit' */ "@/views/menu/create.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/menu/edit/:id",
				name: "menu-edit",
				component: () => import(/* webpackChunkName: 'menu-create-edit' */ "@/views/menu/edit.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/role/alloc-menu/:roleId",
				name: "alloc-menu",
				component: () => import(/* webpackChunkName: 'alloc-menu' */ "@/views/role/alloc-menu.vue"),
				meta: {
					requiresAuth: true
				},
				props: true
			},
			{
				path: "/role/alloc-resource/:roleId",
				name: "alloc-resource",
				component: () => import(/* webpackChunkName: 'alloc-resource' */ "@/views/role/alloc-resource.vue"),
				meta: {
					requiresAuth: true
				},
				props: true
			},
			{
				path: "/course/create",
				name: "course-create",
				component: () => import(/* webpackChunkName: 'course-create' */ "@/views/course/create.vue"),
				meta: {
					requiresAuth: true
				}
			},
			{
				path: "/course/edit/:courseId",
				name: "course-edit",
				component: () => import(/* webpackChunkName: 'course-edit' */ "@/views/course/edit.vue"),
				meta: {
					requiresAuth: true
				},
				props: true
			},
			{
				path: "/course/section/:courseId",
				name: "course-section",
				component: () => import(/* webpackChunkName: 'course-section' */ "@/views/course/section.vue"),
				meta: {
					requiresAuth: true
				},
				props: true
			},
			{
				path: "/course/video/:courseId",
				name: "course-video",
				component: () => import(/* webpackChunkName: 'course-video' */ "@/views/course/video.vue"),
				meta: {
					requiresAuth: true
				},
				props: true
			}
		]
	},
	{
		path: "*",
		name: "404",
		component: () => import(/* webpackChunkName: '404' */ "@/views/error-page/404.vue")
	}
];

const router = new VueRouter({
	routes
});

router.beforeEach((to, from, next) => {
	// to.matched 中保存了要去的页面的父路由和子路由（所有的嵌套路由），只要有一个嵌套路由需要用户登录，那么这个界面就需要用户登录
	// record.meta保存了配置路由规则时meta里自定义的属性
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!store.state.user) {
			// 没有用户状态跳转到登录页面
			next({
				name: 'login',
				query: {
					// 如果用户在某个页面登录状态失效，导致跳转到登录页，希望登录后能返回之前操作的界面，
					// redirect是我自定义的字段，这个时候在login界面的路由上会考到?redirect=[to.fullPath]的信息
					redirect: to.fullPath
				}
			});
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
