'use strict';
const expect = require('chai').expect;
const axios = require('axios');

// Testing the Base Get endpoint
describe('testing Base endpoint', function() {
  it('should responde with Status 200', function() {
    axios.get('http://localhost:3000/api/bases')
      .then(response => {
        expect(response.status).to.be.equal(200);
      });
  });
});
