const Mongoose=require("mongoose");

const Ordersschema=Mongoose.Schema({
   
   products:[{
        type:Mongoose.SchemaTypes.ObjectId,
         ref:'Product',
         required:true
    }],
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    createdAT:{
        type:Date,
        timestamps: true,
        required:false
    },
    userId:{
        type:Mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required:true
    } 
});

var Ordermodel=Mongoose.model("Orders",Ordersschema);
module.exports=Ordermodel;
