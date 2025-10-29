const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mayanksaini0416_db_user:%40Mayank0416@cluster0.v0rdlpc.mongodb.net/todos")

//.env
// create schema
  const todoSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean,
  })

  const todo = mongoose.model('todo', todoSchema)

  module.exports = {
    todo
}
