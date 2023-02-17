const Animation = require('../module/AnimationFlim')
const Store = require('../module/store')
const { mongooseToObject } = require('../../ulti/mongoose')
const { mutipleMongooseToObject } = require('../../ulti/mongoose')

class AnimationController {
    //GET 
    show(req, res, next) {
   
       
        Promise.all([Animation.find({}).sort({view: -1}).limit(10), Animation.findOne({slug: req.params.slug}).populate('categorys')
            , Store.find({name: req.params.slug})])
            .then(([mustView, flim, store]) => {
                console.log(flim)
                res.render('animation', {
                    mustView: mutipleMongooseToObject(mustView),
                    flim: mongooseToObject(flim),
                    store: mutipleMongooseToObject(store)
                })
            })
            .catch(next)
    }

    watch(req, res, next) {
        console.log(req.params)
        Promise.all([Animation.find({}).sort({view: -1}).limit(10), Store.findOne({ name :req.params.flim ,slug: req.params.slug}),
             Animation.findOne({slug: req.params.flim}), Store.find({ name :req.params.flim})])
            .then(([animation, store, flim, stores]) => {
                if(flim.view === undefined) flim.view = 0
                res.render('watch', {
                    mustView: mutipleMongooseToObject(animation),
                    store: mongooseToObject(store),
                    stores: mutipleMongooseToObject(stores),
                    flim: mongooseToObject(flim),
                    view: flim.view
                })
            })
            .catch(next)
        
        
    }

    getFlimByTime(req, res) {
        Animation.find({showTime: req.body.showTime})
        .then(flim => {
            res.json({data: flim})
        })
    }
}

module.exports = new AnimationController();