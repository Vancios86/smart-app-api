import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
//import endpoints functionality
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handleEntriesCount from './controllers/entries.js';
//connect to database
const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'pass',
    database: 'smart-app',
  },
});

const app = express();
//middleware
app.use(bodyParser.json());
app.use(cors());

//endpoints
app.get('/', (req, res) => {
  res.send('server is running');
});

app.post('/signin', (req, res) => {
  handleSignin(req, res, db, bcrypt);
});

app.post('/register', (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  handleProfile(req, res, db);
});

app.put('/image', (req, res) => {
  handleEntriesCount(req, res, db);
});

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  console.log(`server listening on ${PORT}`);
});
