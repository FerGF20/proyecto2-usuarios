const express = require('express')
const app = express()
app.use(express.json())

const usersDB = [
    {
      "id" :1,
      "firstName": "Fernando",
      "lastName": "Gordillo",
      "email": "fernando55021@hotmail.com",
      "password": "root",
      "age": 23
    }
]
let baseID = 2

app.get('/', (req, res) => {
    res.json({
        message: "Server Ok!"
    })
})

// Create a route that shows all users

app.get('/users', (req, res) => {
    res.json(usersDB)
})

// Create a route that adds a new user

app.post('/users', (req, res) => {
    const data = req.body
    const newUser = {
        "id" : baseID++,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "email": data.email,
        "password": data.password,
        "age": data.age
    }

    usersDB.push(newUser)
    res.status(201).json(newUser)
})

// Create a route that shows a user depending on ID

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const data = usersDB.find((item) => id === item.id)

    if(data){
        res.json(data)
    }else{
        res.status(404).json({
            message: "Invalid ID"
        })
    }
})



app.listen(9000, () => {
    console.log('Server started at port 10000')
})



module.exports = app