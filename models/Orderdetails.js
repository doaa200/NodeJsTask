const mongoose = require('mongoose');

const OrderDetailsSchema = mongoose.Schema({
   
    orderId:{
        type:mongoose.SchemaTypes.ObjectId,
         ref:'Orders',
         required:true
    },
    quantity: {
        type: Number,
        required: true,
    },
    createdAT:{
        type:Date,
        timestamps: true,
        required:false
    }
    
});

const orderdetailsrModel = mongoose.model('OrderDetails', OrderDetailsSchema);

module.exports = orderdetailsrModel