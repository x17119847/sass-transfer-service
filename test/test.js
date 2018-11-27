'use strict';
const expect = require('chai').expect;
const axios = require('axios');

// Testing if the API is running
describe('testing that the API is running', function() {
  it('should be running', function() {
    axios.get('http://localhost:3000')
      .then(response => {
        expect(response.status).to.be.equal(200);
      })
      .catch(error => {
        console.log(error);
      });
  });
});

// Testing the Companies endpoint
describe('testing User endpoint', function() {
  it('should responde with Status 200', function() {
    axios.get('http://localhost:3000/api/companies')
      .then(response => {
        expect(response.status).to.be.equal(200);
      });
  });
});
