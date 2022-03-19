const express = require('express');
const router = require('express').Router();
const connection = require('../db.js')
const bcrypt = require('bcrypt');
const generateToken = require('../utils.js');


router.route('/').post((req, res) => {

  connection.query('SELECT * FROM categorias', (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})


router.route('/add').post((req, res) => {
  console.log(req.body)
  const name = req.body.name
 
  connection.query('INSERT INTO categorias SET ?', { nombre_categoria: name }, (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json({ status: 'Category inserted' })
      

    }


  })


})

router.route('/delete').post((req, res) => {
  console.log(req.body)
  const name = req.body.name
 
  connection.query('DELETE FROM categorias WHERE nombre_categoria = ?', [ name ], (error, results) => {


    if (error) {

      console.log(error)
      res.json({ status: error })

    }

    else {

      res.json({ status: 'Category deleted' })
      

    }


  })


})
module.exports = router