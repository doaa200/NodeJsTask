const{createuser,getAll,getonebyid,update,Deletebyid,login}=require('../controllers/users');
const Express=require('express');
const Usermodel = require('../models/users');
const user =require("../controllers/users");
const jwt = require("jsonwebtoken");
var router=Express.Router();

router.post("/Register",async(request,response,next)=>{
    var u=request.body;
    u.createdAT=Date.now();
    try{
        var user=await createuser(u);
        response.json(user);
    }catch(error){
        response.status(422).json({error});
    }
});
router.get("/",async(request,response,next)=>{
    var users= await getAll();
    if(users)
    {
        response.json(users);
    }else{
        response.json({Message:"Users not found"});
    }
    
    

});

router.get("/:ID",async(request,response,next)=>{
    var{ID}=request.params;
    var User= await getonebyid(ID);
    if(User)
    {
        response.status(201).json(User);
    }else{
        response.json({Message:"User not found"});
    }
   

});

router.patch("/:ID",async(request,response,next)=>{
    var u=request.body;
    var{ID}=request.params;
    console.log(ID);
    if(ID==null||ID<=0){
        response.status(403).json({
          msg: 'please fill Id',
          result: {}
        })
       
      } 
      else if(ID==undefined){
        response.status(403).json({
            msg: 'please login again Time out',
            result: {}
      })
    }
      else {
        user=await update(u,ID);
       user.updatedAT=Date.now();
      }
      
    if(user)
    {
        console.log("succes");
        response.json({Message:" updated Successfully"});
    }else{
        console.log("failed");
        response.json({Message:" not updated"});
    }
   
 
    



});

router.delete("/:ID",async (request,response,next)=>{
var{ID}=request.params;
console.log(ID);
  if(ID==null||ID<=0){
    response.status(403).json({
      msg: 'please fill Id',
      result: {}
    })
   
  } 
  else if(ID==undefined){
    response.status(403).json({
        msg: 'Time out ,please login again ',
        result: {}
  })
  }
  else {
     user= await Deletebyid(ID);
   
  }
  
if(user)
{
    console.log("succes");
    response.json({Message:" deleted Successfully"});
}else{
    console.log("failed");
    response.json({Message:" not deleted"});
}


});
router.post("/login", async (req, res) => {
    await user.login(req, res);
  });

module.exports = router;