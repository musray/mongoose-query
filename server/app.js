'use strict';
const
  express = require('express'),
  app = express(),
  wagner = require('wagner-core');

app.get('/', function(req,res) {
  res.send('hello mongoose');
});

// use the REST api
// require('./models')(wagner);
app.use('/api/v1', require('./api')(wagner));

module.exports = app;
