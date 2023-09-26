import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.js";

import express from "express";
import cors from "cors"; // Import the 'cors' module

const app = express();
app.use(cors());

// const corsOptions = {
//   origin: 'http://localhost:8000', // Replace with your frontend domain
//   methods: 'GET,HEAD,PUT,PATCH,DELETE,OPTIONS',
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));


// Create an express router
const router = express.Router();

// Every path we define here will get /api/todos prefix
// To make code even more cleaner we can wrap functions in `./controllers` folder

// GET /api/todos
router.get("/", getTodos);
// POST /api/todos
router.post("/", createTodo);
// PUT /api/todos/:id
router.put("/:id", updateTodo);
// DELETE /api/todos/:id
router.delete("/:id", deleteTodo);

// router.get("/:id", getTodoById);

// export the router
export default router;
