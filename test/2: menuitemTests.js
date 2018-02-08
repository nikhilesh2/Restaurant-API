var chai		= require('chai');
var supertest	= require('supertest');
var app			= require('../index.js');
var logger		= require('morgan');
var assert		= chai.assert;
var should 		= chai.should();
var request		= supertest(app);
var execSync 	= require('child_process').execSync;

const SAMPLE_MENUITEMS 	= require('./menuItemSample');

global.app		= app;  
global.expect 	= chai.expect;  
global.request 	= supertest(app);  

global.process.env.NODE_ENV = 'test';
if (process.env.NODE_ENV == 'test') {
	console.error = function() {};
}

describe('', function() {
	
	describe('Menu Items Endpoints', function() {

		describe('/menu-items', function() {

			describe('GET', function() {
		 		// Make a GET request
		 		it('Should run without error', function(done) {
		 			request.get('/menu-items')
		 			.expect(200)
		 			.end(function(err, res) {
		 				res.body.should.be.a('array');
		 				done(err);
		 			});
		 		});
			});

			describe('POST', function() {

				after(function(done) {
					console.log("\t  Repopulating tables...")
					execSync('npm run populate-tables');
					done();
				})

		 		it('Should return status code 400, bad request (id passed in)', function(done) {
		 			request.post('/menu-items')
		 			.send(SAMPLE_MENUITEMS.data[0])
		 			.expect(400)
		 			.end(function(err, res) {
		 				done(err);
		 			});
		 		});
		 		it('Should return status code 400, bad request (invalid request object)', function(done) {
		 			request.post('/menu-items')
		 			.send({})
		 			.expect(400)
		 			.end(function(err, res) {
		 				done(err);
		 			});
		 		});
		 		it('Should add menu item successfully ', function(done) {
		 			const id = SAMPLE_MENUITEMS.data[0].id;
		 			var correct_data = SAMPLE_MENUITEMS.data[0];
		 			delete correct_data.id;
		 			request.post('/menu-items')
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

				it('Should return a menu item', function(done) {
		 			request.get('/menu-items/' + SAMPLE_MENUITEMS.data[0].id)
		 			.expect(200)
		 			.end(function(err, res) {
		 				res.body.should.have.property('id').eql(SAMPLE_MENUITEMS.data[0].id);
		 				res.body.should.have.property('menu_id').eql(SAMPLE_MENUITEMS.data[0].menu_id);
		 				res.body.should.have.property('section').eql(SAMPLE_MENUITEMS.data[0].section);
		 				res.body.should.have.property('food_spec').should.be.a('object');
		 				res.body.should.have.property('food_spec');
		 				res.body.food_spec.should.have.property('isVegan').eql(SAMPLE_MENUITEMS.data[0].isVegan);
		 				res.body.food_spec.should.have.property('isVegetarian').eql(SAMPLE_MENUITEMS.data[0].isVegetarian);
		 				res.body.food_spec.should.have.property('spicy').eql(SAMPLE_MENUITEMS.data[0].spicy);
		 				res.body.food_spec.should.have.property('allergies').eql(SAMPLE_MENUITEMS.data[0].allergies);
		 				res.body.should.have.property('section').should.be.a('object');
		 				done(err);
		 			});
		 		});
			});
			describe('POST', function() {

				it('Should return 405, method not allowed', function(done) {
		 			request.post('/menu-items/' + SAMPLE_MENUITEMS.data[0].id)
		 			.expect(405)
		 			.end(function(err, res) {
		 				res.body.should.have.property('statusCode').eql(405);
		 				res.body.should.have.property('message').eql('Method not allowed');
		 				done(err);
		 			});
		 		});
			});

			describe('DELETE', function() {

				it('Should delete menu', function(done) {
		 			request.delete('/menu-items/' + SAMPLE_MENUITEMS.data[0].id)
		 			.expect(200)
		 			.end(function(err, res) {
		 				res.body.should.have.property('statusCode').eql(200);
		 				res.body.Item.should.have.property('id').eql(SAMPLE_MENUITEMS.data[0].id);
		 				res.body.Item.should.have.property('menu_id').eql(SAMPLE_MENUITEMS.data[0].menu_id);
		 				res.body.Item.should.have.property('section').eql(SAMPLE_MENUITEMS.data[0].section);
		 				res.body.Item.should.have.property('isVegan').eql(SAMPLE_MENUITEMS.data[0].isVegan);
		 				res.body.Item.should.have.property('isVegetarian').eql(SAMPLE_MENUITEMS.data[0].isVegetarian);
		 				res.body.Item.should.have.property('spicy').eql(SAMPLE_MENUITEMS.data[0].spicy);
		 				res.body.Item.should.have.property('allergies').eql(SAMPLE_MENUITEMS.data[0].allergies);
		 				res.body.Item.should.have.property('section').should.be.a('object');
		 				done(err);
		 			});
		 		});
			});
		})
	});
})
