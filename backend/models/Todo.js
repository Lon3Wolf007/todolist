const db = require("../db");

const Todo = {
  getAll: (callback) => {
    db.query("SELECT * FROM todos", callback);
  },
  create: (task, callback) => {
    db.query("INSERT INTO todos (task) VALUES (?)", [task], callback);
  },
  delete: (id, callback) => {
    db.query("DELETE FROM todos WHERE id = ?", [id], callback);
  },
};

module.exports = Todo;
