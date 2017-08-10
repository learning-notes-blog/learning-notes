<template>
	<ul class="list">
		<li v-for="(artical , index ) in articals" @click="articalDetail(artical._id)">
			<span>{{index+1}}</span>
			<span class="title" v-html="artical.title"></span>
			<span class="time">{{artical.time}}</span>
			<span class="author">{{artical.author?artical.author:'mdh'}}</span>
			<div class="fr">
				<el-button type="primary" icon="edit" @click.stop="edit(artical._id)"></el-button>
				<el-button type="primary" icon="delete" @click.stop="toDelete(index, artical._id)"></el-button>
			</div>
		</li>
	</ul>
</template>

<script>
import axios from "axios"
export default {
 	data(){
 		return {
 			articals:[]
 		}
 	},
 	created(){
 		const _this = this
 		axios.get('/api/list')
 			.then((data) => {
 				const res = data.data
 				console.log(res)
 				if(res.code !==0){
 					_this.$message({
 						type:'error',
 						massage:'加载列表失败，请刷新页面',
 						showClose: false,
                    	duration: 2000
 					})
 					return
 				}
 				_this.articals = res.data
 			})
 			.catch((err) => {
 				_this.$message({
					type:'error',
					massage:err,
					showClose: false,
            		duration: 2000
				})
 			})
 	},
 	methods:{
 		articalDetail(id){
 			this.$router.push({path:'detail',query:{id:id}})
 		},
 		edit(id){
 			this.$router.push({path:'add',query:{id:id}})
 		},
 		toDelete(index,id){
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				return axios.get('/api/delete/'+id)
			}).then((data)=>{
				const res = data.data
				if(res.code !== 0){
					this.$message({
						type: 'error',
						message: '删除失败，请重新尝试'
					})
					return
				}
				this.$message({
					type: 'success',
					message: '删除成功!',
					duration:1000
				})	
				this.articals.splice(index,1)
			}).catch((err) => {
				console.log(err)
				this.$message({
					type: 'info',
					message: '已取消删除'
				});          
			});
 		}
 	}
}
</script>

<style lang="scss" scoped> 
	.list{
		margin:40px;
		font-size: 16px;
		li {
			margin-top:20px;
			cursor: pointer;
			span:nth-child(1){
				padding:3px 6px 2px 6px;
				background:#2fffff;
			}
		}
		.time,
		.title,
		.author{
			padding-left:20px;
		}
	}
</style>
