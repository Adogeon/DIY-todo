const mongoose = require("mongoose")

let User;
let Todos;

const init = () => {
  mongoose.connect("mongodb://localhost/test", {useNewUrlParser: true, useUnifiedTopology: true})
  const db = mongoose.connection;
  db.on(`error`, console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    console.log("Database is connected");
    const todoSchema = new mongoose.Schema({
      text: String,
      order: Number
    })
    const userSchema = new mongoose.Schema({
      username: String,
      password: String
    })

    Todos = mongoose.model('Todo', todoSchema);
    User = mongoose.model("User",userSchema);
  })
}

module.exports = {
  init,
  Todos,
  User
}