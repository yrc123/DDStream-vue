import {createRouter, createWebHashHistory} from 'vue-router';
import MainView from '../views/main/index.vue'
import LoginView from '../views/login/index.vue'
import HelloWorld from '../components/main/HelloWorld.vue'

const routes = [
	{
		path: '/console',
		component: MainView,
		children: [
			{
				path: '',
				component: HelloWorld,
			}
		]
	},
	{
		path: '/login',
		component: LoginView
	},
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})
export default router