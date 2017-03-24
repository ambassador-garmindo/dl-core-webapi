var Router = require('restify-router').Router;
var db = require("../../../db");
var Manager = require("dl-module").managers.master.ProductManager;
var resultFormatter = require("../../../result-formatter");
var ObjectId = require("mongodb").ObjectId;
var passport = require('../../../passports/jwt-passport');
const apiVersion = '1.0.0';

function getRouter() {
    var router = new Router();
    router.get("/", passport, (request, response, next) => {
        db.get().then(db => {
            var manager = new Manager(db, request.user);

            var query = {};
            var productList = JSON.parse(request.queryInfo.productList);

            var jobs = [];

            for(var product of productList){
                jobs.push({"_id": new ObjectId(product)});
            }

            var filter = {};

            if(jobs.length ===1){
                filter = jobs[0];
                query.filter = filter;
            }else if(jobs.length >1){
                filter = {'$or':jobs};
                query.filter = filter;
            }

            query.select = ["_id","price"];
            
            manager.readById(query)
                .then(docs => {
                    var result = resultFormatter.ok(apiVersion, 200, docs.data);
                    delete docs.data;
                    result.info = docs;
                    response.send(200, result);
                })
                .catch(e => {
                    response.send(500, "gagal ambil data");
                });
        })
            .catch(e => {
                var error = resultFormatter.fail(apiVersion, 400, e);
                response.send(400, error);
            });
    });
    return router;
}

module.exports = getRouter;