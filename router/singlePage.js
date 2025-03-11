const e = require('express')
const express = require('express')
const router = express.Router()
const {join} = require('path')
const Content =require(join(__dirname,'..', 'model','contentModel.js'))

const fs = require('fs') //file system

router.get('/:id', async(req,res)=>{
    try {
        const{ id } = req.params
        if(id.length != 24) {
            return res.redirect('/error')
            
        }
            
        const data = await Content.findById(id).exec()

        return res.render('site/single',{
            singleData:data.toJSON()
        }) 
    } catch (error) {
        console.log(error)
        return res.redirect('/error')
    }
})
router.delete('/:id', async(req,res)=>{
    try {
        if(!res.locals.user){
            return res.json({
                case:false,
                message:'unauthorized'
            })
        }
        let {id} = req.params
        const data = await Content.findById(id).exec()
        let fileName = data.path
        
        let pathName = join(__dirname,'..','public',fileName)
      
        
        Content.findByIdAndDelete(id).then(()=>{
            fs.unlink(pathName,(error)=>{
                if(error !== null){
                    return res.json({
                        case:false,
                        message:'delete was unsuccessful'
                    })
                }
                return res.json({
                    case:true,
                    message:'delete was successful'
                })
            })  
        })
        .catch((error)=>{
            console.log(error)
            return res.json({
                case:false,
                message:'delete was unsuccessful'
            })
        })
    } catch (error) {
     console.log(error)
     return res.redirect('/error') 
    }
}) 




module.exports=router