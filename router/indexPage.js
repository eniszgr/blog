const express = require('express')
const router = express.Router()
const {join}=require('path')
const Content = require(join(__dirname,'..','model','contentModel.js')) 

const pageInfo ={
    source:'home.jpg',
    title:'My Blog',
    subTitle:"It's a Dream"
}


router.get('/', async(req,res)=>{
    try {
        const content=await Content.find().exec()
        console.log(content)
        
        return res.render('site/index',{
            pageInfo,
            allData: content.map(item=>item.toJSON())   //if there is an object inside an object, the template engine cannot run it. so we converted it to JSON
        
        }) //give a parameter with source
    } catch (error) {
        console.log(error)
        return res.redirect('/error')
        
    }

})


module.exports=router