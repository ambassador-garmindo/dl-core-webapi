 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/comodities",
     model: require("dl-models").master.Comodity,
     validate: require("dl-models").validator.master.comodity,
     util: require("dl-module").test.data.master.comodity,
     keyword: "code"
 });
 