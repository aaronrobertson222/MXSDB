const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const {app, runServer, closeServer} = require('../app');
const {User} = require('../users/index')
const {TEST_DATABASE_URL} = require('../config');

const should = chai.should();

chai.use(chaiHttp);

// Seeds Database with user data for tests
function seedUserData() {
  console.log('Seeding test database with user data...');

  const seedData = [];

  for (let i=0; i<=10; i++) {
    seedData.push({
      username: faker.internet.userName(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      accountLevel: 'user',
      joinedDate: Date.now(),
      uploads: 0
    });
  }
  return User.insertMany(seedData);
}

// Tears down test db deleteing all data
function tearDownTestDb() {
  console.warn('Deleting test database');
  return mongoose.connection.dropDatabase();
}

describe('User API Test', function() {
  // starts the server before any tests run
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });
  // before each test runs, seed database with data
  beforeEach(function() {
    return seedUserData();
  });
  // after each test completes, calls tear down function to erase database
  afterEach(function() {
    return tearDownTestDb();
  });
  //after all test complete, shutsdown server
  after(function() {
    return closeServer();
  });

  describe('GET Endpoint', function() {

  });

  describe('POST ENDPOINT', function() {
    it('should add a new user to the database', function() {
        const newUser = {
          username: faker.internet.userName(),
          password: faker.internet.password(),
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          userLevel: 'user',
          uploads: 0,
          joinedDate: Date.now()
        };
        return chai.request(app)
          .post('/users')
          .send(newUser)
          .then(function(res) {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.include.keys('username', 'name', 'id', 'userLevel', 'uploads', 'joinedDate');
            res.body.id.should.not.be.null;
            res.body.username.should.equal(newUser.username);
            res.body.name.should.equal(`${newUser.firstName} ${newUser.lastName}`);
            return User.findById(res.body.id).exec();
          })
          .then(function(user) {
            user.username.should.equal(newUser.username);
            user.firstName.should.equal(newUser.firstName);
            user.lastName.should.equal(newUser.lastName);
          });
    });
  });
});
