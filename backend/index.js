const express = require("express");
const app = express();
const port = 4999;
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");

const cors = require("cors");

// For development, you can allow all origins.
// For production, you should restrict it to your frontend's URL.
app.use(cors({
  // origin: "http://localhost:5173" // Example for a Vite React app
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send(" do.able a todo application");
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

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({
    todos: todos
  });
});

app.put("/completed/:id", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "You sent the wrong input",
    });
    return;
  }

  try {
    await todo.updateOne({
      _id: req.params.id,
    }, {
      completed: true,
    });

    res.json({
      msg: "Todo marked as completed"
    });
  } catch (e) {
    res.status(500).json({
      msg: "Error updating todo"
    });
  }
});


app.listen(port, () => {
  console.log(`Todo app listening on port ${port}`);
});
