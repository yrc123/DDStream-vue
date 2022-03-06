import {createRouter, createWebHashHistory} from 'vue-router';
import MainView from 'views/main/index.vue'
import LoginView from 'views/login/index.vue'
import UserView from 'views/user/index.vue'
import ServerCardView from 'views/serverInfo/index.vue'
import HelloWorld from 'components/main/HelloWorld.vue'

const paths = {
	console: "/console",
	login: "/login",
	user: "/user/:userId",
	servers: "servers"
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
			}
		]
	},
	{
		path: paths.login,
		component: LoginView
	},
	{
		path: paths.user,
		component: UserView
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