
const userorderModel = require("../models/UserOrder");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");


async function getAll() {
    var userorder = userorderModel.find({}).populate("orderId").populate("userId");
    return await userorder;
}

async function getOne(id) {
    var userorder = userorderModel.findOne({ _id: id }).populate("orderId").populate("userId");
    return await userorder;
}

async function create(userorder) {
    var creation = await userorderModel.create({
        
        orderId:userorder.orderId,
        userId:userorder.userId
    })
    creation.save();
    return creation;
}


async function update(id, userorder) {

    var updated=userorderModel.findByIdAndUpdate(id,{  orderId:userorder.orderId,userId:userorder.userId});  
       return updated;
}


async function deleteone(id) {
    const deleted = await userorderModel.findById(id);
	if (!deleted) {
		return;
	}
	const res = await userorderModel.deleteOne({ id });
	return res;
}




module.exports = { getAll, getOne, create, update, deleteone };