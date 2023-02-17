const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const animationFlim = new Schema({
    name: {type: String, maxLength: 100},
    content: {type: String},
    image: {type: String},
    view: {type: Number},
    categorys: [{type: mongoose.Types.ObjectId, ref: 'categorys'}],
    time: {type: String},
    showTime: {type: Number},
    slug: {type: String,  slug: "name", unique: true, }
},{
    timestamps: true,
});
  
  
module.exports = mongoose.model('animationFlim' , animationFlim)
