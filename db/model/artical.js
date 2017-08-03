const mongoose = require('mongoose')
const ArticalShema = require('../schema/artical')

const ArticalModel = mongoose.model('artical', ArticalShema)

module.exports = ArticalModel