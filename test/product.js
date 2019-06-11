process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
let token = "";
let productId = "";

chai.use(chaiHttp);
//Our parent block
describe('Task API Products', () => {

  describe('/POST Authenticate', () => {
      it('it should authenticar To user', (done) => {
        chai.request(server)
            .post('/api/authenticate')
            .send({'email': 'efaby10@gmail.com', 'password': '123456'})
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  token = res.body.token;
              done();
            });
      });
  });

  describe('/GET product', () => {
      it('it should GET all the product', (done) => {
        chai.request(server)
            .get('/api/product')
            .set('access-token', token)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('products');
              done();
            });
      });
  });

  describe('/POST Product', () => {
      it('it should POST a product to save', (done) => {
        let product = {
            name: "Sansung",
            picture: "cell.png",
            price: 120,
            description: "CEll sansung a good product",
            category: "phones"
        }
        chai.request(server)
        .post('/api/product')
        .set('access-token', token)
        .send(product)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('product');
              productId = res.body.product._id;
          done();
        });
      });
  });

  describe('/GET/:id product', () => {
      it('it should GET a product by the given id', (done) => {
        chai.request(server)
          .get('/api/product/' + productId)
          .set('access-token', token)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('product');
                res.body.product.should.have.property('_id').eql(productId);
            done();
          });
      });
  });

  describe('/PUT/:id product', () => {
      it('it should UPDATE a product given the id', (done) => {
        let product = {
            name: "Sansung S7",
            picture: "sansung.png",
            price: 120,
            description: "CEll sansung a good product",
            category: "phones"
        }
        chai.request(server)
          .put('/api/product/' + productId)
          .set('access-token', token)
          .send(product)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('product');
                res.body.product.should.have.property('_id').eql(productId);
            done();
          });
      });
  });

  describe('/DELETE/:id product', () => {
      it('it should DELETE a product given the id', (done) => {
        chai.request(server)
        .delete('/api/product/' + productId)
        .set('access-token', token)
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message').eql('Product successfully deleted!');
          done();
        });
         
      });
  });

});