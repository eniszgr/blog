const express = require('express')   //request response
const {engine}= require('express-handlebars') //seperate
const expressSession=require('express-session') //keep info on host
const fileUpload=require('express-fileupload') //image
const dotenv = require('dotenv') //keep secret info (URL)
const path = require('path')    //import path module                    /*require is pulling from module which include variable */
const dbs= require(path.join(__dirname,'dbs.js'))      // "__dirname" is referance folder name for dbs.js

//db connect
dbs()


// initial settings
dotenv.config()
const app= express()


// variables
const time = 1000*60*30;

// template engine
app.engine('handlebars', engine())
app.set('view engine','handlebars')
app.set('views',path.join(__dirname,'views'))

// middleware
app.use(express.json())
app.use(fileUpload())
app.use(expressSession({
    secret:'myBlog',
    resave:false,
    saveUninitialized:true,
    cookie:{path:'/' , httpOnly:true , secure: false , maxAge:time}
}))
app.use(express.static(path.join(__dirname, 'public')))

app.listen(5000 , ()=>{
    console.log(`Server is running http://127.0.0.1:5000`)
})