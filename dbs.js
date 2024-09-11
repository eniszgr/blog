const mongoose = require('mongoose') //connect db
const dotenv = require('dotenv')    //keep secret
dotenv.config()

const conn = ()=>{
    mongoose.connect(process.env.DB_URL,{
        dbName:'myBlog'
    }).then(()=>{
        console.log('DB connected')
    }).catch((err)=>{
        console.log(err)
    })
}
module.exports=conn