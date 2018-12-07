'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const axios = require('axios');
const keys = require('./config/keys')
const should = chai.should();

const server = keys.sassTransferServiceAPIURI;
const api = server + '/api';

const endpoints = ["Bases","Bookings","BookingPrices","Companies","Customers","Drivers","PaxTypes","Places","Routes","RoutePrices","Services","Users","Vehicles","VehicleTypes"];

chai.use(chaiHttp);

it('The server should be accessible.', done => {
  chai.request(server)
    .get('/')
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
});

endpoints.forEach(endpoint => {
  it(`Unauthorized users should return 401 status for ${endpoint}.`, done => {
    chai.request(api)
      .get(`/${endpoint}`)
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw new Error(err);
        }
        else {
          res.should.have.status(401);
          res.should.be.json;
          done();
        }
      });
  });

})


it('Server should be able to login', done => {
  chai.request(api)
    .post('/Users/login')
    .send({
      email: keys.sassTransferServiceAPIEmail,
      password: keys.sassTransferServiceAPIPassword
    })
    .end((err, res) => {
      if (err) {
        throw new Error(err);
      }
      else {
        res.should.have.status(200);
        res.should.be.json;
      }
      done();
    });
});


it('Server should not be able to login with wrong username or password', done => {
  chai.request(api)
    .post('/Users/login')
    .send({
      email: "some@email.com",
      password: "wrong password"
    })
    .end((err, res) => {
      if (err) {
        throw new Error(err);
      }
      else {
        res.should.have.status(401); 
        res.should.be.json;       
      }
      done();
    });
});


endpoints.forEach(endpoint => {
  it(`Logged in Servers should be able to access the ${endpoint} endpoint`, done => {
    chai.request(api)
      .post('/Users/login')
      .send({
        email: keys.sassTransferServiceAPIEmail,
        password: keys.sassTransferServiceAPIPassword
      })
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        else {
          let token = res.body.id;
          chai.request(api)
            .get(`/${endpoint}?access_token=${token}`)        
            .end((error, response) => {
              if(error) {
                throw new Eror(error);
              }
              else {
                if(endpoint == "Users") {
                  response.should.have.status(401);
                }
                else {
                  response.should.have.status(200);
                }
                response.should.be.json;
              }          
              done();
            });
        }
      });
  });
});



/*
// Test the Server Login
describe('testing the Server User login', function () {
  
  it('Should responde with Status 200 for correct login.', function () {
    axios.post(`${keys.sassTransferServiceAPIURI}/api/Users/login`, {
      email: keys.sassTransferServiceAPIEmail + "okokok",
      password: keys.sassTransferServiceAPIPassword
    })
      .then(response => {
        console.log(response.data, response.status)
        expect(response.status).to.be.equal(200);
      })
      .catch(error => {
        console.log("error logging in", error.response.status, error.response.statusText)
        expect(error.response.status).to.be.equal(200);
      });
  });
  
  it('Should responde with Status 401 for incorrect login.', function () {
    axios.post(`${keys.sassTransferServiceAPIURI}/api/Users/login`, {
      email: "wrong@email.com",
      password: "wrong password"
    })
      .then(response => {
        expect(response.status).to.be.equal(401);
      })
      .catch(error => {
        expect(error.response.status).to.not.be.equal(200);
      });
  });

});
*/