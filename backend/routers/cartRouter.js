const express = require('express');
const router = require('express').Router();
const connection = require('../db.js')


router.route('/').post((req, res) => {
    console.log(req.body)

 connection.query('SELECT * FROM cartlist WHERE product = ? AND user = ?', [Number(req.body.productID), req.body.userParam], async (error, results) => {



        if (results.length > 0) {
            console.log(results)
            res.json({ mensaje: 'True' })
        }
        else {
            console.log(results)
            res.json({ mensaje: 'False' })
        }
    })

    

})
router.route('/remove').post((req, res) => {

    connection.query('DELETE FROM cartlist WHERE product = ? AND user = ?', [req.body.productID, req.body.userID], (error, results) => {


        if (error) {

            console.log(error)


        }

        else {

            console.log("Sucess")
        }




    })

})


router.route('/update').post(async (req, res) => {
    console.log(req.body)
    connection.query('UPDATE cartlist SET qty = ?  WHERE product = ? AND user = ?', [req.body.qty, req.body.productID, req.body.user], (err, res) => {


        if (err) {

            console.log(err)


        }

        else {


        }

    })



})

router.route('/add').post(async (req, res) => {
    console.log(req.body)
    if(req.body.mensaje === "False"){
    connection.query('INSERT INTO cartlist SET ?', { product: req.body.productID, user: req.body.user, qty: req.body.qty }, (err, reso) => {


        if (err) {

            console.log(err)


        }

        else {


        }

    })

    }if(req.body.mensaje ==='True') {connection.query('UPDATE cartlist SET qty = ?  WHERE product = ? AND user = ?', [req.body.qty, req.body.productID, req.body.user], (err, res) => {


        if (err) {

            console.log(err)


        }

        else {


        }

    })
}

})

router.route('/get').post(async (req, res) => {
    console.log(req.body)
    if(req.body.user){
    connection.query('SELECT *, c.idcartlist FROM products p JOIN cartlist c  ON p.idproducts = c.product WHERE c.user = ?', [req.body.user], (error, resulta) => {
  
  
        if (error) {
    
          console.log(error)
    
    
        }
    
        else {
          console.log(resulta)
          res.json(resulta)
    
        }
    
    
    
    
      })}
})

router.route('/deletefromcart/:id').post((req, res) => {

    connection.query('DELETE FROM cartlist WHERE idcartlist = ?', [req.params.id], (error, results) => {


        if (error) {

            console.log(error)


        }

        else {

            console.log("Sucess")
            res.json({message: 'Sucess'})
        }




    })

})


router.route('/estados').get((req, res) => {



    connection.query('SELECT * FROM ecommerce.state', (error, results) => {
  
  
      if (error) {
  
        console.log(error)
  
  
      }
  
      else {
  
          console.log(results)
          res.send( results)
  
  
      }
  
    })
  
  
  
  
  
  })
  
module.exports = router