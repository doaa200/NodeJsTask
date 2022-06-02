const {getAll,getonebyid,createorder,update,Deletebyid}=require('../controllers/Orders');
const Express=require('express');
const OrdersRoutes=require("../models/Orders");
var router=Express.Router();
router.get("/",async(request,response,next)=>{
    var orders=await getAll();
    console.log(orders);
    if(orders)
    {
        response.json(orders);
    }else{
        response.json({Message:"Orders not found"});
    }

});

router.get("/:ID",async (request,response,next)=>{
    var{ID}=request.params;
    var order= await getonebyid(ID);
    if(order)
    {
        response.json(order);
    }else{
        response.json({Message:"Order not found"});
    }
   

});

router.patch("/:ID",async(request,response,next)=>{
   var o =request.body;
   var{ID}=request.params;
   var order=await  update(o,ID);
    order.updatedAT=Date.now();
    if(order)
    {
        response.json({Message:"Order updated"});
    }else{
        response.json({Message:"Order not updated"});
    }
  
});

router.post("/",async(request,response,next)=>{
    var o=request.body;
   
    
    try{
        var order=await createorder(o);
        
        
        order.createdAT=Date.now();
        response.status(201).json(order);
    }catch(error){console.log(error);
        response.status(422).json({error});
    }
 

});


router.delete("/:ID",async (request,response,next)=>{
    var{ID}=request.params;
    var order=await Deletebyid(ID);
    console.log(order);
    if(order)
    {
        response.json({Message:"Order  deleted"});
        
    }else{
        response.json({Message:"Order not deleted"});
    }

});



module.exports=router;