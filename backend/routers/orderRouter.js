const express = require('express');
const router = require('express').Router();
const connection = require('../db.js')
const isAuth = require('../utils.js');

router.route('/mine').put((req, res) => {

  connection.query('SELECT * FROM ecommerce.order o JOIN deliverstate p ON o.id_order = p.iddeliverstate WHERE usuario = ?',[req.body.idusers] , (error, results) => {


    if (error) {

      console.log(error)
     

    }

    else {
      
      res.json(results)
    }




  })


})
router.route('/mineadmin').put((req, res) => {
  console.log(req.body)
  connection.query('SELECT idusers FROM users  WHERE name = ?',[req.body.name] , (error, results) => {


    if (error) {

      console.log(error)
     

    }

    else {
      console.log(results)
      connection.query('SELECT * FROM ecommerce.order o JOIN deliverstate p ON o.id_order = p.iddeliverstate WHERE usuario = ?',[results[0].idusers] , (err, resu) => {


        if (error) {
    
          console.log(err)
         
    
        }
    
        else {
          console.log(resu)
          res.json(resu)
        }
    
    
    
    
      })
    }




  })


})


router.post('/', (req, res) => {
  
  if (req.body.orderItems === 0) {


    res.status(400).send({ message: 'Carro Vacio' })


  } else {
    console.log(req.body)
    let action = "Modulo Orden a Crear"
    var nowDate = new Date()
    var date = nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate()
    const idShipping = req.body.shippingAddress.idShipping
    const paymentMethod = req.body.paymentMethod.idpayment_method
    const itemsPrice = req.body.itemsPrice
    const shippingPrice = req.body.shippingPrice
    const taxPrice = Number(req.body.taxPrice)
    const totalPrice = req.body.totalPrice
    const iduser = req.body.currentUser.idusers
    const cart = req.body.cartItems
   

    connection.query('INSERT INTO ecommerce.order SET ?', { shipping_address: idShipping, payment_method: paymentMethod, items_price: itemsPrice, shipping: shippingPrice, taxation: taxPrice, usuario: iduser, total: totalPrice }, (error, resultados) => {


      if (error) {

        console.log(error)


      }

      else {
        res.status(201)
        res.send({ message: 'Order Created', order: { id: resultados.insertId, cart: req.body.cartItems, shipping_address: idShipping, payment_method: paymentMethod, items_price: itemsPrice, shipping_price: shippingPrice, tax_price: taxPrice, total_price: totalPrice, user: iduser } })
        cart.map(c => {
          const qty = c.qty
          const product = c.product


          connection.query('INSERT INTO ecommerce.order_details SET ?', { id_order_details: resultados.insertId, qty: qty, product: product }, (error, results) => {

            if (error) {

              console.log(error)


            }

            else {

              console.log('success')


            }





          })
        })

          connection.query('INSERT INTO ecommerce.deliverstate SET ?', { iddeliverstate: resultados.insertId, status: 'Entregado',  }, (error, results) => {

            if (error) {

              console.log(error)


            }

            else {

              console.log('success')


            }





          })
        
      }

    })

    

  }

})


router.route('/shipping').post((req, res) => {
  console.log(req.body)

  connection.query('INSERT INTO ecommerce.shipping_address SET ?', { direction: req.body.address, state: req.body.estado, fullname: req.body.fullName }, (error, results) => {


    if (error) {

      console.log(error)


    }

    else {
      console.log(results.insertId)
      res.json(results.insertId)
    }



  })



})

router.route('/paymethod').get((req, res) => {

  connection.query('SELECT * FROM payment_method', (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})
router.route('/getpay/:id').get((req, res) => {
  console.log(req.params.id)
  connection.query('SELECT * FROM payment_method WHERE idpayment_method = ?',[req.params.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})

router.get('/:id', (req, res) => {



  connection.query('SELECT * FROM ecommerce.order o JOIN payment_method p ON o.payment_method = p.idpayment_method JOIN shipping_address s ON o.shipping_address = s.id_shipping_address WHERE id_order = ?', [req.params.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      if (results) {
        res.send(results)
        
      } else { res.status(404).send({ message: 'Order Not Found' }) }



    }




  })





})

router.get('/details/:id', (req, res) => {



  connection.query('SELECT * FROM products p JOIN order_details o ON o.product = p.idproducts WHERE id_order_details = ?', [req.params.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      if (results) {
        res.send( results)
        
      } else { res.status(404).send({ message: 'Order Not Found' }) }



    }




  })





})
router.get('/orderstatus/:id', (req, res) => {



  connection.query('SELECT * FROM deliverstate p JOIN order_details o ON o.id_order_details = p.iddeliverstate WHERE id_order_details = ?', [req.params.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      if (results) {
        res.send( results)
        
      } else { res.status(404).send({ message: 'Order Not Found' }) }



    }




  })





})

router.put('/:id/pay', (req, res)=> {

  connection.query('UPDATE ecommerce.order SET isPaid = ?, paidAt = ?, capture = ? WHERE id_order = ?', [req.body.status, req.body.fecha , req.body.secure_url, Number(req.params.id)] , (err, results) => {


    if (err) {

      console.log(err)


    } else {

      connection.query('SELECT * FROM ecommerce.order WHERE id_order = ?', [ Number(req.params.id)] , (error, resultados) => {
        if (error) {

          console.log(error)
          res.send({message: 'Order Not Found'})
    
        } else {res.send({message: 'Order Updated', order: resultados})}
      })


    }
    

})

})

router.route('/reduceStock').put((req, res) => {
  console.log(req.body)

  connection.query('Update products set countInStock = countInStock - ? where products.idproducts = ?', [ req.body.orde.qty, req.body.orde.product ], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {
      
      res.json({message: "Exito"})
    }



  })



})



module.exports = router