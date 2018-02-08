var chai		= require('chai');
var supertest	= require('supertest');
var app			= require('../index.js');
var logger		= require('morgan');
var assert		= chai.assert;
var should 		= chai.should();
var request		= supertest(app);
var execSync 	= require('child_process').execSync;
var verifiers 	= require('../utils/verifier');
var generateID	= require('../utils/generateID');

const SAMPLE_RESTAURANTS 	= require('./restaurantSample');
const SAMPLE_MENUS 	= require('./menuSample');
const SAMPLE_MENUITEMS 	= require('./menuItemSample');

global.app		= app;  
global.expect 	= chai.expect;  
global.request 	= supertest(app);  

global.process.env.NODE_ENV = 'test';
if (process.env.NODE_ENV == 'test') {
	console.error = function() {};
}

describe('', function() {
	
	describe('Other Methods', function() {

		describe('Verifiers', function() {

			describe('verifyRestaurant_POST', function() {
				it('Should return "invalid request object"', function(done) {
					const response = verifiers.verifyRestaurant_POST();
					response.should.deep.eql({statusCode: 400, message: "Invalid request object"});
					done();
				})
				it('Should return array of missing attributes"', function(done) {
					const response = verifiers.verifyRestaurant_POST({});
					response.statusCode.should.eql(400);
					response.messages.length.should.eql(9);
					done();
				})
				it('Should return "ID attribute should not be passed in"', function(done) {
					const response = verifiers.verifyRestaurant_POST(SAMPLE_RESTAURANTS.data[0]);
					response.statusCode.should.eql(400);
					response.messages.length.should.eql(1);
					response.messages[0].should.eql("ID attribute should not be passed in");
					done();
				})
				it('Should verify restaurant successfully"', function(done) {
					const id = SAMPLE_RESTAURANTS.data[0].id;
		 			const correct_data = SAMPLE_RESTAURANTS.data[0];
		 			delete correct_data.id;
					
					const response = verifiers.verifyRestaurant_POST(correct_data);

					response.statusCode.should.eql(200);
					response.messages.length.should.eql(0);

					correct_data.id = id; // reset id
					done();
				})
			});

			describe('verifyMenu_POST', function() {
				it('Should return "invalid request object"', function(done) {
					const response = verifiers.verifyMenu_POST();
					response.should.deep.eql({statusCode: 400, message: "Invalid request object"});
					done();
				})
				it('Should return array of missing attributes"', function(done) {
					const response = verifiers.verifyMenu_POST({});
					response.statusCode.should.eql(400);
					response.messages.length.should.eql(4);
					done();
				})
				it('Should return "ID attribute should not be passed in"', function(done) {
					const response = verifiers.verifyMenu_POST(SAMPLE_MENUS.data[0]);

					response.statusCode.should.eql(400);
					response.messages.length.should.eql(2);
					response.messages[0].should.eql("ID attribute should not be passed in");
					done();
				})
				it('Should verify menu successfully"', function(done) {
					const id = SAMPLE_MENUS.data[0].id;
		 			const correct_data = SAMPLE_MENUS.data[0];
		 			delete correct_data.id;
					
					const response = verifiers.verifyMenu_POST(correct_data);

					response.statusCode.should.eql(200);
					response.messages.length.should.eql(0);

					correct_data.id = id; // reset id
					done();
				})
			});

			describe('verifyMenuItem_POST', function() {
				it('Should return "invalid request object"', function(done) {
					const response = verifiers.verifyMenuItem_POST();
					response.should.deep.eql({statusCode: 400, message: "Invalid request object"});
					done();
				})
				it('Should return array of missing attributes"', function(done) {
					const response = verifiers.verifyMenuItem_POST({});

					response.statusCode.should.eql(400);
					response.messages.length.should.eql(9);
					done();
				})
				it('Should return "ID attribute should not be passed in"', function(done) {
					const response = verifiers.verifyMenuItem_POST(SAMPLE_MENUITEMS.data[0]);

					response.statusCode.should.eql(400);
					response.messages.length.should.eql(1);
					response.messages[0].should.eql("ID attribute should not be passed in");
					done();
				})
				it('Should verify menu item successfully"', function(done) {
					const id = SAMPLE_MENUITEMS.data[0].id;
		 			const correct_data = SAMPLE_MENUITEMS.data[0];
		 			delete correct_data.id;
					
					const response = verifiers.verifyMenuItem_POST(correct_data);

					response.statusCode.should.eql(200);
					response.messages.length.should.eql(0);

					correct_data.id = id; // reset id
					done();
				})
			});
		});
		describe('Generate ID', function() {
			it("should generate an ID", function(done) {
				const id = generateID();
				id.should.be.a('string');
				done();
			})
		})
	})
})
