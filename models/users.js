const mongose=require("mongoose");
const bcrpt=require("bcryptjs");
const userschema=mongose.Schema({
    password:{
               type:String,
               required:true
    },
    FirstName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    MiddleName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    LastName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:15
    },
    PhoneNumber:{
        type:Number,
        required:false
    },
    Email:{
        type:String,
        required:false
    },
    createdAT:{
        type:Date,
        timestamp:false
    },
    updatedAT:{
        type:Date,
        timestamp:false
    }
});

//registeration
userschema.pre('save',function(){

    var salt = bcrpt.genSaltSync(10);
    var hashpassword= bcrpt.hashSync(this.password, salt);
    this.password=hashpassword;
})

var Usermodel=mongose.model("User",userschema);

module.exports=Usermodel;