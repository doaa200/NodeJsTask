const Usermodel=require("../models/users");
const bcrpt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const { res } = require("express/lib/response");
function createuser(u)
{
    
    var user=Usermodel.create({ password: u.password,
    FirstName: u.FirstName,
    MiddleName:u.MiddleName,
     LastName: u.LastName,
     PhoneNumber:u.PhoneNumber,
     Email:u.Email
     ,createdAT:u.createdAT});
    return user;
}

function getAll(){
 
    var Users=Usermodel.find({});
    return Users;

}

 function getonebyid(id){
  
  
    var User=Usermodel.findById(id);
    return User;

}
function update(u,id)
{
 var user=Usermodel.findByIdAndUpdate(id,{ password: u.password,
  FirstName: u.FirstName,
  MiddleName:u.MiddleName,
   LastName: u.LastName,
   PhoneNumber:u.PhoneNumber,
   Email:u.Email});
 
 
 user.updatedAT=Date.now();
 
 return user;

 
}
async function Deletebyid(id){

    var user=Usermodel.findById(id);
    await Usermodel.deleteOne(user);
    return user;
        

}

const login = async (req, res) => {
 
  var fname= req.body.FirstName;
  var pass= req.body.password;
  const data = {};
  try {
    const user = await Usermodel.findOne({ FirstName: fname });
    if (!user) {
      return res.status(401).json({ error: "wrong" });
    }
    bcrpt.compare(pass,user.password, (err, matched) => {
      if (matched) {
        data.userId = user.id;
        const token = jwt.sign({ FirstName: user.FirstName },"MADOD123456MADOD",{expiresIn:"1000"});
        data.token=token;
        res.cookie("token", token, {
          httpOnly: true
        });
       
        return res.status(200).json({ ...data });
      }
      return res.status(401).json({ error: "wrong" });
    });
  } catch (err) {
    res.status(401).json({
      error: "Error logging you in, please try again later",
    });
  }



}
module.exports={createuser,getonebyid,getAll,update, Deletebyid,login};