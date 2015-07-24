var request = require('request')
 , expect = require('chai').expect;


describe('Home', function() {
 it('should have a HTTP of 200 - success', function(done) {
   request('http://localhost:3000/', function(err, res, body) {
     expect(res.statusCode).to.equal(200)
     // expect(res.statusCode).to.equal(300)
     done();
   })
 })
});

describe('Profile', function() {
 it('should have a HTTP of 200 - success', function(done) {
   request('http://localhost:3000/profile', function(err, res, body) {
     expect(res.statusCode).to.equal(200)
     // expect(res.statusCode).to.equal(300)
     done();
   })
 })
});

//HELP!!!!
describe('Project', function() {
 it('should have a HTTP of 200 - success', function(done) {
   request('http://localhost:3000/projects', function(err, res, body) {
     expect(res.statusCode).to.equal(200)
     // expect(res.statusCode).to.equal(300)
     done();
   })
 })
});