const express = require('express')
const router = express.Router()

router.get('/', async(req,res)=>{
    try {
        return res.render('site/single') 
    } catch (error) {
        console.log(error)
        return res.redirect('/error')
    }
})




module.exports=router