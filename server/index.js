const express = require('express');
const { Sequelize } = require('sequelize');
var dotenv = require('dotenv');
var cors = require('cors');

const userRoutes = require('./routes/userRoutes.js');


dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true
}

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

app.use(express.json());
app.use(cors(corsOptions))
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World from the backend!');
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});