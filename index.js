'use strict'
const 
  express = require('express'),
  app = express(),
  wagner = require('wagner-core');

app.get('/', function(req,res) {
  res.send('Server is good.');
});

// use the REST api
require('./server/models')(wagner);
app.use('/api/v1', require('./server/api')(wagner));

app.listen(3000);
console.log('Server is listening on port 3000');
