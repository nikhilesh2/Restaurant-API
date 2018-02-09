var chai		= require('chai');
var supertest	= require('supertest');
var app			= require('../index.js');
var logger		= require('morgan');
var assert		= chai.assert;
var should 		= chai.should();
var request		= supertest(app);
var execSync 	= require('child_process').execSync;



const SAMPLE_RESTAURANTS 	= require('./restaurantSample');
const SAMPLE_MENUS 	= require('./menuSample');

global.app		= app;  
global.expect 	= chai.expect;  
global.request 	= supertest(app);  

global.process.env.NODE_ENV = 'test';
if (process.env.NODE_ENV == 'test') {
	console.error = function() {};
}

describe('Setting up Tests', function() {
	before(function(done) {
		console.log('  Initializing database...' )
		execSync('npm run build-tables');
		console.log('  Starting tests...' )
		done();
	})
	describe('Restaurant Endpoints', function() {

		describe('/Restaurants', function() {

			describe('GET', function() {
		 		// Make a GET request
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
		 		it('Should add restaurant successfully (includes image_url)', function(done) {
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
				it('Should add restaurant successfully (excludes image_url)', function(done) {
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
				it('Should not add restaurant', function(done) {
					request.post('/Restaurants')
					.send(SAMPLE_RESTAURANTS.incorrect)
					.expect(400)
					.end(function(err, res) {
						done(err);
					});
				});
				// Make a POST request with empty paramters
				it('Should not add restaurant', function(done) {
					request.post('/Restaurants')
					.send()
					.expect(400)
					.end(function(err, res) {
						done(err);
					});
				});
			});
			describe('DELETE', function() {
		 		// GET request
		 		it('Should delete all restaurants', function(done) {
		 			request.delete('/Restaurants')
		 			.expect(200)
		 			.end(function(err, res) {
		 				done(err);
		 			});
		 		});

		 		after(function(done) {
		 			execSync('npm run populate-tables');
		 			done();
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
			 	it('Should return restaurant', function(done) {
			 		request.get('/Restaurants/' + SAMPLE_RESTAURANTS.data[0].id)
			 		.expect(200)
			 		.end(function(err, res) {
			 			expect(res.body.id).to.equal(SAMPLE_RESTAURANTS.data[0].id);
			 			done(err);
			 		});
			 	});
			 });
			describe('POST', function() {
				it('Should return 405, method not allowed', function(done) {
			 		request.post('/Restaurants/someId')
			 		.expect(405)
			 		.end(function(err, res) {
			 			// expect(res.body).to.deep.equal({ statusCode: 404, message: "Unable to perform the request" });
			 			done(err);
			 		});
			 	});
			});
			describe('DELETE', function() {

			 	// Trying to delete an existing restaurant
			 	it('Should successfully delete restaurant', function(done) {
			 		request.delete('/Restaurants/' + SAMPLE_RESTAURANTS.data[0].id)
			 		.expect(200)
			 		.end(function(err, res) {
			 			expect(res.body.Item).to.deep.equal(SAMPLE_RESTAURANTS.data[0]);			 		
			 			done(err);
			 		});
			 	});

			 	// Trying to delete a restaurant that doesn't exist in database
			 	it('Should return 404 (restaurant does not exist)', function(done) {
			 		request.delete('/Restaurants/BLAH')
			 		.expect(404)
			 		.end(function(err, res) {
			 			expect(res.body).to.deep.equal({ statusCode: 404, message: 'Item not found' });
			 			done(err);
			 		});
			 	});
			 	after(function(done) {
			 		console.log("\t  Repopulating tables...")
			 		execSync('npm run populate-tables');
		 			done();
			 	})
			 });
		});

		describe('/:id/menus', function() {
			beforeEach(function(done) {
				// popTables();
				done();
			});
			describe('GET', function() {
			 	// Arbitrary GET request
			 	it('Should return an array of menus with length ' + SAMPLE_RESTAURANTS.data[0].menu_ids.length, function(done) {
			 		request.get('/Restaurants/' + SAMPLE_RESTAURANTS.data[0].id + '/menus')
			 		.expect(200)
			 		.end(function(err, res) {
			 			expect(res.body.count).to.equal(SAMPLE_RESTAURANTS.data[0].menu_ids.length);
			 			done(err);
			 		});
			 	});
			 });
			describe('POST', function() {
				it('Should return 405, method not allowed', function(done) {
			 		request.post('/Restaurants/' + SAMPLE_RESTAURANTS.data[0].id + '/menus')
			 		.expect(405)
			 		.end(function(err, res) {
			 			res.body.should.have.property('statusCode').eql(405);
		 				res.body.should.have.property('message').eql('Method not allowed');
			 			done(err);
			 		});
			 	});
			});
		});


		describe('/search', function() {
			describe('GET', function() {
				// Making search with valid attribute and existent value
				it('Should return a restaurant', function(done) {
					request.get('/Restaurants/search')
					.send({name: SAMPLE_RESTAURANTS.data[0].name})
					.expect(200)
					.end(function(err, res) {
						res.body.should.be.a('array');
						expect(res.body[0].name).to.equal(SAMPLE_RESTAURANTS.data[0].name);
						done(err);
					});
				});
				// Making search with multiple valid attributes and existent value
				it('Should return multiple restaurants', function(done) {
					request.get('/Restaurants/search')
					.send({city: SAMPLE_RESTAURANTS.data[0].city, zip_code: SAMPLE_RESTAURANTS.data[0].zip_code})
					.expect(200)
					.end(function(err, res) {
						res.body.should.be.a('array');
						expect(res.body.length).to.be.at.least(2);
						done(err);
					});
				});
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
			});
			describe('POST', function() {
				it('Should return 405, method not allowed', function(done) {
			 		request.post('/Restaurants/search')
			 		.expect(405)
			 		.end(function(err, res) {
			 			res.body.should.have.property('statusCode').eql(405);
		 				res.body.should.have.property('message').eql('Method not allowed');
			 			done(err);
			 		});
			 	});
			});
			describe('DELETE', function() {
				it('Should return 405, method not allowed', function(done) {
			 		request.post('/Restaurants/search')
			 		.expect(405)
			 		.end(function(err, res) {
			 			res.body.should.have.property('statusCode').eql(405);
		 				res.body.should.have.property('message').eql('Method not allowed');
			 			done(err);
			 		});
			 	});
			});
		});

	});
})
