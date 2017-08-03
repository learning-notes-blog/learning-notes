<template>
	<div class="form">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="笔记标题">
				<el-input v-model="form.title"></el-input>
			</el-form-item>
			<el-form-item label="笔记内容">
				<mavon-editor style="height: 100%"
					@save="save"
					v-model='form.value'
					@change="change">
					</mavon-editor>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "axios"
export default {
	data(){
		return {
			form:{
				title:'',
				value:''
			}
		}
	},
	components: {
        mavonEditor
    },
    methods:{
    	save(value, render){
    		console.log(this.form.value)
    	},
    	change(value, render){
    		console.log("value:" , value)
    		console.log("\n")
    		console.log("render" , render)
    		console.log("\n")
    		console.log(render.replace(/</g,'&lt;'))
    	}
    }
}
</script>
<style scoped>
	.form{
		padding:60px 30px;
	}

</style>