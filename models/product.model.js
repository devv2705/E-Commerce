const mongoose=require('mongoose')


const productSchema=mongoose.Schema({
    name:{
        type:String,
        required : true 
    },
    imageUrl:{
       type:String
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:{
           type: String
        }
    },
},{timestamps : true,versionKey:false})

module.exports={
    product:productSchema
}

