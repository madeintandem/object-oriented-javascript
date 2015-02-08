var objectOne = {
  name: "objectOne",
  callFunction: function(funcToCall) {
    return funcToCall();
  }
};

var objectTwo = {
  name: "objectTwo",
  whoAmI: function() {
    return this.name;
  }
};

_.bindAll(objectTwo, ["whoAmI"]);
