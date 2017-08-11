<template>
	<div class="form">
		<el-form label-width="80px">
			<el-form-item label="笔记标题">
				<el-input v-model="title"></el-input>
			</el-form-item>
			<el-form-item label="笔记内容" class="editor">
				<mavon-editor ref="editor" style="height: 100%"
					@save="save"
					v-model='value'>
					</mavon-editor>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
//@imgAdd="imgAdd"
//@imgDel="imgDel"
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from "axios"
export default {
	data(){
		return {
			title:'',
			value:'',
            id:''
		}
	},
	components: {
        mavonEditor
    },
    created(){
        this.id = this.$route.query.id
        if(this.id){
            axios.get('/api/edit/'+this.id)
                .then((data)=>{
                    const res = data.data
                    if(res.code !==0){
                        return 
                    }
                    this.title = res.data.title
                    this.value = res.data.value
                }).catch((err)=>{
                    console.log(err)
                })
        }
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
    			render: render,
                value: value,
                id: this.id
    		}).then((data) => {
                const res = data.data
    			if(res.code !== 0 ){
                    this.$message({
                        type:'error',
                        message: data.msg,
                        showClose: false,
                        duration: 2000
                    })
                    return
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
    		}).catch((err) => {
    			this.$message({
                    type:'error',
                    message: err,
                    showClose: false,
                    duration: 2000
                })
    		})
    	},
    	imgAdd(index, file){
            console.log('add: ',index)

            console.log('\n', file)

            this.$refs.editor.$imgAddByUrl(index,'https://work.pre.gomeplus.com/statics/css/img/download/logo.png')
    	},
        imgDel(index){
            console.log('del: ', index)
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
        text-align: center;
    }
    .editor .loading{
        font-size: 40px;
        margin-top: 105px;
        color: #8492a6;
    }
</style>