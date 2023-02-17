const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Categorys = new Schema({
    title: {type: String, maxLength: 100},
    slug: {type: String,  slug: "title", unique: true, }
});
  
  
module.exports = mongoose.model('categorys' , Categorys)
