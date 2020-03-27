const db = require('../database/dbConfig.js');

module.exports = {
    add,
    findBy,
    findAll,
    sanityTest
};

function sanityTest(a, b){
    return a + b;
}

async function add(user){
    await db('users')
    .insert(user, "id");
    return db('users');
}

function findAll(){
    return db('users')
}

function findBy(filter){
    return db('users').where(filter);
}