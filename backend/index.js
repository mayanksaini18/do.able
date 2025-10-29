const express = require("express");
const app = express();
app.use(express.json());
const port = 4999;

const { createTodo, updateTodo } = require("./types");

const { todo } = require("./db");

const cors = require("cors");

// For development, you can allow all origins.
// For production, you should restrict it to your frontend's URL.
app.use(cors({
  // origin: "https://your-frontend-domain.com" 
}));



/*
const types = require("./types")
    | object destructuring |
const{createTodo, updateTodo} = require('./types');

*/

app.get("/", (req, res) => {
  res.send("to do application");
});

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "you sent the wrong input ",
    });
    return;
  }
  //put it in mongodb
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  })

  res.json({
    msg: "todo created",
  })
});

app.get("/todo",async (req, res) => {

    const todos = await todo.find({})
    res.json(todos)
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "you sent the wrong input ",
    });
    return;
  }

  await todo.updateOne({
    _id: req.body._id,
  }, {
    completed: true,
  })
  
  res.json({
    msg: "Todo marked as completed"
  })
});

app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
