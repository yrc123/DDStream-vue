import {createRouter, createWebHashHistory} from 'vue-router';
import MainView from 'views/main/index.vue'
import AuthView from 'views/auth/index.vue'
import UserView from 'views/users/user/index.vue'
import RoleView from 'views/users/role/index.vue'
import SafeView from 'views/safe/index.vue'
import LinkView from 'views/link/index.vue'
import LinkEditView from 'views/link/LinkEdit.vue'
import SettingView from 'views/setting/index.vue'
import ServerCardView from 'views/serverInfo/index.vue'
import HelloWorld from 'components/main/HelloWorld.vue'

const routes = [
	{
		path: "/console",
		component: MainView,
		children: [
			{
				name: 'main',
				path: '',
				component: HelloWorld,
			},
			{
				name: 'servers',
				path: 'servers',
				component: ServerCardView,
			},
			{
				name: 'users',
				path: 'users',
				component: UserView
			},
			{
				name: 'roles',
				path: 'roles',
				component: RoleView
			},
			{
				name: 'links',
				path: 'links',
				component: LinkView 
			},
			{
				name: 'setting',
				path: 'setting',
				component: SettingView 
			},
			{
				name: 'linksAdd',
				path: 'links/add',
				component: LinkEditView,
			},
			{
				name: 'linksEdit',
				path: 'links/:id',
				component: LinkEditView,
			},
		]
	},
	{
		name: 'auth',
		path: '/auth',
		component: AuthView,
	},
	{
		name: 'safe',
		path: '/safe',
		component: SafeView,
	},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
export default router
export {
	router
}