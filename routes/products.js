const express = require('express');
var router = express.Router();
const multer = require('multer');
const { isHttpError } = require('http-errors');
const { findProducts, fineOne, createProduct, updateProduct, deleteProduct } = require('../controllers/products');
const ProductModel = require('../models/products');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './productImage/')
  }
  , filename: function (req, file, cb) {
    cb(null, new Date().toDateString() + file.originalname)
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})

router.get("/", async (req, res, next) => {
  var products = await findProducts();
  if (products) {
    res.json(products);
  } else {
    res.json({ message: "Sorry! Theses Products Not Found " });
  }
});

router.get("/:name", async (req, res, next) => {
  
var { name } = req.params;
    if(name)
    {var product = await fineOne(name);
      res.status(201).json(product);
    }else{
      res.json({Message:"this product not found"});
    }

});



router.post("/", upload.single('myfile'), async (req, res, next) => {
  var name = req.body.name;
  var price = req.body.price;
  var quantity=req.body.quantity;
  var description=req.body.description;
  var image = req.file.path;
  
        try {
          var product = await createProduct( name, price,quantity,description, image);
          await product.save();
          res.json(product);
        } catch (error) {
          res.status(422).json({ error });
        }
});
router.patch("/:name", (req, res, next) => {
  var name = req.params.name;
  var { price } = req.body;
    ProductModel.find({ name: name }, async (err, product) => {
      if (err) {
        res.status(403).json({
          "msg": "not found product",
          "result": {}
        })
      } else {
        var Products = await findProducts();
        var product = Products.find(function(item){
        })
        if (product) {
          updateProduct(name, price)
          .then(() => {
           res.status(200).json({ message: "Product updated successfully" });
          })
        } else {
          res.status(403).json({
            "msg": "not updated",
            "result": {}
          })
        }
      }
    })
});


router.delete("/name",(req, res, next) => {
  var name = req.params.name;
  
    ProductModel.find({ name: name }, async (err, product) => {
      if (err) {
        res.status(403).json({
          "msg": "not found product",
          "result": {}
        })
      } else {
        var Products = await findProducts();
        var product = Products.find(function(item){
        })
        if (product) {
          deleteProduct(name);
          res.status(200).json({
            "msg": "delete success",
            "result": {}
          })
        } else {
          res.status(403).json({
            "msg": "not found product",
            "result": {}
          })
        }
      }
    })
});

module.exports = router;  