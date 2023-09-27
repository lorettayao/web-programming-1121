

const instance = axios.create({
    baseURL: "http://localhost:8000/api",
  });

document.addEventListener("DOMContentLoaded", async function () {
    // Get todo data for editing from some source (e.g., URL query parameter or local storage)
    // const todoId = getTodoIdFromQueryParam(); // Implement this function to extract the todo ID
    try {
        // Fetch todo data for editing
        // const todoData = await getTodo(todoId);
        // console.log("tododata.date:",todoData.date);
        //undefined
        // Populate the edit fields with todo data
        const editTitle = document.getElementById("edit-title");
        const editDescription = document.getElementById("edit-description");
        // const editDate = document.getElementById("edit-date");
        // const editOption1 = document.getElementById("edit-option1");
        // const editOption2 = document.getElementById("edit-option2");
        

        // editTitle.value = todoData.title;
        // editDescription.value= todoData.description;
        // editDate.value = todoData.date;
        // editOption1.value=todoData.option1;
        // editOption2.value=todoData.option2;

// Get the select elements
const editOption1Select = document.getElementById("edit-option1");
const editOption2Select = document.getElementById("edit-option2");

// Get the "Add" buttons
const addOption1Button = document.getElementById("add-option1-button");
const addOption2Button = document.getElementById("add-option2-button");

// Event listeners for "Add" buttons
addOption1Button.addEventListener("click", () => {
    const newOption1 = prompt("Enter a new option for Option1:");
    if (newOption1) {
        const optionElement = document.createElement("option");
        optionElement.textContent = newOption1;
        editOption1Select.appendChild(optionElement);
    }
});

addOption2Button.addEventListener("click", () => {
    const newOption2 = prompt("Enter a new option for Option2:");
    if (newOption2) {
        const optionElement = document.createElement("option");
        optionElement.textContent = newOption2;
        editOption2Select.appendChild(optionElement);
    }
});

// Event listener for the "Save" button
document.getElementById("save-button").addEventListener("click", () => {
    // const selectedOptions = getSelectedOptions().option1;

    // Redirect to index.html with the selected options as query parameters
    // const redirectUrl = `index.html?option1=${encodeURIComponent(selectedOptions.option1)}&option2=${encodeURIComponent(selectedOptions.option2)}`;
    
    const redirectUrl = `index.html?option1=${encodeURIComponent(getSelectedOptions().option1)}&option2=${encodeURIComponent(getSelectedOptions().option2)}`;
    window.location.href = redirectUrl;
});      

        // Add click event listener to "Save" button
        const saveButton = document.getElementById("save-button");
        saveButton.addEventListener("click", async () => {
            // Get the edited values
            const editedTitle = editTitle.value;
            const editedDescription = editDescription.value;
            // const editedDate = editDate.value;
            const editedOption1=getSelectedOptions().option1;
            const editedOption2=getSelectedOptions().option2;

            // console.log("after edit?",editedTitle);
            // console.log("date?",editedDate);
            // Update the todo data
            const todo = await createTodo({
                title: editedTitle.value,
                description: editedDescription.value,
                // date: editedDate, // Include the edited date
                option1: editedOption1.value,
                option2: editedOption2.value,
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


// // Function to fetch todo data for editing
// async function getTodo(todoId) {
//     try {
//         // Replace with your API endpoint for fetching a single todo by its ID
//         // 參考後段的API implement 方法
//         const response = await instance.get(`/todos`);
//         const todos = response.data;
//         const todo = todos.find((t) => t.id === todoId);
//         if (todo) {
//             console.log("title:",todo.title);
//             console.log("date",todo.date);
//             return todo;
//         } else {
//             throw new Error(`Todo with ID ${todoId} not found.`);
//         }
//     } catch (error) {
//         console.error("Error fetching todo:", error);
//         throw error;
//     }
    
// }

// Function to update todo data
// async function updateTodo(todoId, updatedData) {
//     try {
//       // Replace with your API endpoint for updating a todo by its ID
//       const response = await instance.put(`/todos/${todoId}`, updatedData);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating todo:", error.response.data);
//       throw error;
//     }
//   }





// Function to get the selected options for option1 and option2

function getSelectedOptions() {
    return {
        option1: editOption1Select.value,
        option2: editOption2Select.value,
    };
}

async function createTodo(todo){
    const response=await instance.post("/todos",todo);
    return response.data;
}
