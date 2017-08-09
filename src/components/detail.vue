<template>
 	<div>
 		<h1 class="title">{{title}}</h1>
 		<div class="artical-content">
 			{{content}}
 		</div>
 	</div>
</template>

<script>
import axios from "axios"
export default {
	data(){
		return {
			title:"",
			content:""
		}
	},
	created(){
		const id = this.$route.query.id
		axios.get('/api/detail/'+id).then((data)=>{
			const res = data.data
			if(res.code !== 0){

			}
			this.title = res.data.title
			this.content = res.data.content
		}).catch((err) => {
			console.log(err)
		})
	}
}
</script>

<style lang="scss" scoped>
.title{
	margin-top:20px;
	text-align:center;
}
.artical-content{
	padding:20px 40px;
}
</style>
