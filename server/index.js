const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require('pg');
const pgClient = new Pool({
    user: keys.pgUser,
    password: keys.pgPassword,
    host: keys.pgHost,
    port: keys.pgPort,
    database: keys.pgDatabase
});

pgClient.on('error', () => console.log('Lost PG Connection!'));

pgClient
    .query('CREATE TABLE IF NOT EXISTS values (number INT)')
    .catch(err => console.log(err));

// Redis Client Setup
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});
// duplicate connection, as one client can either publish or subscribe information at a time
const redisPublisher = redisClient.duplicate();

// Express Route Handlers
app.get('/', (req, res) => {
    res.send('Hi!');
});

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * FROM values');
    res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values);
    });
});

app.post('/values', async (req, res) => {
    const index = req.body.index;

    if(parseInt(index) > 40) {
        return res.status(422).send('Index too high!');
    }

    // storing a new index in redis
    redisClient.hset('values', index, 'Not calculated yet!');
    // publish an insert event so that worker process can listen and start calculating the value
    redisPublisher.publish('insert', index);
    // add index to table
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index]);

    res.send({ working: true });
})

app.listen(5000, err => {
    console.log('Listening on port 5000!')
});