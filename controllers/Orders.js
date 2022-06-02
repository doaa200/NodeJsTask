const OrdersRoutes=require("../models/Orders");
function getAll(){
    var orders=OrdersRoutes.find({}).populate("userId").populate("products");
    return orders;

}

function getonebyid(id){
    
    var order=OrdersRoutes.findById(id).populate("userId").populate("products");
    return order;

}
function createorder(o)
{
    var order=OrdersRoutes.create({userId: o.userId,products:o.products,totalPrice:o.totalPrice,status:o.status});
    return order;
}

function update(order,id)
{
 var order=OrdersRoutes.findOneAndUpdate(id,
    {userId:order.userId, totalPrice:order.totalPrice,status:order.status,createdAT:order.createdAT});
 order.updatedAT=Date.now();
 return order;
}
async function Deletebyid(id){

    var order=await getonebyid(id);
    await OrdersRoutes.deleteOne(order);
    
        return order;

}
module.exports={ getAll,getonebyid,Deletebyid,update,createorder};