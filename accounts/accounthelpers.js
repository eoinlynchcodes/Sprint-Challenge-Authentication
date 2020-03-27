const db = require('../database/dbConfig.js');

module.exports = {
    add,
    findBy
};

async function add(user){
    const [id] = await db('users').insert(user, "id");

    return db('users');
}

function findBy(parameter){
    return db('users').where(parameter);
}