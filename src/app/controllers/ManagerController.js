const Animation = require('../module/AnimationFlim')
const Store = require('../module/store')
const Category = require('../module/Category')

const { mutipleMongooseToObject, mongooseToObject } = require('../../ulti/mongoose');
const { PromiseProvider } = require('mongoose');

const limit = 8
const size = 5

class ManagerController {
    //GET 
    index(req, res, next){
        Animation.countDocuments()
            .then(countFlim => {
                var skip = (parseInt(req.query.page)-1) * limit
             Animation.find({}).skip(skip).limit(limit)      
                .then(animation => {
                    var totalPage = Math.floor(countFlim/limit) + 1
                    res.render('manager', {
                        animation: mutipleMongooseToObject(animation),
                        title: 'Manager', layout: 'manager',
                        size: size,
                        current: req.query.page || 1,
                        total: totalPage
                    })
                })
    
            })
            .catch(next)
    }

    createListFlim(req, res, next) {
        Category.find({})
        .then((category) => {
            res.render('createListFlim', {
                categorys: mutipleMongooseToObject(category),
                title: 'Manager', 
                layout: 'manager'
            })
        })
        
    }

    storeListFlim(req, res, next) {
        const listFlim = new Animation(req.body)
        listFlim.save()
            .then(() => res.redirect('/manager'))
            .catch(err => {

            }) 
        
    }

    createFlim(req, res, next) {
        res.render('managerStore/create', {
            name: req.params.slug
        })
    }

    storeFlim(req, res, next) {
        // Thêm tập phim
        const list = new Store(req.body)
        list.save()
            .then(() => res.redirect(`/manager/${req.body.name}/store`))
            .catch(err => {

            }) 
    }

    storeManager(req, res, next) {
        Store.find({name: req.params.slug})
            .then(store => {
                res.render('managerStore/store', {
                    store: mutipleMongooseToObject(store),
                    
                })
            })
            .catch(next)
    }

    

    edit(req, res, next) {
        Promise.all([Animation.findById(req.params.id),
            Category.find({})])
            .then(([animation, category]) => {        
                res.render('edit', {
                    flim: mongooseToObject(animation),
                    categorys: mutipleMongooseToObject(category)
                })

            })
            .catch(next)
    }

    editStoreFlim(req, res, next) {
        Store.findById(req.params.id)
            .then(store => {        
                res.render('managerStore/edit', {
                    store: mongooseToObject(store)
                })

            })
            .catch(next)
    }

    
    update(req, res, next) {
        req.body.content = req.body.content.trim()
        Animation.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect(`/manager`))
            .catch(next)
    } 

    updateStoreFlim(req, res, next) {
        req.body.slug = 'ep' + req.body.ep
        Store.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect(`/manager/${req.params.slug}/store`)
            })
            .catch(next)
    }

    deleteListFlim(req, res, next) {
        Animation.deleteOne({ _id: req.params.id })
            .then(() => {
         
                Store.deleteMany({ name: req.params.name})
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
            })
            .catch(next =>{
                console.log('fail')
            })
    }

    deleteFlim(req, res, next) {
        Store.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(()=> {
                res.json({mess: "err in server"})
            })
    }

    handleManager(req, res, next) {
        console.log(req.body.action)
        switch(req.body.action) {
            case 'delete':
                Animation.deleteMany({_id: {$in: req.body.flimIds}})
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                    break
            default:
                res.json({message: req.body.action})
        }
    }

    async addCategory(req, res) {
        try {
           
            const category = Category({title: req.body.title})
            category.save()
            res.json({success: true})
            
        } catch {
            res.json({mess: "Add category err in server"})
        }
        
    }

    async deleteCategory(req, res) {
        try {
            Category.deleteOne({_id: req.params.id}) 
                .then(() => {
                    
                    res.redirect('/manager/category')
                })
                .catch((e) => {
                    res.json({mess: "err delete in server"})
                })
        } catch {
            res.json({mess: "err delete in server"})
        }
    }

    updateCategory(req, res) {
        Category.updateOne({_id: req.params.id}, req.body)
        .then(()=> {
           
            res.json({success: true})
        })
        .catch(()=> {
            res.json({mess: "err in server"})
        })
    }

    async getCategory(req, res, next) {
       
        Category.find({})
        .then((categorys) => {
            res.render('manager/category', {
                categorys: mutipleMongooseToObject(categorys)
            })
        })
        
        
    }
}

module.exports = new ManagerController();