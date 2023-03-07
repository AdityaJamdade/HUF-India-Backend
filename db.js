const mongoose = require('mongoose');
const dotnev = require('dotenv');
dotnev.config();
const { MONGOURI } = process.env;

const connectToMongo = () => {
    mongoose.connect(MONGOURI, () => {
        console.log('Connected to mongo successfully');
    })
}

module.exports = connectToMongo;