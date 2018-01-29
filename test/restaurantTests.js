var chai		= require('chai');
var supertest	= require('supertest');
var app			= require('../index.js');
var logger		= require('morgan');
var assert		= chai.assert;
var should 		= chai.should();
var request		= supertest(app);


// var delTables 	= require('../dynamoDB/deleteTables');
var popTables 	= require('../dev/populateTables');
const SAMPLES = require('./restaurantSample');

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
		 	// Make a valid POST request
  			it('Should add item successfully', function(done) {
    			request.post('/Restaurants')
    			.send(SAMPLES.correct)
      			.expect(200)
      			.end(function(err, res) {
      				done(err);
				});
			});

			// Make an invalid POST request
  			it('Should not add item', function(done) {
    			request.post('/Restaurants')
    			.send(SAMPLES.incorrect)
      			.expect(400)
      			.end(function(err, res) {
      				done(err);
				});
			});
			it('Should not add item', function(done) {
    			request.post('/Restaurants')
    			.send()
      			.expect(400)
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
  			it('Should have empty response', function(done) {
    			request.get('/Restaurants/BLAH')
      			.expect(200)
				.end(function(err, res) {
                	res.body.Items.should.be.a('array');
                	// res.body.Items.length.should.be.eql(0);
					done(err);
				});
			});
		});
	});

	describe('/search', function() {
		describe('GET', function() {
		 	
		 	// Arbitrary GET request
  			it('Should have empty response', function(done) {
    			request.get('/Restaurants/search')
    			.send({zip_code: 'blah'})
      			.expect(200)
				.end(function(err, res) {
                	res.body.should.be.a('array');
                	res.body.length.should.be.eql(0);
					done(err);
				});
			});

			it('Should return 400 status code', function(done) {
    			request.get('/Restaurants/search')
    			.send({})
      			.expect(400)
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