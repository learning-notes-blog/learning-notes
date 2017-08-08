<template>
	<div class="header">
		<el-menu theme="lingt" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			<el-menu-item index="/add">添加笔记</el-menu-item>
			<el-menu-item index="/list">笔记列表</el-menu-item>
			<el-menu-item class="fr" index="/signIn">登录</el-menu-item>
			<el-menu-item class="fr" index="/signUp">注册</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
export default {
 	data(){
 		return {
 			activeIndex: '/add'
 		}
 	},
 	methods:{
 		handleSelect(key,keypath){
 			this.$router.push({path:key})
 		}
 	}
}
</script>

<style lang="scss" scoped>
	.header{	
		.fr{
			float:right;
		}
	}
</style>