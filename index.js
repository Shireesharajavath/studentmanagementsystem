const express = require('express');
const cors = require('cors');

console.log('Starting app.js...');

const {
  add_Student,
  get_All_Students,
  update_Student,
  delete_Student,
} = require('./controllers/studentController');
