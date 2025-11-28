const todoInput = document.getElementById("todo-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const filterBtn = document.getElementById("filter-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const todoBody = document.getElementById("todo-list");


let todos = [];


function renderTodos(list = todos) {
    todoBody.innerHTML = "";

    if (list.length === 0) {
        todoBody.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; padding:15px; color:#94a3b8">
                    No task found
                </td>
            </tr>
        `;
        return;
    }

    list.forEach((todo, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${todo.text}</td>
            <td>${todo.date}</td>
            <td>${todo.completed ? "Completed" : "Pending"}</td>
            <td>
                <button class="complete-btn" onclick="toggleStatus(${index})">✓</button>
                <button class="delete-btn" onclick="deleteTodo(${index})">🗑</button>
            </td>
        `;

        todoBody.appendChild(row);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    const date = dateInput.value;

    if (text === "" || date === "") {
        alert("Please fill all fields!");
        return;
    }

    todos.push({
        text,
        date,
        completed: false
    });

    todoInput.value = "";
    dateInput.value = "";

    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function deleteAll() {
    todos = [];
    renderTodos();
}

function toggleStatus(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

filterBtn.addEventListener("click", () => {
    document.getElementById("filter-popup").style.display = "flex";
});

function closeFilter() {
    document.getElementById("filter-popup").style.display = "none";
}

function applyFilter(type) {
    let filtered = todos;

    if (type === "completed") {
        filtered = todos.filter(t => t.completed);
    }
    else if (type === "pending") {
        filtered = todos.filter(t => !t.completed);
    }

    renderTodos(filtered);
    closeFilter();
}

addBtn.addEventListener("click", addTodo);
deleteAllBtn.addEventListener("click", deleteAll);

renderTodos();