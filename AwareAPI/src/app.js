 const express = require('express')
 const server = express()
 const userRouter = require('./controllers/controllerUser')

 const fs = require('fs')
 const cors = require('cors')

 // função para utilizar o servidor
 server.use(express.json())
 server.use(cors())

 server.use('/aware', userRouter.server)

 // mensagem no terminal para indicar o funcionamento
 server.listen(3000, () =>{
     console.log(`O servidor está funcionando! :D`);
 })

