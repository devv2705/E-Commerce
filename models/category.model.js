
const mongoose=require('mongoose')


const categorySchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String,
        required:true
    }


},{timestamps:true,versionKey:false})

module.exports=mongoose.model("Category",categorySchema)

//when it created it the collection name is Categories not category
//plural of collection will be created


