
const animationRouter = require('./animation');
const siteRouter = require('./site');
const managerRouter = require('./manager');

function route(app) {
    
    app.use('/flim', animationRouter);
    app.use('/manager', managerRouter);
    app.use('/', siteRouter);
    
}

module.exports = route;