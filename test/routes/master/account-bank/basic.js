 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/account-banks",
     model: require("dl-models").master.AccountBank,
     validate: require("dl-models").validator.master.accountBank,
     util: require("dl-module").test.data.master.accountBank,
     keyword: null
 });
 