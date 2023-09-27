/* global axios */
const itemTemplate = document.querySelector("#todo-item-template");
const todoList = document.querySelector("#todos");

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
});

async function main() {
  
  setupEventListeners();
  try {
    const todos = await getTodos();
    todos.forEach((todo) => renderTodo(todo));
    console.log("hi");
  } catch (error) {
    alert("Failed to load todos!");
  }
}


function setupEventListeners() {
  const addTodoButton = document.querySelector("#todo-add");
  const todoInput = document.querySelector("#todo-input");
  const todoDescriptionInput = document.querySelector(
    "#todo-description-input"
  );
  const todoOption1 =document.querySelector("#option1-input");

  const todoOption2 =document.querySelector("#option2-input");
  // const showdate=document.querySelector("p.showdate")
  const editButton = document.getElementById("#edit-button");

  // addTodoButton.addEventListener("click", async () => {
  //   const title = todoInput.value;
  //   const description = todoDescriptionInput.value;
  //   const option1 = todoOption1.value;
  //   const option2 = todoOption2.value;
    
  //   // console.log("write_2 vlaue:",write_op2);
    
  //   try {
  //     const todo = await createTodo({ title, description, option1, option2 });
  //     // console.log(write_op1);
  //     console.log(todo);
  //     renderTodo(todo);
  //   } catch (error) {
  //     alert("Failed to create todo!");
  //     return;
  //   }
  //   todoInput.value = "";
  //   todoDescriptionInput.value = "";
  // });
  addTodoButton.addEventListener("click", async () => {
    try {
      const todo = await createTodo({});
      console.log(todo);
      renderTodo(todo);
    } catch (error) {
      console.error("Error creating todo:", error.response.data);
      alert("Failed to create todo!");
      return;
    }
  });
  
}

function renderTodo(todo) {
  const item = createTodoElement(todo);
  console.log("create_success");
  todoList.appendChild(item);
}

function editTodo(event) {
  const todoItem = event.target.closest(".todo-item");
  const todoId = todoItem.id;
  const title = encodeURIComponent(todoItem.dataset.title);
  const description = encodeURIComponent(todoItem.dataset.description);
  const option1 = encodeURIComponent(todoItem.dataset.option1);
  const option2 = encodeURIComponent(todoItem.dataset.option2);
  const date = encodeURIComponent(todoItem.dataset.date);

  const editUrl = `edit.html?id=${todoId}&title=${title}&description=${description}&option1=${option1}&option2=${option2}&date=${date}`;

  window.location.href = editUrl;
}


function createTodoElement(todo) {

  const item = itemTemplate.content.cloneNode(true);
  const container = item.querySelector(".todo-item");
  container.id = todo.id;
  container.dataset.title = todo.title; // Store title data
  container.dataset.description = todo.description; // Store description data
  container.dataset.option1 = todo.option1; // Store option1 data
  container.dataset.option2 = todo.option2; // Store option2 data
  const currentDate = new Date().toLocaleDateString();
  container.dataset.date = currentDate; // Store date data
  // console.log("show the title",container.dataset.date);

  const title = item.querySelector("p.todo-title");
  title.innerText = container.dataset.title;

  const description = item.querySelector("p.todo-description");
  description.innerText = container.dataset.description;

  const option1 = item.querySelector("p.todo-option1");
  option1.textContent = container.dataset.option1;

  const option2 = item.querySelector("p.todo-option2");
  option2.textContent = container.dataset.option2;

  const showDateElement = item.querySelector(".showdate");
  showDateElement.textContent = container.dataset.date;

  console.log("show title:",title);
  console.log("ahow option1",option1);

// Select the .showdate element within the cloned item
// const showDateElement = item.querySelector(".showdate");

// Set the text content of the .showdate element to the formatted date
// showDateElement.textContent = currentDate;

  const deleteButton = item.querySelector("button.delete-todo");
  deleteButton.dataset.id = todo.id;
  //fix problem : edit-todo is no longer a button
  const editButton = item.querySelector("button.edit-todo");
  editButton.dataset.id=todo.id;
  

  deleteButton.addEventListener("click", () => {
    deleteTodoElement(todo.id);
  });
  editButton.addEventListener("click", () => {
    // Redirect to edit.html when the button is clicked
      
    window.location.href = `edit.html?id=${todo.id}`;
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
  const response = await instance.get("/todos");
  return response.data;
}

async function createTodo(todo) {
  const response = await instance.post("/todos", todo);
  const reply = response.data;
  console.log("the reply is ",reply);
  return response.data;
}

// eslint-disable-next-line no-unused-vars
async function updateTodoStatus(id, todo) {
  const response = await instance.put(`/todos/${id}`, todo);
  return response.data;
}

async function deleteTodoById(id) {
  const response = await instance.delete(`/todos/${id}`);
  return response.data;
}

// Function to handle adding a new option to the first select list
function addOptionToSelect1() {
  const option1Input = document.getElementById("option1-input");
  const newOption = prompt("Enter a new option for List 1:");

  if (newOption) {
    const option = document.createElement("option");
    option.text = newOption;
    option1Input.appendChild(option);
  }
}

// Function to handle adding a new option to the second select list
function addOptionToSelect2() {
  const option2Input = document.getElementById("option2-input");
  const newOption = prompt("Enter a new option for List 2:");

  if (newOption) {
    const option = document.createElement("option");
    option.text = newOption;
    option2Input.appendChild(option);
  }
}

// Event listeners for the "Add" buttons
document.getElementById("add-option1-button").addEventListener("click", addOptionToSelect1);
document.getElementById("add-option2-button").addEventListener("click", addOptionToSelect2);


main();
