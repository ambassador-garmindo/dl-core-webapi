var should = require('should');
var request = require('supertest');
var uri = `${process.env.IP}:${process.env.PORT}`;

function getData() {
    var POGarmentFabric = require('dl-models').po.POGarmentFabric;
    var Buyer = require('dl-models').core.Buyer;
    var Supplier = require('dl-models').core.Supplier; 
    var Uom = require('dl-models').core.Uom;
    var PurchaseOrderItem = require('dl-models').po.PurchaseOrderItem;
    var Product = require('dl-models').core.Product;

    var now = new Date();
    var stamp = now / 1000 | 0;
    var code = stamp.toString(36);

    var poGarmentFabric = new POGarmentFabric();
    poGarmentFabric.RONo = '1' + code + stamp;
    poGarmentFabric.PRNo = '2' + code + stamp;
    poGarmentFabric.RefPONo = '3' + code + stamp;
    poGarmentFabric.article = "Test Article";
    poGarmentFabric.PODLNo = '';
    poGarmentFabric.buyerId = {};

    var buyer = new Buyer({
        _id: '123',
        code: '123',
        name: 'hot',
        description: 'hotline',
        phone: '0812....',
        address: 'test',
        local: true
    }); 
    
    var uom = new Uom({
        unit: 'Meter'
    });

    var product = new Product ({
        code: '22',
        name: 'hotline',
        price: 0,
        description: 'hotline123',
        uom: uom,
        detail: {}
    });

    var productValue = new PurchaseOrderItem({
        quantity: 10,
        price: 10000,
        description: 'test desc',
        dealQuantity: 10,
        dealMeasurement: 'Meter',
        defaultQuantity: 1000,
        defaultMeasurementQuantity: 'Centimeter',
        product: product
    });

    var _products = [];
    _products.push(productValue);

    poGarmentFabric.buyer = buyer;
    poGarmentFabric.items = _products;
    
    return poGarmentFabric;
}

it('#01. Should be able to get list', function (done) {
    request(uri)
        .get('/v1/po/garmentfabrics')
        .expect(200)
        .end(function (err, response) {
            if (err) {
                console.log(err);
                done(err);
            }
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
})

it('#02. Should be able to get all podl list', function (done) {
    request(uri)
        .get('/v1/po/garmentfabrics/podl')
        .expect(200)
        .end(function (err, response) {
            if (err) {
                done(err);
            }
            else {
                var result = response.body;
                result.should.have.property("apiVersion");
                result.should.have.property('data');
                result.data.should.instanceOf(Array);
                done();
            }
        });
})

var createdId;
it('#02. should success when create new data', function (done) {
    var data = getData();
    
    request(uri).post('/v1/po/garmentfabrics')
        .send(data)
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                var result = res.headers;
                createdId = result['location']
                done();

            }
        });
});

var createdData;
it(`#03. should success when update created data`, function (done) {
    request(uri).put('/v1/po/garmentfabrics')
        .send({ RONo: 'RO01234567890', description: 'updated description' })
        .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});

it("#04. should success when delete data", function(done) {
    request(uri).del('/v1/po/garmentfabrics/:id')
    .query({_id:createdId})
    .end(function (err, res) {
            if (err) {
                done(err);
            } else {
                done();
            }
        });
});