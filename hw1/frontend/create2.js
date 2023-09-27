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
    const todoDescriptionInput = document.querySelector("#todo-description-input");
    const todoOption1 = document.querySelector("#option1-input");
    const todoOption2 = document.querySelector("#option2-input");

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
    const date = encodeURIComponent(todoItem.dataset.showdate);

    const editUrl = `edit.html?id=${todoId}&title=${title}&description=${description}&option1=${option1}&option2=${option2}&date=${date}`;

    window.location.href = editUrl;
}

function createTodoElement(todo) {
    const item = itemTemplate.content.cloneNode(true);
    const container = item.querySelector(".todo-item");
    container.id = todo.id;
    container.dataset.title = todo.title;
    container.dataset.description = todo.description;
    container.dataset.option1 = todo.option1;
    container.dataset.option2 = todo.option2;
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);
    todo.date = formattedDate;
    container.dataset.date = formattedDate;

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

    const deleteButton = item.querySelector("button.delete-todo");
    deleteButton.dataset.id = todo.id;
    const editButton = item.querySelector("button.edit-todo");
    editButton.dataset.id = todo.id;

    deleteButton.addEventListener("click", () => {
        deleteTodoElement(todo.id);
    });
    editButton.addEventListener("click", () => {
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
    return response.data;
}

main();
