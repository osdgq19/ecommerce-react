const express = require('express');
const router = require('express').Router();
const connection = require('../db.js')

router.route('/').get((req, res) => {

  connection.query('SELECT * FROM products p join categorias c on p.category = c.idcategorias', (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})


router.route('/:id').get((req, res) => {

  connection.query('SELECT * FROM products p join categorias c on p.category = c.idcategorias  WHERE idproducts = ?', [req.params.id], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})





router.route('/seed').post((req, res) => {

  const name = req.body.name
  const image = req.body.imageName
  const brand = req.body.brand
  const category = req.body.category
  const description = req.body.description
  const price = Number(req.body.price) || 0
  const countInStock = Number(req.body.countInStock) || Number(req.body.qty) || 0

  const impuesto = req.body.impuesto
  connection.query('INSERT INTO products SET ?', { name: name, image: image, brand: brand, category: category, description: description, price: price, countInStock: countInStock, impuesto: impuesto }, (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json({ status: 'Product inserted' })
      connection.query('INSERT INTO my_products SET ?', { product: results.insertId, user: req.body.user }, (err, resultado) => {


        if (err) {

          console.log(err)


        }

        else {


        }




      })

    }


  })


})



router.route('/myprods').post((req, res) => {


  connection.query('SELECT * FROM products p JOIN my_products c ON p.idproducts = c.product WHERE c.user = ?', [req.body.idusers], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {
      console.log(results)
      res.json(results)

    }




  })



})




router.route('/deletemyprod').post((req, res) => {

  console.log(req.body)
  connection.query('DELETE FROM my_products WHERE product = ? AND user = ?', [req.body.productID, req.body.user.idusers], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)

    }




  })
  connection.query('DELETE FROM products WHERE idproducts = ?', [req.body.productID], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      console.log(results)

    }




  })

})

router.route('/update').put(async (req, res) => {
  console.log(req.body)
  if (req.body.name) {
    const name = req.body.name
    const image = req.body.imageName
    const brand = req.body.brand
    const category = req.body.category
    const description = req.body.description
    const price = Number(req.body.price) || 0
    const countInStock = Number(req.body.countInStock) || Number(req.body.qty) || 0
    const rating = Number(req.body.rating) || 0
    const numReviews = Number(req.body.numReviews) || 0
    const impuesto = req.body.impuesto

    connection.query('UPDATE products SET name = ?, image = ?, brand = ?, category = ?, description = ?, price = ?, countInStock = ?, impuesto = ? WHERE idproducts = ?', [name, image, brand, category, description, price, countInStock, impuesto, req.body.id], (error, results) => {


      if (error) {

        console.log(error)


      }

      else {
        console.log(results)
        res.json({ message: 'Updated' })
      }




    })
  } else {

    const countInStock = Number(req.body.countInStock) || Number(req.body.qty) || 0


    connection.query('UPDATE products SET countInStock = ? WHERE idproducts = ?', [countInStock, req.body.id], (error, results) => {


      if (error) {

        console.log(error)


      }

      else {
        console.log(results)
        res.json({ message: 'Updated' })
      }







    })
  }
})




module.exports = router