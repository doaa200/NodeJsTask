const express = require("express");
const path=require('path');
var app = express();
const cors=require("cors");
const mongoose=require("mongoose");
const morgan = require('morgan');
const userModel= require("./models/users")
const ProductModel= require("./models/products")
const orderModel= require("./models/Orders")
const orderdetailsrModel= require("./models/Orderdetails")
const userorderModel= require("./models/UserOrder")
const swaggerJSDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');
let bodyParser = require('body-parser');

const cookieParser = require("cookie-parser");
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
let options = { 
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
              }; 
mongoose.connect("mongodb://localhost:27017/TechnicalTaskdb",()=>{

  console.log("conected to db")

});

const productsRoutes=require("./routes/products");
const userRoutes=require("./routes/users");
const orderdetailsRoutes=require("./routes/OrderDetails");
const OrdersRoutes=require("./routes/Orders")
const userorderRoutes=require("./routes/UserOrder")
app.use(express.json()); //middleware
// const opttions ={
//   definition:{
//     openapi:'3.0.0',
//     info:{
//       title:"ecommerceproject",
//       version:'1.0.0'
//     },
//     servers:[{
//       api:'http://localhost:3000/'
//     }]
//   },
//   apis:['./index.js']
// }
// const swaggerspec=swaggerJSDoc(opttions)
// app.use('api-docs',swaggerUi.serve,swaggerUi.setup(swaggerspec))

app.use(express.static(path.join(__dirname,"productImage")));
app.use("/products",productsRoutes);
app.use("/users",userRoutes);
app.use("/OrderDetails",orderdetailsRoutes);
app.use("/Orders",OrdersRoutes);
app.use("/UserOrder",userorderRoutes);
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));



app.use((req, res, next) => {
  console.log(req.body);

  next();
});
app.use("*",(request,response,next)=>{
  response.status(404).end();
});
app.use((err,request,response,next)=>{
  response.status(500).send("something broke!");
});


app.listen(7000, () => {
  console.log("app started listening on port 7000");
});
module.exports=app;