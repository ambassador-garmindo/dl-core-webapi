 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/term-of-payments",
     model: require("dl-models").master.TermOfPayment,
     validate: require("dl-models").validator.master.termOfPayment,
     util: require("dl-module").test.data.master.termOfPayment,
     keyword: null
 });
 