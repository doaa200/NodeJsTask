
const orderdetailsrModel = require("../models/Orderdetails");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");


async function getAll() {
    var orderdetails = orderdetailsrModel.find({}).populate("orderId");
    return await orderdetails;
}

async function getOne(id) {
    var orderdetails = orderdetailsrModel.findOne({ _id: id }).populate("orderId");
    return await orderdetails;
}

async function create(orderdetails) {
    var creation = await orderdetailsrModel.create({
        
        orderId:orderdetails.orderId,
        quantity:orderdetails.quantity
    })
    creation.save();
    return creation;
}


async function update(id, details) {

    var updatedetails=orderdetailsrModel.findByIdAndUpdate(id,{  quantity:details.quantity,});  
       return updatedetails;
}


async function deleteone(id) {
    const deleted = await orderdetailsrModel.findById(id);
	if (!deleted) {
		return;
	}
	const res = await orderdetailsrModel.deleteOne({ id });
	return res;
}




module.exports = { getAll, getOne, create, update, deleteone };