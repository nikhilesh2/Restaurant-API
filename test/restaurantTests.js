var chai		= require('chai');
var supertest	= require('supertest');
var app			= require('../index.js');
var logger		= require('morgan');
var assert		= chai.assert;
var should 		= chai.should();
var request		= supertest(app);


// var delTables 	= require('../dynamoDB/deleteTables');
// var popTables 	= require('../dev/populateTables');
const SAMPLE_RESTAURANTS 	= require('./restaurantSample');
const SAMPLE_MENUS 	= require('./menuSample');

global.app		= app;  
global.expect 	= chai.expect;  
global.request 	= supertest(app);  

global.process.env.NODE_ENV = 'test';
if (process.env.NODE_ENV == 'test') {
	console.error = function() {};
}



describe('Restaurant Endpoint', function() {
	beforeEach(function(done) {
		// popTables();
		done();
	});

	describe('/Restaurants', function() {

		describe('GET', function() {
		 	// GET request
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
  			it('Should add item successfully (includes image_url)', function(done) {
    			request.post('/Restaurants')
    			.send(SAMPLE_RESTAURANTS.correct)
      			.expect(201)

      			.end(function(err, res) {
      				expect(res.body.Item[0]).to.have.property('image_url', 'https://google.com');
      				request.delete('/Restaurants/' + res.body.Item[0].id) // remove restaurant we just added
      				done(err);
				});
			});
			// Make a valid POST request without image_url
  			it('Should add item successfully (excludes image_url)', function(done) {

    			request.post('/Restaurants')
    			.send(SAMPLE_RESTAURANTS.correct_no_url)
      			.expect(201)

      			.end(function(err, res) {
      				expect(res.body.Item[0]).to.have.property('image_url', '');
      				request.delete('/Restaurants/' + res.body.Item[0].id) // remove restaurant we just added
      				done(err);
				});
			});

			// Make an invalid POST request
  			it('Should not add item', function(done) {
    			request.post('/Restaurants')
    			.send(SAMPLE_RESTAURANTS.incorrect)
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
	describe('/:id', function() {
		describe('GET', function() {
		 	// Arbitrary GET request
  			it('Should have empty response', function(done) {
    			request.get('/Restaurants/BLAH')
      			.expect(404)
				.end(function(err, res) {
                	expect(res.body).to.deep.equal({ statusCode: 404, message: "Unable to perform the request" });
					done(err);
				});
			});
		});
		describe('DELETE', function() {
		 	
		 	// Trying to delete an object that doesn't exist in database
  			it('Should return 404 (item does not exist)', function(done) {
    			request.delete('/Restaurants/BLAH')
      			.expect(404)
				.end(function(err, res) {
                	expect(res.body).to.deep.equal({ statusCode: 404, message: 'Item not found' });
					done(err);
				});
			});

		});
	});

		describe('/:id/menus', function() {
		beforeEach(function(done) {
			// popTables();
			done();
		});
		describe('GET', function() {
		 	// Arbitrary GET request
  			it('Should return an array of length ' + SAMPLE_RESTAURANTS.data[0].menu_ids.length, function(done) {
    			request.get('/Restaurants/' + SAMPLE_RESTAURANTS.data[0].id + '/menus')
      			.expect(200)
				.end(function(err, res) {
                	expect(res.body.count).to.equal(SAMPLE_RESTAURANTS.data[0].menu_ids.length);
					done(err);
				});
			});
		});
	});


	describe('/search', function() {
		describe('GET', function() {
			// Making search with valid attribute but non existent value
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
  			// Making search with empty object
			it('Should return 400 status code (empty object)', function(done) {
    			request.get('/Restaurants/search')
    			.send({})
      			.expect(400)
				.end(function(err, res) {
					done(err);
				});
			});
			// Making search with empty string
			it('Should return 400 status code (empty string)', function(done) {
    			request.get('/Restaurants/search')
    			.send('invalid')
      			.expect(400)
				.end(function(err, res) {
					done(err);
				});
			});
			// Making search with empty string
			it('Should return 200 status code', function(done) {
    			request.get('/Restaurants/search')
    			.send({name: 'Pizza Mart', zip_code: '02067'})
      			.expect(200)
				.end(function(err, res) {
					done(err);
				});
			});
		});
	});


});