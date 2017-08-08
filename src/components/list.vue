<template>
 	<div class="list">
 		<ul>
 			<li v-for="artical in articals">
 				<span>{{artical.title}}</span>
 				<span>{{artical.time}}</span>
 				<span>{{artical.author}}</span>
 				<span>{{artical.id}}</span>
 			</li>
 		</ul>
 	</div>
</template>

<script>
export default {
 	data(){
 		return {
 			articals:[{
 				title:"title",
 				time:"time",
 				author:"author",
 				id:"id"
 			}]
 		}
 	}
}
</script>

<style scoped>

</style>
