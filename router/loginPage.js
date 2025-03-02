const express = require('express');
const router = express.Router();
const { join } = require("path");
const User = require(join(__dirname, "..", "model", "userModel.js"));

router.get('/', (req, res) => {
    if(res.locals.user){
        return res.redirect('/error')   //if user is already login, it will redirect to error page
    }
    res.render('site/login');
});

router.post('/',async(req,res)=>{
    try{
        if(res.locals.users){
            return res.json({
                case:false,
                message:'User account already inuse'
            })
        }
        let{username,password}=req.body
        const userControl=await User.find({'username':username,'password':password}).exec()
       
        if(userControl.length!=1){
            return res.json({
                case:false,
                message:'user name or password is not correct'
            })
        }
        let ID = userControl[0]._id
        ID=String(ID)
        req.session.userID=ID
        return res.json({
            case:true,
            message:'Login successfully'
        })

    }catch(error){
        console.log(error)
        return res.json({
            case:false,
            message:'Unexpected error'
        })
    }
})


module.exports = router;
