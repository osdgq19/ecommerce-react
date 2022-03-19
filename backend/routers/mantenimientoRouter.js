const express = require('express');
const router = require('express').Router();
const connection = require('../db.js')

router.route('/').post((req, res) => {
 
    var fs = require('fs');
var spawn = require('child_process').spawn;
var wstream = fs.createWriteStream('dumpfilename.sql');

var mysqldump = spawn('mysqldump', [
    '-u',
    'root',
    'ecommerce',
],{shell: true});

mysqldump
    .stdout
    .pipe(wstream)
    .on('finish', function () {
        console.log('Completed')
        res.send( 'Respaldo exitoso')
    })
    .on('error', function (err) {
        res.send('Error')
        console.log(err)
    });
  
  
  })
  module.exports = router