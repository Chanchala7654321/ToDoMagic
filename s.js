let input = document.getElementById("task-input");
let addBtn = document.getElementById("add-task");
let clearBtn = document.getElementById("clear-task");

let taskList = document.getElementById("list-container");

let allCountTask = document.getElementById("allCount");
let completedCountTask = document.getElementById("completedCount");
let pendingCountTask = document.getElementById("pendingCount");

// Load from localStorage
let allTasks = JSON.parse(localStorage.getItem("myTask")) || [];

// ===================== SAVE FUNCTION =====================
function saveTasks() {
    localStorage.setItem("myTask", JSON.stringify(allTasks));
}

// ===================== RENDER FUNCTION =====================
function renderTasks() {
    taskList.innerHTML = "";

    allTasks.forEach(function (task) {
        let li = document.createElement("li");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = task.completed;

        let span = document.createElement("span");
        span.innerText = task.text;

        if (task.completed) {
            span.style.textDecoration = "line-through";
        }

        let btnGroup = document.createElement("div");

        let editBtn = document.createElement("button");
        editBtn.innerText = "Edit";

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";

        // ===== Checkbox =====
        checkBox.addEventListener("change", function () {
            task.completed = checkBox.checked;
            saveTasks();
            renderTasks();
        });

        // ===== Delete =====
        deleteBtn.addEventListener("click", function () {
            allTasks = allTasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        // ===== Edit =====
        editBtn.addEventListener("click", function () {
            let newValue = prompt("Edit your task:", task.text);

            if (newValue !== null && newValue.trim() !== "") {
                task.text = newValue;
                saveTasks();
                renderTasks();
            }
        });

        li.appendChild(checkBox);
        li.appendChild(span);
        li.appendChild(btnGroup);
        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateCounters();
}

// ===================== COUNTER FUNCTION =====================
function updateCounters() {
    let total = allTasks.length;
    let completed = allTasks.filter(task => task.completed).length;
    let pending = total - completed;

    allCountTask.innerText = total;
    completedCountTask.innerText = completed;
    pendingCountTask.innerText = pending;
}

// ===================== ADD TASK =====================
addBtn.addEventListener("click", function () {
    let inputVal = input.value.trim();

    if (inputVal.length > 5) {

        let newTask = {
            id: Date.now(),
            text: inputVal,
            completed: false
        };

        allTasks.push(newTask);
        saveTasks();
        renderTasks();

        input.value = "";
    }
    else if (inputVal.length === 0) {
        alert("Add your task here....");
    }
    else {
        alert("Describe more!");
    }
});

// ===================== CLEAR INPUT =====================
clearBtn.addEventListener("click", function () {
    input.value = "";
});

// Load tasks on page start
renderTasks();