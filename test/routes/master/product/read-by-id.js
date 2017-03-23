require("should");
const host = `${process.env.IP}:${process.env.PORT}`;
var Request = require("supertest");
var getTestServer = require("../../../test-server");
var getToken = require("../../../token");
var ObjectId = require("mongodb").ObjectId;
var request = Request(host);
var jwt;
var util = require("dl-module").test.data.master.product;
var uri = "/master/products";
var model = require("dl-models").master.Product;
var validate = require("dl-models").validator.master.product;
var util = require("dl-module").test.data.master.product;
var keyword = "code";

before("#00. get security token", function (done) {
    getTestServer().then((server) => {
        request = Request(server);
        getToken(request)
            .then((token) => {
                jwt = token;
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
});

var createdDataLocation;
var createdIds=[];
it(`#01. create new data and set header.location- [POST]${uri}`, function (done) {
    util.getNewData()
        .then((data) => {
            request
                .post(uri)
                .send(data)
                .set("authorization", `JWT ${jwt}`)
                .set("Accept", "application/json")
                .expect(201)
                .expect("Content-Type", "application/json")
                .end(function (err, response) {
                    if (err)
                        done(err);
                    else {
                        var result = response.body;
                        result.should.have.property("apiVersion");
                        result.should.have.property("message");

                        var header = response.header;
                        header.should.have.property("location");
                        createdDataLocation = header.location;
                        var location = createdDataLocation.split('/');
                        createdIds.push(location[location.length-1]);

                        done();
                    }
                });
        })
        .catch((e) => {
            done(e);
        });
});

it(`#02. create new data and set header.location- [POST]${uri}`, function (done) {
    util.getNewData()
        .then((data) => {
            request
                .post(uri)
                .send(data)
                .set("authorization", `JWT ${jwt}`)
                .set("Accept", "application/json")
                .expect(201)
                .expect("Content-Type", "application/json")
                .end(function (err, response) {
                    if (err)
                        done(err);
                    else {
                        var result = response.body;
                        result.should.have.property("apiVersion");
                        result.should.have.property("message");

                        var header = response.header;
                        header.should.have.property("location");
                        createdDataLocation = header.location;
                        var location = createdDataLocation.split('/');
                        createdIds.push(location[location.length-1]);

                        done();
                    }
                });
        })
        .catch((e) => {
            done(e);
        });
});

it(`#03. get list by Id - [GET]/master/products/byId`, function (done) {
        request
            .get(`/master/products/byId?productList=${JSON.stringify(createdIds)}`)
            .set("authorization", `JWT ${jwt}`)
            .set("Accept", "application/json")
            .expect(200)
            .expect("Content-Type", "application/json")
            .end(function (err, response) {
                if (err)
                    done(err);
                else {
                    var result = response.body;
                    result.should.have.property("apiVersion");
                    result.should.have.property("data");
                    result.data.should.instanceOf(Array);
                    done();
                }
            });
    });