const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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