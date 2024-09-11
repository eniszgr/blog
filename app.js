const express = require('express')   //request response
const {engine}= require('express-handlebars') //seperate
const expressSession=require('express-session') //keep info on host
const fileUpload=require('express-fileupload') //image
const dotenv = require('dotenv') //keep secret info (URL)
const path = require('path')    //import path module
const dbs= require(path.join(__dirname,'dbs.js'))

//db connect
dbs()

