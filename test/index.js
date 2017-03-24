function test(name, path) {
    describe(name, function () {
        require(path);
    });
}

describe('@dl-core-webapi', function () { 
  
    this.timeout(2 * 60000);
    //Master
    test("~/master/budget", "./routes/master/budget");
    test('~/master/budget/upload', './routes/master/budget/upload');
    test("~/master/buyer", "./routes/master/buyer");
    test("~/master/category", "./routes/master/category");
    test("~/master/category", "./routes/master/currency");
    test("~/master/division", "./routes/master/division");
    test("~/master/lot-machine", "./routes/master/lot-machine");
    test("~/master/machine", "./routes/master/machine");
    test("~/master/machine-type","./routes/master/machine-type");
    test("~/master/product", "./routes/master/product");
    test("~/master/supplier", "./routes/master/supplier"); 
    test("~/master/thread-specification", "./routes/master/thread-specification");
    test("~/master/unit", "./routes/master/unit");
    test("~/master/uom", "./routes/master/uom");
    test("~/master/uster", "./routes/master/uster");
    test("~/master/vat", "./routes/master/vat");
    test("~/master/step", "./routes/master/step");
    test("~/master/lamp-standard", "./routes/master/lamp-standard");
    test("~/master/instruction", "./routes/master/instruction");
    test("~/master/order-type", "./routes/master/order-type");
    test("~/master/process-type", "./routes/master/process-type");
    test("~/master/material-construction", "./routes/master/material-construction");
    test("~/master/finish-type", "./routes/master/finish-type");
    test("~/master/standard-test", "./routes/master/standard-test");
    test("~/master/yarn-material", "./routes/master/yarn-material");
    test("~/master/color-type", "./routes/master/color-type");
    test("~/master/comodity", "./routes/master/comodity");
    test("~/master/quality", "./routes/master/quality");
    test("~/master/account-bank", "./routes/master/account-bank");
    test("~/master/term-of-payment", "./routes/master/term-of-payment");
});
