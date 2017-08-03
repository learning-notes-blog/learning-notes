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

app.get('/api/add/artical',function(req,res){
	//const title = req.body.title.replace(/</g,'&lt;')
	//const content = req.body.content.replace(/</g,'&lt;')

	const artical = new ArticalModel({
		title:"aaa",
		content:'bbb',
		user:'cccc'
	})

	artical.save().then(function(art){
		console.log(art)
		res.send('ok')
	}).catch(function(err){
		console.log(err)
	})

})

app.get('/api/update/artical',function(req,res){
	//const title = req.body.title.replace(/</g,'&lt;')
	//const content = req.body.content.replace(/</g,'&lt;')

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