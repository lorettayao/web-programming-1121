

const instance = axios.create({
    baseURL: "http://localhost:8000/api",
  });
document.addEventListener("DOMContentLoaded", async function () {
    // Get todo data for editing from some source (e.g., URL query parameter or local storage)
    const todoId = getTodoIdFromQueryParam(); // Implement this function to extract the todo ID
    try {
        // Fetch todo data for editing
        const todoData = await getTodo(todoId);
        console.log("tododata.date:",todoData.date);
        //undefined
        // Populate the edit fields with todo data
        const editTitle = document.getElementById("edit-title");
        const editDescription = document.getElementById("edit-description");
        const editDate = document.getElementById("edit-date");
        const editOption1 = document.getElementById("edit-option1");
        const editOption2 = document.getElementById("edit-option2");

        editTitle.value = todoData.title;
        editDescription.value= todoData.description;
        editDate.value = todoData.date;
        editOption1.value=todoData.option1;
        editOption2.value=todoData.option2;


        // Add click event listener to "Save" button
        const saveButton = document.getElementById("save-button");
        saveButton.addEventListener("click", async () => {
            // Get the edited values
            const editedTitle = editTitle.value;
            const editedDescription = editDescription.value;
            const editedDate = editDate.value;
            const editedOption1=editOption1.value;
            const editedOption2=editOption2.value;

            console.log("after edit?",editedTitle);
            console.log("date?",editedDate);
            // Update the todo data
            await updateTodo(todoId,{
                title: editedTitle,
                description: editedDescription,
                date: editedDate, // Include the edited date
                option1: editedOption1,
                option2: editedOption2,
            }
            );

            // Redirect back to index.html
            window.location.href = "index.html";
        });
    } catch (error) {
        console.error("Error loading todo for editing:", error);
        // Handle the error as needed, e.g., display an error message to the user
    }
});


// Function to fetch todo data for editing
async function getTodo(todoId) {
    try {
        // Replace with your API endpoint for fetching a single todo by its ID
        // 參考後段的API implement 方法
        const response = await instance.get(`/todos`);
        const todos = response.data;
        const todo = todos.find((t) => t.id === todoId);
        if (todo) {
            return todo;
        } else {
            throw new Error(`Todo with ID ${todoId} not found.`);
        }
    } catch (error) {
        console.error("Error fetching todo:", error);
        throw error;
    }
    
}

// Function to update todo data
async function updateTodo(todoId, updatedData) {
    try {
      // Replace with your API endpoint for updating a todo by its ID
      const response = await instance.put(`/todos/${todoId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating todo:", error.response.data);
      throw error;
    }
  }


function getTodoIdFromQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const todoId = urlParams.get("id");
    console.log("the todoID",todoId);
    return todoId;
}