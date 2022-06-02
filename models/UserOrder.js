const mongoose = require('mongoose');

const UserOrderSchema = mongoose.Schema({
   
    orderId:{
        type:mongoose.SchemaTypes.ObjectId,
         ref:'Orders',
         required:true
    },
    userId: {
        type:mongoose.SchemaTypes.ObjectId,
        ref:'users',
        required:true
    },
    createdAT:{
        type:Date,
        timestamps: true,
        required:false
    }
    
});

const userorderrModel = mongoose.model('UserOrder', UserOrderSchema);

module.exports = userorderrModel