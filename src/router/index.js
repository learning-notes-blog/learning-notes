import Vue from 'vue'
import Router from 'vue-router'
import Add from '@/components/add'
import List from '@/components/list'
import Detail from '@/components/detail'

Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
		{
			path: '/',
			component: Add
		},
		{
			path: '/add',
			component: Add
		},
		{
			path: '/list',
			component: List
		},
		{
			path: '/detail',
			component: Detail
		}
	]
})
