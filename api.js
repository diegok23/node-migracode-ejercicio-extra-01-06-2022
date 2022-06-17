const database = require('./database');

const getUsersAll = (req, res) => {
  const users = database.getFile();
  const userName = req.query.name;
  const search = userName ? users.filter((user) => user.name.toLowerCase().includes(userName)) : users;
  res.send(search);
};

const getUserById = (req, res) => {
  const users = database.getFile();
  const user = users.findIndex((user) => user.id === Number(req.params.id));
  res.send(users[user]);
};

const postUser = (req, res) => {
  const users = database.getFile();
  const newUser = req.body;
  const maxUserId = Math.max.apply(
    null,
    users.map((user) => user.id)
  );
  newUser.id = maxUserId + 1;
  users.push(newUser);
  database.saveToFile(users);
  res.send(newUser);
};

const putUser = (req, res) => {
  const users = database.getFile();
  const user = users.find((user) => user.id === Number(req.params.id));
  user.name = req.body.name;
  database.saveToFile(users);
  res.send(user);
};

const deleteUser = (req, res) => {
  let users = database.getFile();
  const deletedUser = users.find((user) => user.id === Number(req.params.id));
  users = users.filter((user) => user.id !== Number(req.params.id));
  database.saveToFile(users);
  res.send(deletedUser);
};

module.exports = {
  getUsersAll,
  getUserById,
  postUser,
  putUser,
  deleteUser
};
