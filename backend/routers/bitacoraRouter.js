const express = require('express');
const router = require('express').Router();
const connection = require('../db.js')


router.route('/').post((req, res) => {
 

  connection.query('INSERT INTO bitacora SET ?', { accion: req.body.action, user: req.body.user.name, fecha: req.body.fecha}, (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})

router.route('/get').post((req, res) => {
 

  connection.query('SELECT * FROM bitacora WHERE user = ?', [req.body.user.name], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})

module.exports = router