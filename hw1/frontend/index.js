const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");
const apiRoot = "http://localhost:8000/api";

async function main() {
  updateCurrentDateTime();
  setInterval(updateCurrentDateTime, 1000);
  setupEventListeners();
  try {
    const todos = await getTodos();
    todos.forEach((todo) => renderTodo(todo));
  } catch (error) {
    alert("Failed to load todos!");
  }
}
// add func for showing date
function updateCurrentDateTime() {
  const dateTimeElement = document.getElementById("current-date-time");
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  dateTimeElement.textContent = "Current Date: " + formattedDate;
}


function setupEventListeners() {
  const addTodoButton = document.querySelector("#todo-add");
  const todoInput = document.querySelector("#todo-input");
  const todoDescriptionInput = document.querySelector(
    "#todo-description-input",
  );
  addTodoButton.addEventListener("click", async () => {
    const title = todoInput.value;
    const description = todoDescriptionInput.value;
    if (!title) {
      alert("Please enter a todo title!");
      return;
    }
    if (!description) {
      alert("Please enter a todo description!");
      return;
    }
    try {
      const todo = await createTodo({ title, description });
      renderTodo(todo);
    } catch (error) {
      alert("Failed to create todo!");
      return;
    }
    todoInput.value = "";
    todoDescriptionInput.value = "";
  });
}

function renderTodo(todo) {
  const item = createTodoElement(todo);
  todoList.appendChild(item);
}

function createTodoElement(todo) {
  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".todo-item");
  container.id = todo.id;
  const checkbox = item.querySelector(`input[type="checkbox"]`);
  checkbox.checked = todo.completed;
  checkbox.dataset.id = todo.id;
  const title = item.querySelector("p.todo-title");
  title.innerText = todo.title;
  // add catagory and mood
  const category = item.querySelector("p.todo-category");
  category.innerText = todo.category;
  const mood = item.querySelector("p.todo-mood");
  mood.innerText = todo.mood;
  const description = item.querySelector("p.todo-description");
  description.innerText = todo.description;
  const deleteButton = item.querySelector("button.delete-todo");
  deleteButton.dataset.id = todo.id;
  deleteButton.addEventListener("click", () => {
    deleteTodoElement(todo.id);
  });
  return item;
}

async function deleteTodoElement(id) {
  try {
    await deleteTodoById(id);
  } catch (error) {
    alert("Failed to delete todo!");
  } finally {
    const todo = document.getElementById(id);
    todo.remove();
  }
}

async function getTodos() {
  const response = await fetch(`${apiRoot}/todos`);
  const data = await response.json();
  return data;
}

async function createTodo(todo) {
  const response = await fetch(`${apiRoot}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  
  return data;
}

// eslint-disable-next-line no-unused-vars
async function updateTodoStatus(id, todo) {
  const response = await fetch(`${apiRoot}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  return data;
}

async function deleteTodoById(id) {
  const response = await fetch(`${apiRoot}/todos/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
}

main();
