const express = require('express');
const router = express.Router();
const {join}=require('path')
const Content = require(join(__dirname,'..','model','contentModel.js'))


router.get('/', (req, res) => {
    if(!res.locals.user){
        return res.redirect('/error')
    }
   return  res.render('site/add');
});


router.post('/',(req,res)=>{
    try {
        //check authorize
        if(!res.locals.user){
            return res.json({
                case:false,
                message:'unauthorized access'
            })
        }
        //check datas
        if(!req.body || !req.files){
            return res.json({
                case:false,
                message:'body or files can not be empty'
            })
        }

        //get datas from frontend
        const{title, content, name}=req.body    
        const {file}=req.files
        
        //check variables
        if(!title || !content || !name){
            return res.json({
                case:false,
                message:'single data error'
            })
        }
        
        // size control
        if(file.size>1024*1024*5){
            return res.json({
                case:false,
                message:'File is bigger than 5 MB, Please use smaller than 5MB images'
            })
        }

        //check format
        if(file.mimetype=='image/jpeg' || file.mimetype=='image/png' || file.mimetype=='image/jpg'){
            
            //create unique name
            const extentiton = file.mimetype.split('/')[1] 
            const uniqueName=`${Date.now()}-${Math.round(Math.random()*1E9)}.${extentiton}`
            
            const pathName=join(__dirname,'..','public','img','content',uniqueName)
            file.mv(pathName,(err)=>{
                if(err!=undefined){
                    return res.json({
                        case:true,
                        message:`file couldn't add`
                    })
                }
                else{
                    const db = new Content({
                        title,
                        content,
                        name,
                        'path':pathName
                    })
                    db.save().then(()=>{
                        return res.json({
                            case:'true',
                            message:'saved successfully'
                        })
                    })


                    
                }
            })


          

        }
        else{
            return res.json({
                case:false,
                message:'Please use png, jpg or jpeg imagines '
            })
        }       

    } catch (error) {
        console.log(error)
        return res.json({
            case:false,
            message:'unexpected error'
        })
        
    }
})




module.exports = router;
