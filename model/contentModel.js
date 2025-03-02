const mongoose= require('mongoose')
const Schema=mongoose.Schema //use schema from mongoose

const contentSchema = new Schema({
    title:{type:String, require},
    content:{type:String, require},
    name:{type:String, require},
    path:{type:String, require},
    date:{type:String, require}
})
const Content = mongoose.model('Content',contentSchema);
                            //name for db, schema
module.exports=Content      //export Content to use in another file