import {createRouter, createWebHashHistory} from 'vue-router';
import MainView from 'views/main/index.vue'
import LoginView from 'views/login/index.vue'
import HelloWorld from 'components/main/HelloWorld.vue'

const paths = {
	console: "/console",
	login: "/login"
}
const routes = [
	{
		path: paths.console,
		component: MainView,
		children: [
			{
				path: '',
				component: HelloWorld,
			}
		]
	},
	{
		path: paths.login,
		component: LoginView
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