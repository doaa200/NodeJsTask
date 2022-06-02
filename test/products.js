
const mongoose=require("mongoose");
const ProductModel = require('../models/products');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
chai.use(chaiHttp);

describe('products', () => {
    beforeEach((done) => { //Before each test we empty the database
        ProductModel.remove({}, (err) => { 
           done();           
        });        
    });
    describe('/GET Product', () => {
        it('it should GET all the products', (done) => {
          chai.request(server)
              .get('/products/')
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();
              });
        });
    });
    describe('/POST product', () => {
        it('it should not POST a product without price field', (done) => {
            let product = {
                name: "Laptop Hp",
                quantity: 100,
                description:"this is avery good product"
            }
          chai.request(server)
              .post('/products/')
              .send(product)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('price');
                    res.body.errors.should.have.property('price');
                    res.body.errors.price.should.have.property('kind').eql('required');
                done();
              });
        });
        it('it should POST a product ', (done) => {
            let product = {
                name: "Laptop Hp ",
                price: 5000,
                quantity: 100,
                description: "this is a professional product"
            }
          chai.request(server)
              .post('/products/')
              .send(product)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('product successfully added!');
                    res.body.product.should.have.property('name');
                    res.body.product.should.have.property('price');
                    res.body.product.should.have.property('quantity');
                    res.body.product.should.have.property('description');
                    
                done();
              });
            });
        });

              describe('/GET/:name product', () => {
                it('it should GET a product by the given id', (done) => {
                    let product = new ProductModel({ name: "Laptop Dell", price: 5000, quantity: 100, description: "this is a nice product" });
                    product.save((err, product) => {
                        chai.request(server)
                      .get('/products/' + product.name)
                      .send(product)
                      .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('name');
                            res.body.should.have.property('price');
                            res.body.should.have.property('quantity');
                            res.body.should.have.property('description');
                            res.body.should.have.property('name').eql(product.name);
                        done();
                      });
                    });
          
                });
            });
    // describe('/patch/:name product', () => {
    //     it('it should UPDATE a product given the id', (done) => {
    //         let product = new ProductModel({name: "Laptop Dell", price: 8000, quantity: 200, description: "this is a nice product"})
    //         product.save((err, product) => {
    //               chai.request(server)
    //               .patch('/products/' + product.name)
    //               .send({name: "iphone", price: 13000, quantity: 2000, description: "wooow this amazing"})
    //               .end((err, res) => {
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     res.body.should.have.property('message').eql('product updated!');
    //                     res.body.book.should.have.property('price').eql(13000);
    //                 done();
    //               });
    //             });
    //         });
    //     });
                  describe('/DELETE/:name product', () => {
                    it('it should DELETE a product given the name', (done) => {
                        let product = new ProductModel({name: "Laptop Dell", price: 8000, quantity: 200, description:"this is a nice product"})
                        product.save((err, product) => {
                              chai.request(server)
                              .delete('/products/' + product.name)
                              .end((err, res) => {
                                    res.should.have.status(200);
                                    res.body.should.be.a('object');
                                    res.body.should.have.property('message').eql('product successfully deleted!');
                                    res.body.result.should.have.property('ok').eql(1);
                                    res.body.result.should.have.property('n').eql(1);
                                done();
                              });
                        });
                    });
                });
           
   
  
  });