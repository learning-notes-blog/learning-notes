<template>
	<ul class="list">
		<li v-for="(artical , index ) in articals" @click="articalDetail(artical._id)">
			<span>{{index+1}}</span>
			<span class="title">{{artical.title}}</span>
			<span class="time">{{artical.time}}</span>
			<span class="author">{{artical.author?artical.author:'mdh'}}</span>
		</li>
	</ul>
</template>

<script>
import axios from "axios"
export default {
 	data(){
 		return {
 			articals:[{
 				title:"titletitletitle",
 				time:"2017-08-09",
 				author:"author",
 				id:"id"
 			},{
 				title:"titletitletitletitletitletitletitletitletitle",
 				time:"2017-08-09",
 				author:"author",
 				id:"id"
 			}]
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
