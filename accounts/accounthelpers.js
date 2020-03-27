const db = require('../database/dbConfig.js');

module.exports = {
    add,
    findBy
};

async function add(user){
    await db('users')
    .insert(user, "id");
    return db('users');
}

function findBy(filter){
    return db('users').where(filter);
}