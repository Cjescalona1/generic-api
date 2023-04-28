require('dotenv').config();
require('./mongo')
const express = require('express');
const Entity = require('./Models/Entity');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');


app.listen(PORT, () => {
    console.log(` Server running on ${PORT} port`)
});

//Base URL
app.get('/', (request, response) => {
    response.send('<h1> Express Server <br/> <a href="/api/alt">  Go Plain </a> <br/> <a href="/api/entities"> Go to entities </a></h1>')
})

//Entities CRUD
//Get all the entities on DB
app.get('/api/entities', (request, response) => {
    Entity.find({}).then(ent => {
        response.json(ent)
    })
})
//Create a new Entity 
app.post('/api/entities', (request, response) => {
    const ent = request.body;

    if (!ent.description) {
        return response.status(400).json({ error: 'required "Description" is missing' })
    }
    const newEntity = new Entity({
        name: ent.name,
        description: ent.description
    })
    newEntity.save()
        .then(saved => { response.json(saved) })
        .catch(err => { console.log(`error ${err}`); })
})
//Get entity by id
app.get('/api/entities/:id', (request, response, next) => {
    const { id } = request.params;
    Entity.findById(id).then(entity => {
        if (entity) {
            return (response.json(entity))
        }
        else {
            response.status(404).end()
        }
    }).catch(err => {next(err)})
})

//Update of entity
app.put('/api/entities/:id', (request, response, next) => {
    const { id } = request.params;
    const toUpdateInfo = request.body;

    const updateInfo = {
        name: toUpdateInfo.name,
        description: toUpdateInfo.description,
    }
    Entity.findByIdAndUpdate(id, updateInfo, { new: true })
        .then(result => {
            response.json(result)
        }).catch(err => next(err))
})

//Delete Entity by id
app.delete('/api/entities/:id', (request, response, next) => {
    const { id } = request.params;
    Entity.findByIdAndDelete(id).then(
        () => { response.status(204).end() }
    ).catch(err => next(err))
    response.status(204).end()
})

//end Entity Crud

 
//error middleware
app.use(errorHandler)

// Default response for 404 error 
app.use(notFound);
