const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticalSchema = new Schema({
	title:String,
	content: String,
	user:String,
	meta:{
		created:{
			type:Number,
			default: Date.now()
		},
		updated:{
			type:Number,
			default: Date.now()
		}
	}
})

ArticalSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.updated = this.meta.created = Date.now()
	}else{
		this.meta.updated = Date.now()
	}
	next()
})

ArticalSchema.pre('update',function(next){
	this.meta.updated = Date.now()
	next()
})

module.exports = ArticalSchema