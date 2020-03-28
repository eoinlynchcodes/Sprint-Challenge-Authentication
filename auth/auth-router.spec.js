const authRouter = require('./auth-router')

const server = require('../api/server');
const db = require('../database/dbConfig');
const request = require("supertest");
const helperFunction = require('../helperFunctions/helperFunctions')

beforeAll( async () => {
    await db('users').truncate()
})

describe('sanity test', () => {
    it('adds numbers', () => {
        
    })
})


describe('It registers a new user', () => {
    it('Gives a 201 response that a new user has been registered.', () => {
        return request(server)
        .post('/api/auth/register')
        .send({username: 'unique', password: '4444' })
        .then(response => {
            expect(response.status).toEqual(201);
        })
    })
})