const express = require('express')   //request response
const {engine}= require('express-handlebars') //seperate
const expressSession=require('express-session') //keep info on host
const fileUpload=require('express-fileupload') //image
const dotenv = require('dotenv') //keep secret info (URL)
const path = require('path')    //import path module                    /*require is pulling from module which include variable */
const dbs= require(path.join(__dirname,'dbs.js'))      // "__dirname" is referance folder name for dbs.js
const crypto = require('crypto')
//console.log(crypto.randomBytes(64).toString('hex'))

//db connect
dbs()


// initial settings
dotenv.config()
const app= express()


// variables
const time = 1000*60*30;
const SECRET_VALUE= process.env.SECRET_VALUE || 'myBlog'
const PORT = process.env.PORT || 5000
const API_URL = process.env.API_URL || 'http://127.0.0.1:5000'

// template engine
app.engine('handlebars', engine())
app.set('view engine','handlebars')
app.set('views',path.join(__dirname,'views'))

// middleware
app.use(express.json())
app.use(fileUpload())
app.use(expressSession({
    secret:SECRET_VALUE,
    resave:false,
    saveUninitialized:true,
    cookie:{path:'/' , httpOnly:true , secure: false , maxAge:time}
}))
app.use(express.static(path.join(__dirname, 'public')))

//* Router def

const indexPage= require(path.join(__dirname,'router','indexPage.js'))
const aboutPage= require(path.join(__dirname,'router','aboutPage.js'))
const addPage= require(path.join(__dirname,'router','addPage.js'))
const loginPage= require(path.join(__dirname,'router','loginPage.js'))
const registerPage= require(path.join(__dirname,'router','registerPage.js'))
const errorPage= require(path.join(__dirname,'router','errorPage.js'))
const logoutPage= require(path.join(__dirname,'router','logoutPage.js'))

//control identify
app.use('/',(req,res,next)=>{
    const{userID}=req.session
    if(userID){
        res.locals.user=true
    }else{
        res.locals.user=false
    }
    next()
})




//* Router Usage
app.use('/', indexPage);         // Ana sayfa için
app.use('/about', aboutPage);    // Hakkında sayfası için
app.use('/add', addPage);        // Ekleme sayfası için
app.use('/login', loginPage);    // Giriş sayfası için
app.use('/register', registerPage); // Kayıt sayfası için
app.use('/logout', logoutPage); // Kayıt sayfası için

app.use('*',(req,res,next)=>{
    res.render('site/error')
})




app.listen(PORT , ()=>{
    console.log(`Server is running ${API_URL}`)
})