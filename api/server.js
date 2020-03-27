const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req,res) => {
    res.status(200).json({message: 'Hello'})
})

// server.get('/all', (req, res) => {
//     accountHelpers.findAll()
//     .then(response =>{
//         res.status(200).json(response)
//     })
//     .catch(error => {
//         res.status(400).json(error);
//     })
// }) 



module.exports = server;
