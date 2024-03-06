const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    quantity:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
},{timestamps : true,versionKey:false})

module.exports=mongoose.model("Cart",cartSchema)