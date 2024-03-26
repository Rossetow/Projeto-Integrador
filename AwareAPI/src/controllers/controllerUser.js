const express = require('express')
const server = express()
const dataUser = require('./data/user.json')
const fs = require('fs')

// função para utilizar o servidor
server.use(express.json())

// salvar/inserir dados no JSON === Create do CRUD
server.post('/user', (req, res) => {
    const newUser = req.body

    if(!newUser.name || !newUser.email || !newUser.password || !newUser.dateOfBirth || !newUser.state || !newUser.city) {
        return res.status(400).json({mensagem: "Incomplete data"})
    } else {
        dataUser.users.push(newUser)
        saveData(dataUser)
        return res.status(201).json({mensagem: "Novo cliente cadastrado com sucesso!"})
    }
})

// consumir dados da API === Read do CRUD
server.get('/user', (req, res) => {
    return res.json(dataUser.users)
})

server.get('/user/:email', (req, res) => {
    const email = req.params.email

    const idUser = dataUser.users.findIndex(u => u.email === email)


    return res.json(dataUser.users[idUser])
})

// função para atualizar um usuario
server.put('/user/:id', (req, res) => {
    //buscar e transformar o id do endpoint em inteiro
    const userId = parseInt(req.params.id)

    //receber o body escrito no postman
    const putUser = req.body

    //encontrar o id no json que já existe
    const idUser = dataUser.users.findIndex(u => u.id === usuarioId)

    if (idUser === -1) {
        return res.status(404).json({mensagem: "User not found"})
    } else {
        //atualiza o nome:
        dataUser.users[idUser].name = atualizarUsuario.name || dataUser.users[idUser].name

        //atualiza a idade:
        dataUser.users[idUser].email = atualizarUsuario.email || dataUser.users[idUser].email

        //atualiza o curso
        dataUser.users[idUser].password = atualizarUsuario.password || dataUser.users[idUser].password

        dataUser.users[idUser].dateOfBirth = atualizarUsuario.dateOfBirth || dataUser.users[idUser].dateOfBirth

        dataUser.users[idUser].city = atualizarUsuario.city || dataUser.users[idUser].city

        dataUser.users[idUser].state = atualizarUsuario.state || dataUser.users[idUser].state

        dataUser.users[idUser].avatar = atualizarUsuario.avatar || dataUser.users[idUser].avatar

        saveData(dataUser)

        return res.json({mensagem: "User updated successfully!"})
    }
})

//função para deletar usuario
server.delete("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id)

    dataUser.users = dataUser.users.filter(u => u.id !== userId)

    saveData(dataUser)

    return res.status(200).json({mensagem: "Usuário excluido com sucesso"})
})

function saveData(){
    fs.writeFileSync(__dirname + '/data/dataUser.json', JSON.stringify(dataUser, null, 2))
}

module.exports = {server, saveData}