import {createRouter, createWebHashHistory} from 'vue-router';
import MainView from 'views/main/index.vue'
import AuthView from 'views/auth/index.vue'
import UserView from 'views/users/user/index.vue'
import RoleView from 'views/users/role/index.vue'
import SafeView from 'views/safe/index.vue'
import SettingView from 'views/setting/index.vue'
import ServerCardView from 'views/serverInfo/index.vue'
import HelloWorld from 'components/main/HelloWorld.vue'

const paths = {
	console: "/console",
	user: "users",
	role: "roles",
	servers: "servers",
	setting: "setting",
	auth: "/auth",
	safe: "/safe",
}
const routes = [
	{
		path: paths.console,
		component: MainView,
		children: [
			{
				path: '',
				component: HelloWorld,
			},
			{
				path: paths.servers,
				component: ServerCardView,
			},
			{
				path: paths.user,
				component: UserView
			},
			{
				path: paths.role,
				component: RoleView
			},
			{
				path: paths.setting,
				component: SettingView 
			},
		]
	},
	{
		path: paths.auth,
		component: AuthView,
	},
	{
		path: paths.safe,
		component: SafeView,
	},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
export {
	paths,
	router
}