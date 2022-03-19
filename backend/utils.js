const jwt = require('jsonwebtoken')

 const generateToken = (user) => {
    if(!user){


    }
    else {
  
    return jwt.sign({ idusers: user.idusers, name: user.name, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET || 'somethingsecret', {expiresIn: '30d'})

    }

}


const isAuth = (req, res, next) => {


       const authorization = req.headers.authorization
       if(authorization) {

           const token = authorization.slice(7, authorization.length)
           jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode)=> {

              if(err) {

                    res.status(401).send({message: 'Token invalido'})

              } else {

                    req.user = decode
                    next()
                    


              }


           })


       } else {

        res.status(401).send({message: 'No hay Token'})



       }


}

const isAdmin = (req,res,next) => {

   if(req.user && req.user.isAdmin) {next()}

}


module.exports = generateToken, isAuth, isAdmin