const { response } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
const file = './users.json';

//AUX FUNCTIONS

function getFile() {
  const text = fs.readFileSync(file);
  return JSON.parse(text);
}

function saveToFile(arr) {
  fs.writeFileSync(file, JSON.stringify(arr, null, 2));
}

const myLogger = (req, res, next) => {
  const log = {
    date: new Date(),
    url: req.url
  };
  console.log(JSON.stringify(log, null, 2));
  next();
};

// FUNCTIONS

const getUsersAll = (req, res) => {
  const users = getFile();
  const userName = req.query.name;
  const search = userName ? users.filter((user) => user.name.toLowerCase().includes(userName)) : users;
  res.send(search);
};

const getUserById = (req, res) => {
  const users = getFile();
  const user = users.findIndex((user) => user.id === Number(req.params.id));
  res.send(users[user]);
};

const postUser = (req, res) => {
  const users = getFile();
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  saveToFile(users);
  res.send(newUser);
};

const putUser = (req, res) => {
  const users = getFile();
  const user = users.find((user) => user.id === Number(req.params.id));
  user.name = req.body.name;
  saveToFile(users);
  res.send(user);
};

const deleteUser = (req, res) => {
  let users = getFile();
  const deletedUser = users.find((user) => user.id === Number(req.params.id));
  users = users.filter((user) => user.id !== Number(req.params.id));
  saveToFile(users);
  res.send(deletedUser);
};

//MIDDLEWARE

app.use(express.json()); // para poder traer datos desde el body
app.use(myLogger);
app.get('/users', getUsersAll);
app.get('/users/:id', getUserById);
app.post('/users', postUser);
app.put('/users/:id', putUser);
app.delete('/users/:id', deleteUser);

//SERVER

const port = 3000;
const url = `http://localhost:${port}/quotes`;
app.listen(port, () => console.log(`Listening on port ${url}`));
