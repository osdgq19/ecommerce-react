const express = require('express');
const router = require('express').Router();
const connection = require('../db.js')


router.route('/').post((req, res) => {
  const tipoReporte = req.body.tipoReporte
  const param = req.body.parametro
  let tipo = ''
  if (tipoReporte === "Categoria") {
    tipo = 'category'
  }
  if (tipoReporte === "Marca") {
    tipo = 'brand'
  }
  if (tipoReporte === "Precio") {
    tipo = 'price'
  }
  if (tipoReporte === "Cantidad") {
    tipo = 'countInStock'
  }
  console.log(req.body)
  connection.query('SELECT * FROM products WHERE ' + tipo + ' = ?', [param], (error, results) => {


    if (error) {

      console.log(error)


    }

    else {

      res.json(results)
    }




  })


})


router.route('/decision/ganancias').post((req, res) => {
  const tipoReporte = req.body.tipoReporte
  const fechaInicio = req.body.fechaInicio
  const fechaFinal = req.body.fechaFinal
  console.log(fechaInicio)

  
    connection.query('SELECT * FROM ecommerce.`order` where paidAt between ?  and  ? ', [fechaInicio, fechaFinal], (error, result) => {


      if (error) {

        console.log(error)


      }

      else {


        connection.query('select sum(total) as ganancias FROM ecommerce.`order` where paidAt between ' + fechaInicio + ' and ' + fechaFinal + '', (err, results) => {


          if (err) {

            console.log(err)


          }

          else {

            res.send({
              ordenes: result,
              ganancia: results
            })
          }




        })
      }




    })

})

router.route('/decision/entregas').post((req, res) => {
  const tipoReporte = req.body.tipoReporte
  const fechaInicio = req.body.fechaInicio
  const fechaFinal = req.body.fechaFinal

  console.log(tipoReporte)
  console.log(fechaInicio)
  console.log(fechaFinal)
  connection.query('SELECT * FROM deliverstate d JOIN ecommerce.`order` o ON o.id_order = d.iddeliverstate where d.deliveredAt between ? and ?',[fechaInicio,fechaFinal], (error, result) => {


    if (error) {

      console.log(error)


    }

    else {
      connection.query('select count(deliveredAt) as entregas FROM deliverstate where deliveredAt between ? and  ? ', [fechaInicio, fechaFinal], (err, results) => {


        if (err) {

          console.log(err)


        }

        else {
          console.log(result)
          console.log(results)
          res.send({
            ordenes: result,
            nroEntregas: results
          })
        }




      })
    }




  })


})
router.route('/decision/cobradas').post((req, res) => {
  const tipoReporte = req.body.tipoReporte
  const fechaInicio = req.body.fechaInicio
  const fechaFinal = req.body.fechaFinal

  console.log(tipoReporte)
  console.log(fechaInicio)
  console.log(fechaFinal)
  connection.query('SELECT * FROM ecommerce.`order` where paidAt between ' + fechaInicio + ' and ' + fechaFinal + ';', (error, result) => {


    if (error) {

      console.log(error)


    }

    else {


      connection.query('select count(id_order) as total FROM ecommerce.`order` where paidAt between ' + fechaInicio + ' and ' + fechaFinal + '', (err, results) => {


        if (err) {

          console.log(err)


        }

        else {

          res.send({
            ordenes: result,
            nroOrdenes: results
          })
        }




      })
    }




  })


})


router.route('/decision/ordenes').post((req, res) => {
  const tipoReporte = req.body.tipoReporte
  const fechaInicio = req.body.fechaInicio
  const fechaFinal = req.body.fechaFinal

  console.log(tipoReporte)
  console.log(fechaInicio)
  console.log(fechaFinal)
  connection.query('SELECT * FROM ecommerce.`order` where date between ' + fechaInicio + ' and ' + fechaFinal + ';', (error, result) => {


    if (error) {

      console.log(error)


    }

    else {


      connection.query('select count(id_order) as total FROM ecommerce.`order` where date between ' + fechaInicio + ' and ' + fechaFinal + '', (err, results) => {


        if (err) {

          console.log(err)


        }

        else {

          res.send({
            ordenes: result,
            nroOrdenes: results
          })
        }




      })
    }




  })


})

router.route('/decision/producto').put((req, res) => {
  const tipoReporte = req.body.tipoReporte
  const fechaInicio = req.body.fechaInicio
  const fechaFinal = req.body.fechaFinal

  console.log(tipoReporte)
  console.log(fechaInicio)
  console.log(fechaFinal)
  connection.query('SELECT o.id_order, o.paidAt, d.qty, d.product, sum(d.qty) as acumulado  FROM ecommerce.`order` o JOIN order_details d ON o.id_order = d.id_order_details where o.paidAt between ? and ? group by product order by acumulado desc;',[fechaInicio,fechaFinal], (error, result) => {


    if (error) {

      console.log(error)


    }

    else {

      console.log(result)
      connection.query('select * FROM products where idproducts = ?',[result[0].product], (err, results) => {


        if (err) {

          console.log(err)


        }

        else {

          res.send({
            ordenes: result,
            product: results
          })
        }




      })
    }




  })


})
module.exports = router