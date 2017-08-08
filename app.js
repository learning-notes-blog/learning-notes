const express = require('express')
const ArticalModel = require('./db/model/artical')
const mongoose = require('mongoose')
mongoose.promise = require('bluebird')
const bodyParser = require('body-parser')
const app = express()
const port = 11111

mongoose.connect('mongodb://127.0.0.1/artical',{useMongoClient:true})
app.listen(port)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true ,limit:1000000}))

app.post('/api/add/artical',function(req,res){
	let title = req.body.title
	let content = req.body.content
	const user = req.body.user || 'mdh'
	const regExp = /<|>/g
	function replace(str){
		if(str == '<'){
			return '&lt;'
		}else if(str == '>'){
			return '&gt;'
		}
	}
	if(!title){
		return res.send({msg:'title is required',code:1})
	}
	if(!content){
		return res.send({msg:'content is required',code:1})
	}

	title = title.replace(regExp, replace)
	content = content.replace(regExp, replace)
	ArticalModel.findByTitle(title,function(err,art){
		if(err){
			return res.send({msg:err,code:1})
		}

		if(art){
			return res.send({msg:'文章标题已存在',code: 1})
		}

		new ArticalModel({
			title: title,
			content: content,
			user: user
		}).save().then(function(art){
			console.log(art)
			res.send({msg:'ok',code:0})
		}).catch(function(err){
			console.log(err)
			res.send({msg:err, code:1})
		})
	})
})

app.post('/api/update/artical',function(req,res){
	const title = req.body.title.replace(/</g,'&lt;')
	const content = req.body.content.replace(/</g,'&lt;')

	ArticalModel.findOne({title:"aaa"}).then(function(art){
		if(art){
			art.update({
				title:"aaa2",
				content:'bbb2',
				user:'mdh'
			}).then(function(raw,art){
				console.log(raw,art)
				res.send({msg:'更新成功',code:0})
			}).catch(function(err){
				console.log('err'+err)
			})
		}else{
			res.send({msg:'没有这篇文章，无法更新',code:1})
		}
	}).catch(function(err){
		console.log(err)
	})
})