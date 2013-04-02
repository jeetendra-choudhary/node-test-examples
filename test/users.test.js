// Generated by CoffeeScript 1.5.0
(function() {
  var User, expect, testHelpers, users;

  process.env.NODE_ENV = "testing";

  expect = require("chai").expect;

  testHelpers = require("./testHelpers");

  users = require("../lib/users");

  User = require("../lib/models").User;

  before(function(done) {
    return testHelpers.clearDatabase(done);
  });

  describe("Database test example: Getting data from db", function() {
    var getUser;
    getUser = users.getUser;
    before(function(done) {
      var mockUsers;
      mockUsers = require("./mocks/users");
      return User.create(mockUsers, done);
    });
    it("should get the user by supplying the name in input", function(done) {
      var data;
      data = {
        name: "Caesar"
      };
      return getUser(data, function(err, result) {
        expect(result.name).to.be.equal("Caesar");
        return done();
      });
    });
    it("should return user that has age specified if specified", function(done) {
      var data;
      data = {
        name: "Caesar",
        age: 15
      };
      return getUser(data, function(err, result) {
        expect(result.food).to.be.equal("salad");
        return done();
      });
    });
    return it("should return null if no users are found", function(done) {
      var data;
      data = {
        name: "Weird ass name"
      };
      return getUser(data, function(err, result) {
        expect(result).to.be["null"];
        return done();
      });
    });
  });

  describe("Database test example: Creating or updating data in db", function() {
    var createOrUpdateUser;
    createOrUpdateUser = users.createOrUpdateUser;
    it("should create user successfully given a perfect input", function(done) {
      var data;
      data = {
        name: "Grey",
        age: 10,
        food: "banana"
      };
      return createOrUpdateUser(data, function(err) {
        expect(err).to.be["null"];
        return User.findOne({
          name: data.name
        }, function(err, result) {
          expect(result).to.be.an("object");
          return done();
        });
      });
    });
    it("should throw error if missing name in input", function(done) {
      var data;
      data = {
        age: 10,
        food: "banana"
      };
      return createOrUpdateUser(data, function(err) {
        expect(err).to.be.equal("Name is required");
        return done();
      });
    });
    it("should throw error if missing age in input", function(done) {
      var data;
      data = {
        name: "Grey",
        food: "banana"
      };
      return createOrUpdateUser(data, function(err) {
        expect(err).to.be.equal("Age is required");
        return done();
      });
    });
    return it("should throw error if age is not a number", function(done) {
      var data;
      data = {
        name: "Grey",
        age: "donkey",
        food: "banana"
      };
      return createOrUpdateUser(data, function(err) {
        expect(err).to.be.equal("Age must be a number");
        return done();
      });
    });
  });

}).call(this);
