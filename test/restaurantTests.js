var chai		= require('chai');
var supertest	= require('supertest');
var app			= require('../index.js');
var logger		= require('morgan');
var assert		= chai.assert;
var request		= supertest(app);

var delTables 	= require('../dynamoDB/deleteTables');
var popTables 	= require('../dev/populateTables');

global.app		= app;  
global.expect 	= chai.expect;  
global.request 	= supertest(app);  

global.process.env.NODE_ENV = 'test';
if (process.env.NODE_ENV == 'test') {
	console.error = function() {};
}

describe('Restaurant Endpoint', function() {
	beforeEach(function(done) {
        popTables();
        done();
    });

   
	describe('/Restaurants', function() {

		describe('GET', function() {
		 	// Arbitrary GET request
  			it('Should run without error', function(done) {
    			request.get('/Restaurants')
      			.expect(200)
      			.end(function(err, res) {
      				done(err);
    			});
  			});
		});

		describe('POST', function() {
		 	// TODO: COMPLETE POST TEST
  			it('Should run without error', function(done) {
    			request.get('/Restaurants')
      			.expect(200)
      			.end(function(err, res) {
      				done(err);
    			});
  			});
		});
	});

	// Trying to get a Restaurant that doesn't exist
	describe('/Restaurants/:id', function() {
		describe('GET', function() {
		 	// Arbitrary GET request
  			it('Should return return 200 status code', function(done) {
    			request.get('/Restaurants/1')
      			.expect(200)
      			.end(function(err, res) {
      				done(err);
    			});
  			});
		});
	});

// // Restaurants Table doesn't exist
//  		it('Should return return 400 status code', function(done) {
//    		request.get('/Restaurants')
//      		.expect(400)
//      		.end(function(err, res) {
//      			done(err);
//    		});
//  		});
});