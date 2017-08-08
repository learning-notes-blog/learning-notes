<template>
	<div class="form">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="笔记标题">
				<el-input v-model="title"></el-input>
			</el-form-item>
			<el-form-item label="笔记内容" class="editor">
				<mavon-editor style="height: 100%"
					@save="save"
					v-model='content'
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
			},
			title:'',
			content:''
		}
	},
	components: {
        mavonEditor
    },
    methods:{
    	save(value, render){
            const _this = this
            render = render.trim()
    		const title = this.title.trim()
            if(!title){
                this.$message.error({
                    type:'error',
                    message:'标题为空',
                    showClose: false,
                    duration: 2000
                })
                return
            }
            if(!render){
                this.$message({
                    type:'error',
                    message:'笔记内容为空',
                    showClose: false,
                    duration: 2000
                })
                return
            }
            
    		axios.post('/api/add/artical',{
    			title: title,
    			content: render
    		}).then(function(res){
    			console.log(res.data)
    			const data = res.data.data
    			if(data.code !== 0 ){
                    this.$message({
                        type:'error',
                        message:'保存失败，修改后，请重新尝试',
                        showClose: false,
                        duration: 2000
                    })
                }
    			this.$message({
                    type:'success',
                    message:'保存成功',
                    showClose: false,
                    duration: 2000,
                    onClose:function(){
                        _this.title = ''
                        _this.content = ''
                    }
                })
    			
    		}).catch(function(err){
    			this.$message({
                    type:'error',
                    message: err,
                    showClose: false,
                    duration: 2000
                })
    		})
    	},
    	change(value, render){
    	}
    }
}
</script>
<style>
	.form{
		padding:60px 30px;
	}
    .editor .el-form-item__content{
        height: 500px;
    }
</style>