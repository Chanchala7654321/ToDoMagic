

let input = document.getElementById("task-input");
let addBtn = document.getElementById("add-task");
let clearBtn = document.getElementById("clear-task");

let taskList = document.getElementById("list-container");
let btnGroup = document.getElementById("btnGroup")

let allCountTask = document.getElementById("allCount");
let completedCountTask = document.getElementById("completedCount");
let pendingCountTask = document.getElementById("pendingCount");




let allTasks = JSON.parse(localStorage.getItem("myTask")) || [];

function saveTasks() {
    localStorage.setItem("myTask", JSON.stringify(allTasks));
}

addBtn.addEventListener("click", function () {
    let inputVal = input.value.trim();

    if (inputVal.length === 0) {
        alert("Add your task here....");
        return;
    }

    if (inputVal.length <= 5) {
        alert("Describe more!");
        return;
    }

    // Create task object
    let taskObj = {
        text: inputVal,
        completed: false
    };

    allTasks.push(taskObj);
    saveTasks();

    // Create list item
    let liItem = document.createElement("li");

    liItem.innerHTML = `
        <div class="taskItem">
            <div class="task">
                <input type="checkbox" class="checkbox" />
                <p>${inputVal}</p>
            </div>
            <div class="icons">
                <i class="fa-regular fa-pen-to-square"></i>
                <i class="fa-regular fa-trash-can"></i>
            </div>
        </div>
    `;

    taskList.appendChild(liItem);

    input.value = "";
});

