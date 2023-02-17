const Animation = require('../module/AnimationFlim')
const Users = require('../module/User')
const jwt = require('jsonwebtoken')
const { mutipleMongooseToObject } = require('../../ulti/mongoose')
const Category = require('../module/Category')
const limit = 12// Số lượng phim mỗi trang
const size = 5 
class SiteController {
    // GET /  
    index(req, res, next) {
        var skip = (parseInt(req.query.page)-1) * limit
        Promise.all([Animation.find({}).skip(skip).limit(limit) , Animation.countDocuments()
            , Animation.find({}).sort({view: -1}).limit(10), Animation.find({showTime: 2}),
            Category.find({})]) 
            .then(([animation, countFlim, mustView, flimByTime, categorys]) => {
                var totalPage = 0
                if(countFlim > limit) totalPage = Math.floor(countFlim/limit) + 1 
                res.render('home', {
                    animation: mutipleMongooseToObject(animation),
                    size: size,
                    current: req.query.page || 1,
                    total: totalPage,
                    mustView: mutipleMongooseToObject(mustView),
                    flimByTime: mutipleMongooseToObject(flimByTime),
                    categorys: mutipleMongooseToObject(categorys)
                })
                
            })
            .catch(() => {
                res.json({success: false})
            })
    }
    //GET /search
    search(req, res) {
        var skip = (parseInt(req.query.page)-1) * limit
        Promise.all([Animation.find({name : {$regex : new RegExp(req.query.name, 'i')}}).skip(skip).limit(limit),
                    Animation.find({}).sort({view: -1}).limit(10), Category.find({}),
                     Animation.countDocuments({name : {$regex : new RegExp(req.query.name, 'i')}})])
            .then(([animation, mustView, categorys, count]) => {
                var totalPage = 0
                if(count > limit) totalPage = Math.floor(count/limit) + 1
                res.render('search', {
                    animation: mutipleMongooseToObject(animation),
                    mustView: mutipleMongooseToObject(mustView),
                    categorys: mutipleMongooseToObject(categorys),
                    search: req.query.name, 
                    size: size,
                    current: req.query.page || 1,
                    total: totalPage,
                })
            })
    }

    handle(req, res, next) { 
        Animation.updateOne({slug: req.body.name}, {view: req.body.view})
            .then( () => {
            }) 
    }

    getFlimByCategory (req, res) {
        var skip = (parseInt(req.query.page)-1) * limit
        Promise.all([Animation.find({categorys: req.params.id}), Category.findOne({_id: req.params.id}),
            Animation.find({}).sort({view: -1}).limit(10), Category.find({})])
        .then(([flims, category, mustView, categorys]) => {
            if(!skip) skip = 0 
            const flim = flims.slice(skip, skip + limit)
            var totalPage = 0
            if(flims.length > limit) totalPage = Math.floor(flims.length/limit) + 1
            res.render('flimByCategory', {
                flims: mutipleMongooseToObject(flim), 
                title: category.title,
                mustView: mutipleMongooseToObject(mustView),
                categorys: mutipleMongooseToObject(categorys),
                size: size,
                current: req.query.page || 1,
                total: totalPage,
            })
        })
    }

    login (req, res) {

        
        res.render('auth/login', {
            layout: 'auth',
        })
    }

    async handleLogin (req, res, next) {
        try{
            
            const {username, password} = req.body
            const user = await Users.findOne({ username, password })

            if(!user){
                return res.json({mess: 'err'})  
            } else {
             
                const token = jwt.sign({
                    _id: user._id, user: user.username, role: user.role
                }, process.env.ACCESS_TOKEN_SECRET)
                
                res.cookie('hhkungfu_token', token)
          
                res.redirect('/manager')
            }
            
        } catch(err){
            return res.status(500).json('invalid server')
        }
    }

    register(req, res) {
        res.render('auth/register', {
            layout: 'auth'
        })
    }
 
    async handleRegister (req, res, next) {
        try{
            
            const {username, password} = req.body
            console.log(req.body)
            const user = await Users.findOne({ username })
            
            if(user){
                return res.json({mess: 'err'})  
            } else {
                const user = new Users({username: username, password: password})
                user.save()
                res.redirect('/manager')
            }
            
        } catch(err){
            return res.status(500).json('invalid server')
        }
        
    }

}

module.exports = new SiteController;