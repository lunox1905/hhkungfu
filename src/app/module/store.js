const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
mongoose.plugin(slug)

const Flim = new Schema({
    name: {type: String},
    ep: {type: Number, required: true},
    videoLink: {type: String, required: true},
    slug: {type: String, slug: "ep", unique: true}
},{
  timestamps: true,
});
Flim.path('ep').get(v => {
    return "ep" + v
  });
module.exports = mongoose.model('storeflims' , Flim)
