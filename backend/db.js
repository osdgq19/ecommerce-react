const mysql = require('mysql')

const connection = mysql.createConnection({

   host: '127.0.0.1',
   user: 'root',
   password: '',
   database: 'ecommerce'
})

connection.connect((error)=>{

     if(error){

        console.log(error)
        return

     } else {

           console.log('Conectado a la DB')

     }
})

module.exports = connection