const { response } = require('express');
const express = require('express');
const app = express();
const port = 3000;
let users = require('./users.json'); //Cambiado a let para poder usar el filter en DELETE

app.get('/', (req, res) => res.send('Hello, This is my app!'));

/* app.get('/users', (req, res) => {
    res.send(users);
}); */

// Cómo utilizar el mismo endpoint con y sin un query?
// Si uso los dos no funciona la búsqueda
// En el ejercicio de quotes se utilizó un endpoint (/search) para la búsqueda

app.get('/users', (req, res) => {
  if (req) {
    const termQuery = req.query.name.toLowerCase();
    const search = users.filter((user) => user.name.toLowerCase().includes(termQuery));
    res.send(search);
  } else {
    res.send(users);
  }
});

// Cómo hago para que coincida el tipo de elemento al realizar la búsqueda?
// Hay que usar Built-in objects: Boolean, Number, etc???
// para poder buscar con mas certeza, y poder utilizar ===
// o no es necesario?

app.get('/users/:id', (req, res) => {
  const user = users.findIndex((user) => user.id === Number(req.params.id)); 
  // Sin el Number, en el send el id sale como un string y no realiza bien la búsqueda, 
  // cambia el id pero siempre devuelve el primer objeto
  res.send(users[user]);
});

app.post('/users/:name', (req, res) => {
  let newUser = {
    id: users.length + 1,
    name: req.params.name
  };
  users.push(newUser);
  res.send(users);
});

app.put('/users/:id/:name', (req, res) => {
  const user = users.findIndex((user) => user.id === Number(req.params.id));
  users[user].id = Number(req.params.id);
  users[user].name = req.params.name;
  res.send(users);
});

app.delete('/users/:id', (req, res) => {
  users = users.filter((user) => user.id !== Number(req.params.id));
  res.send(users)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
