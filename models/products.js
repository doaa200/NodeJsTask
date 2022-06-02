const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name:{
    type:String,
    minlength:3,
    maxlength:50,
    required:true,
    unique:true
},
price:{
  type:Number,
  required:true,
},
quantity:{
  type:Number,
  required:true,
  
},

description:{
  type:String,
  maxlength:100,
  required:true
},
 image:{
  type:String,
  required:true
  
 },
createdAt:{
  type:Date,
  required:false
},
});


  const ProductModel= mongoose.model('Product', ProductSchema);

  module.exports=ProductModel
