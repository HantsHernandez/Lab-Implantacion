const API_URL = "http://localhost:3000/tasks";

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("btn-agregar").addEventListener("click", () => {
        const title = document.getElementById("tarea").value.trim();
        if (title !== "") {
            addTask(title);
            document.getElementById("tarea").value = "";
        }
    });


    document.getElementById("task-table").addEventListener("click", (event) => {
        if (event.target.classList.contains('btn-check-box')) {
            const id = event.target.closest("tr").getAttribute("id");
            const completed = event.target.checked;
            toggleTask(id, completed);
        }
        if (event.target.classList.contains('btn-eliminar')) {
            const id = event.target.closest("tr").getAttribute("id");
            deleteTask(id);
        }
    });

    loadTasks();
});


async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al cargar tareas");
        const tasks = await response.json();
        tasks.forEach(task => addRow(task));
    } catch (error) {
        console.error("Error:", error);
    }
}

async function addTask(title) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
        });
        if (!response.ok) throw new Error("Error al agregar tarea");
        const task = await response.json();
        addRow(task);
    } catch (error) {
        console.error("Error:", error);
    }
}

async function toggleTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ completed })
        });
        if (!response.ok) throw new Error("Errorr al actualizar tarea");
        const task = await response.json();

        const fila = document.getElementById(id);
        fila.querySelector(".completed").innerText = task.completed ? "Completada" : "Pendiente";
    } catch (error) {
        console.error("Error:", error);
    }
}


async function deleteTask(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Error al eliminar tarea");

        const fila = document.getElementById(id);
        fila.remove();
    } catch (error) {
        console.error("Error:", error);
    }
}

function addRow(task) {
    const fila = document.getElementById("fila").querySelector("tr").cloneNode(true);
    fila.setAttribute("id", task.id);
    fila.querySelector(".id").innerText = task.id;
    fila.querySelector(".title").innerText = task.title;
    fila.querySelector(".completed").innerText = task.completed ? "Completada" : "Pendiente";
    fila.querySelector(".created_at").innerText = new Date(task.created_at).toLocaleString();
    fila.querySelector(".btn-check-box").checked = task.completed;
    document.getElementById("task-table").appendChild(fila);
}