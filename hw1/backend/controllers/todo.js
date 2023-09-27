import TodoModel from "../models/todoModel.js";

// Get all todos
export const getTodos = async (req, res) => {
  try {
    // Find all todos
    const todos = await TodoModel.find({});

    // Return todos
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a todo
export const createTodo = async (req, res) => {
  const { title, description, option1, option2, date } = req.body;

  // Check title, description, option1, and option2
  if (!title || !description || !option1 || !option2) {
    return res
      .status(400)
      .json({ message: "Title, description, option1, and option2 are required!" });
  }

  // Create a new todo
  try {
    const newTodo = await TodoModel.create({
      title,
      description,
      option1,
      option2,
      date,
      completed: false,
    });
    return res.status(201).json(newTodo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, option1, option2, date } = req.body;

  try {
    // Check if the id is valid
    const existedTodo = await TodoModel.findById(id);
    if (!existedTodo) {
      return res.status(404).json({ message: "Todo not found!" });
    }

    // Update the todo
    if (title !== undefined) existedTodo.title = title;
    if (description !== undefined) existedTodo.description = description;
    if (completed !== undefined) existedTodo.completed = completed;
    if (option1 !== undefined) existedTodo.option1 = option1;
    if (option2 !== undefined) existedTodo.option2 = option2;
    if (date !== undefined) existedTodo.date = date;
    // Save the updated todo
    await existedTodo.save();

    // Rename _id to id
    existedTodo.id = existedTodo._id;
    delete existedTodo._id;

    return res.status(200).json(existedTodo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedTodo = await TodoModel.findById(id);
    if (!existedTodo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    // Delete the todo
    await TodoModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
