var mongoose = require('mongoose');
var schema = mongoose.Schema;

userShema = new schema({
  name:{type:String,require:true},
  email:{type:String,require:true}
})

module.exports = mongoose.model("User",userShema);
