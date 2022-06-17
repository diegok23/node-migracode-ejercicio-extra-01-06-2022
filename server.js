const { response } = require('express');
const express = require('express');
const app = express();
const api = require('./api');

//AUX FUNCTIONS

const myLogger = (req, res, next) => {
  const log = {
    date: new Date(),
    url: req.url
  };
  console.log(JSON.stringify(log, null, 2));
  next();
};

//MIDDLEWARE

app.use(express.json()); // para poder traer datos desde el body
app.use(myLogger);
app.get('/users', api.getUsersAll);
app.get('/users/:id', api.getUserById);
app.post('/users', api.postUser);
app.put('/users/:id', api.putUser);
app.delete('/users/:id', api.deleteUser);

//SERVER

const port = 3000;
const url = `http://localhost:${port}/users`;
app.listen(port, () => console.log(`Listening on port ${url}`));
