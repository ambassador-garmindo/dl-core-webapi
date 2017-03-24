 var basicTest = require("../../basic-test-factory");
 basicTest({
     uri: "/master/qualities",
     model: require("dl-models").master.Quality,
     validate: require("dl-models").validator.master.quality,
     util: require("dl-module").test.data.master.quality,
     keyword: "code"
 });
 