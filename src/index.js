const express = require('express')
const app = express()
const path = require('path')
const handlebars = require('express-handlebars')
const methodOverride = require('method-override')
const route = require('./routes')

var cookieParser = require('cookie-parser')
app.use(cookieParser())
const dotenv = require('dotenv')
dotenv.config()

const db = require('./app/config/db')
db.connect()


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(methodOverride('_method'))
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: require('./app/helpers/handlebars')
    
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'))

route(app);




app.listen(process.env.PORT || 3000, () => console.log(`localhost:${process.env.PORT}`))