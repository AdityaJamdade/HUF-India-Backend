const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors')
require('dotenv').config();


connectToMongo();
const app = express();
const { PORT } = process.env;

app.use(cors())
app.use(express.json())

// Available routes
app.use('/oe/daily', require('./routes/oe/oeDailyRoutes'));
app.use('/oe/weekly', require('./routes/oe/oeWeelkyRoutes'));
app.use('/oe/monthly', require('./routes/oe/oeMonthlyRoutes'));

app.use('/', (req, res) => {
    res.send('Hello this is the base endpoint!')
})

app.listen(PORT, () => {
    console.log(`HUFINDIA backend listening on port http://localhost:${PORT}`)
});