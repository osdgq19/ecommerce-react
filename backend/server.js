const express = require('express')
const cors = require('cors')

const fileUpload = require('express-fileupload');
require('dotenv').config()




const port = process.env.PORT || 5555

const app = express()
app.use(fileUpload()); 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res)=> {

      res.send('Server is ready')

})

const connection = require('./db.js')
const usersRoutes = require('./routers/userRouter.js')
const productsRoutes = require('./routers/productRouter.js')
const orderRouter = require('./routers/orderRouter.js')
const reportRouter = require('./routers/reportRouter.js')
const bitacoraRouter = require('./routers/bitacoraRouter.js')
const mantenimientoRouter = require('./routers/mantenimientoRouter')
const cartRouter = require('./routers/cartRouter')
const categoriaRouter = require('./routers/categoriaRouter')

app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/orders', orderRouter)
app.use('/api/report', reportRouter)
app.use('/api/bitacora', bitacoraRouter)
app.use('/api/mantenimiento', mantenimientoRouter)
app.use('/api/cartlist', cartRouter)
app.use('/api/categoria', categoriaRouter)

app.get('/api/config/paypal', (req, res)=> {

    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.listen(port, ()=>{
    console.log(`Serve at http://localhost:${port}`)
})

