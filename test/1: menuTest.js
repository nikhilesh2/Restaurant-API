var chai		= require('chai');
var supertest	= require('supertest');
var app			= require('../index.js');
var logger		= require('morgan');
var assert		= chai.assert;
var should 		= chai.should();
var request		= supertest(app);
var execSync 	= require('child_process').execSync;

const SAMPLE_MENUS 	= require('./menuSample');

global.app		= app;  
global.expect 	= chai.expect;  
global.request 	= supertest(app);  

global.process.env.NODE_ENV = 'test';
if (process.env.NODE_ENV == 'test') {
	console.error = function() {};
}

describe('', function() {
	
	describe('Menu Endpoints', function() {

		describe('/menus', function() {

			describe('GET', function() {
		 		// Make a GET request
		 		it('Should run without error', function(done) {
		 			request.get('/menus')
		 			.expect(200)
		 			.end(function(err, res) {
		 				res.body.should.be.a('array');
		 				done(err);
		 			});
		 		});
			});

			describe('POST', function() {
				before(function(done) {
					console.log("\t  Clearing tables...")
					execSync('npm run delete-tables && npm run create-tables');
					done();
					
				})
				after(function(done) {
					console.log("\t  Repopulating tables...")
					execSync('npm run populate-tables');
					done();
				})

		 		it('Should return status code 400, bad request (id passed in)', function(done) {
		 			request.post('/menus')
		 			.send(SAMPLE_MENUS.data[0])
		 			.expect(400)
		 			.end(function(err, res) {
		 				done(err);
		 			});
		 		});
		 		it('Should return status code 400, bad request (invalid request object)', function(done) {
		 			request.post('/menus')
		 			.send({})
		 			.expect(400)
		 			.end(function(err, res) {
		 				done(err);
		 			});
		 		});
		 		it('Should add menu successfully ', function(done) {
		 			const id = SAMPLE_MENUS.data[0].id;
		 			var correct_data = SAMPLE_MENUS.data[0];
		 			delete correct_data.id;

		 			request.post('/menus')
		 			.send(correct_data)
		 			.expect(201)
		 			.end(function(err, res) {
		 				correct_data.id = id; // reset id
		 				done(err);
		 			});
		 		});
			});

			describe('DELETE', function() {
				after(function(done) {
					execSync('npm run populate-tables');
					done();
				})
				it('Should delete all menus ', function(done) {
		 			request.delete('/menus')
		 			.expect(200)
		 			.end(function(err, res) {
		 				for(var i in res.body) {
		 					res.body[i].should.have.property('message').eql('Deleted item successfully');
		 					res.body[i].should.have.property('statusCode').eql(200);
		 				}
		 				done(err);
		 			});
		 		});
			});
		});
		describe('/:id', function() {
			
			describe('GET', function() {

				it('Should return menu', function(done) {
		 			request.get('/menus/' + SAMPLE_MENUS.data[0].id)
		 			.expect(200)
		 			.end(function(err, res) {
		 				res.body.should.have.property('id').eql(SAMPLE_MENUS.data[0].id);
		 				res.body.should.have.property('restaurant_id').eql(SAMPLE_MENUS.data[0].restaurant_id);
		 				res.body.should.have.property('type').eql(SAMPLE_MENUS.data[0].type);
		 				res.body.should.have.property('hours').should.be.a('object');
		 				res.body.should.have.property('sections').should.be.a('object');
		 				done(err);
		 			});
		 		});
			});
			describe('POST', function() {

				it('Should return 405, method not allowed', function(done) {
		 			request.post('/menus/' + SAMPLE_MENUS.data[0].id)
		 			.expect(405)
		 			.end(function(err, res) {
		 				res.body.should.have.property('statusCode').eql(405);
		 				res.body.should.have.property('message').eql('Method not allowed');
		 				done(err);
		 			});
		 		});
			});
			//TODO
			describe('DELETE', function() {

				// it('Should return 405, method not allowed', function(done) {
		 	// 		request.post('/menus/' + SAMPLE_MENUS.data[0].id)
		 	// 		.expect(405)
		 	// 		.end(function(err, res) {
		 	// 			res.body.should.have.property('statusCode').eql(405);
		 	// 			res.body.should.have.property('message').eql('Method not allowed');
		 	// 			done(err);
		 	// 		});
		 	// 	});
			});
		})

	});
})
