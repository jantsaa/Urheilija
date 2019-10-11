var mongoose  = require('mongoose');

var schema = mongoose.Schema({
  firstname : { 
    type: String,
    required: true, 
    max: 15
  },
  lastname : { 
    type: String,
    required: true, 
    max: 15
  },
  weight: {
    type: Number,
    required: true,
  },
  birth: {
    type: Date,
    required: true
  },
  img : {
    type : String,
    required: true
  },
  sports : {
    type : String,
    required: true
  },
  stats :  {
    type : String ,
    required: true
  }
});

// create the model for athletes and expose it to the application
module.exports = mongoose.model('Athlete', schema);