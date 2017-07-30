<template>
	<div class="form">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="笔记标题">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="笔记内容">
				<el-input type="textarea" v-model="form.content"></el-input>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data(){
		return {
			form:{
				title:'',
				content:''
			}
		}
	}
}
</script>
<style scoped>
	.form{
		padding:60px 30px;
	}
</style>