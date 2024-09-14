const express = require('express')   //request response
const {engine}= require('express-handlebars') //seperate
const expressSession=require('express-session') //keep info on host
const fileUpload=require('express-fileupload') //image
const dotenv = require('dotenv') //keep secret info (URL)
const path = require('path')    //import path module                    /*require is pulling from module which include variable */
const dbs= require(path.join(__dirname,'dbs.js'))      // "__dirname" is referance folder name for dbs.js
const crypto = require('crypto')
console.log(crypto.randomBytes(64).toString('hex'))

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


app.get('/', (req,res)=>{
    res.render('site/index',{
        source:'home.jpg',
        title:'My Blog',
        description:`It's a Dream`
    })
})
app.get('/about', (req,res)=>{
    res.render('site/about',{
        source:'about.jpg',
        title:'Why U.S',
        description:`We Are a Family`
    })
})
app.get('/login', (req,res)=>{
    res.render('site/login')
})
app.get('/register', (req,res)=>{
    res.render('site/register')
})
app.get('/add', (req,res)=>{
    res.render('site/add')
})



app.listen(PORT , ()=>{
    console.log(`Server is running ${API_URL}`)
})