'use strict';
const 
  mongoose = require('mongoose'),
  _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/dmo');

  var Doc = 
    mongoose.model('guidance'
        , require('./doc-schema')
        , 'guidance');

  var model = {
    Doc: Doc
  }

  _.each(model, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return model;
};
