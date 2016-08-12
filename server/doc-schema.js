'use strict';
const mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  index: { type: String, required: true },
  title: { type: String, required: true },
  rev: { type: String, required: true }
});

module.exports = Schema;
