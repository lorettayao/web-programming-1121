document.addEventListener("DOMContentLoaded", async function () {
    // Get todo data for editing from some source (e.g., URL query parameter or local storage)
    const todoId = getTodoIdFromQueryParam(); // Implement this function to extract the todo ID

    try {
        // Fetch todo data for editing
        const todoData = await getTodo(todoId);

        // Populate the edit fields with todo data
        const editTitle = document.getElementById("edit-title");
        const editDescription = document.getElementById("edit-description");
        const editDate = document.getElementById("edit-date");

        editTitle.value = todoData.title;
        editDescription.value = todoData.description;
        editDate.value = todoData.date;

        // Add click event listener to "Save" button
        const saveButton = document.getElementById("save-button");
        saveButton.addEventListener("click", async () => {
            // Get the edited values
            const editedTitle = editTitle.value;
            const editedDescription = editDescription.value;

            // Update the todo data (send it to the server for update)
            await updateTodo(todoId, { title: editedTitle, description: editedDescription });

            // Redirect back to index.html
            window.location.href = "index.html";
        });
    } catch (error) {
        console.error("Error loading todo for editing:", error);
        // Handle the error as needed, e.g., display an error message to the user
    }
});

// Implement the getTodoIdFromQueryParam and any other necessary functions here
function getTodoIdFromQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const todoId = urlParams.get("id");
    return todoId;
}

// Function to fetch todo data for editing
async function getTodo(todoId) {
    try {
        // Replace with your API endpoint for fetching a single todo by its ID
        const response = await axios.get(`http://localhost:8000/api/todos/${todoId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching todo:", error);
        throw error;
    }
}

// Function to update todo data
async function updateTodo(todoId, updatedData) {
    try {
        // Replace with your API endpoint for updating a todo by its ID
        const response = await axios.put(`http://localhost:8000/api/todos/${todoId}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating todo:", error);
        throw error;
    }
}

function getTodoIdFromQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const todoId = urlParams.get("id");
    return todoId;
}