
const ProductModel = require("../models/products");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");

function findProducts() {
  var products = ProductModel.find({});
  return products;
}
function fineOne(name) {
  var product = ProductModel.findOne({ name: name });
  return product;
}

function createProduct( name,price,quantity, description, image) {
  var product = ProductModel.create({
    name: name,
    price:price,
    quantity:quantity,
    description: description,
    image: image
  });
  return product;
}


function updateProduct(name, price) {
  var newProduct = ProductModel.findOneAndUpdate({ name: name }, { name: name, price: price});
  return newProduct;
}

function deleteProduct(name) {
  ProductModel.findOneAndRemove({ name: name },
    function (err, docs) {

      return docs;

    });
}
module.exports = { findProducts, fineOne,  createProduct, updateProduct, deleteProduct };
