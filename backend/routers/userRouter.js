const express = require('express');
const router = require('express').Router();
const connection = require('../db.js')
const bcrypt = require('bcrypt');
const generateToken = require('../utils.js');


router.route('/seed').get((req, res) => {

  connection.query('SELECT * FROM users', (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})



router.route('/register').post(async(req, res) => {


  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  let isAdmin = req.body.isAdmin

  let passwordHashed = await bcrypt.hash(password, 8)

  if(!isAdmin) {

    isAdmin= 'False'

  }


  connection.query('INSERT INTO users SET ?', { name: name, email: email, password: passwordHashed, is_admin: isAdmin }, (error, results) => {


    if (error) {

      console.log(error)


    }
    
         

    else {

      res.send({
        idusers: results.insertId,
        name: name,
        email: email,
        isAdmin: isAdmin,
        token: generateToken(results)

      })
      return;
    }




  })


})


router.route('/signin').post(async(req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?', [email], (error, results) => {


    if ( !results[0] || !bcrypt.compareSync(req.body.password, results[0].password)) {

      res.status(401).send({ message: 'email o contraseña invalidos' })
      return

    }

    else {
      if (results) {

        if (bcrypt.compareSync(req.body.password, results[0].password)) {
          console.log(results)
          res.send({
            idusers: results[0].idusers,
            name: results[0].name,
            email: results[0].email,
            isAdmin: results[0].is_admin,
            token: generateToken(results)

          })
          return;


        }


      }


    }

    if (error) {

      console.log(error)


    }


  })


})


router.route('/:id').get((req, res) => {

  connection.query('SELECT * FROM users WHERE idusers = ?',[req.params.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})

router.route('/profile').put(async(req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  let isAdmin = req.body.isAdmin
  console.log(req.body)
  let passwordHashed = await bcrypt.hash(password, 8)

  connection.query('UPDATE users SET name = ?, email = ?, password = ? WHERE idusers = ?',[name, email, passwordHashed, req.body.userId], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {
      console.log(results)
      res.json({idusers: req.body.userId, name: name, email: email, password: passwordHashed})
    }




  })


})


router.route('/delete').put((req, res) => {
  const name = req.body.name
  const email = req.body.email
  const password = req.body.password
  let isAdmin = req.body.isAdmin
  console.log(req.body)
 

  connection.query('DELETE FROM ecommerce.my_products WHERE user = ?',[req.body.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {
      
     
    }




  })
  connection.query('DELETE FROM ecommerce.cartlist WHERE user = ?',[req.body.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {
      
     
    }




  })

  connection.query('DELETE FROM ecommerce.users WHERE idusers = ?',[req.body.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {
      
     
    }




  })
})


module.exports = router