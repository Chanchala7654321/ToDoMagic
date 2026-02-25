

let input = document.getElementById("task-input");
let addBtn = document.getElementById("add-task");
let clearBtn = document.getElementById("clear-task");

let taskList = document.getElementById("list-container");

let allCountTask = document.getElementById("allCount");
let completedCountTask = document.getElementById("completedCount");
let pendingCountTask = document.getElementById("pendingCount");





addBtn.addEventListener("click", function () {
    let inputVal = input.value;
    console.log(inputVal.length);
    if (inputVal.length > 5) {
        let li = document.createElement("li");  /* Create list dynamically using JavaScript. */
        let editBtn = document.createElement("button"); /* Create button dynamically using JavaScript. */
        editBtn.innerText = "Edit";
        let deletBtn = document.createElement("button"); /* Create button dynamically using JavaScript. */
        deletBtn.innerText = "Delete";


        li.innerText = inputVal;

        taskList.appendChild(li);
        li.appendChild(editBtn)
        li.appendChild(deletBtn)

        input.value = "";
    }

    else if (inputVal.length === 0) {
        alert("Add your task here....")
    }
    else {
        alert("Describe more!")
    }


})



clearBtn.addEventListener("click", function () {
    input.value = "";
    // showToast("Input cleared!");
});






// function showToast(message) {
//     let toast = document.getElementById("toast");

//     // Create toast div if it doesn't exist
//     if (!toast) {
//         toast = document.createElement("div");
//         toast.id = "toast";
//         toast.className = "toast";
//         document.body.appendChild(toast);
//     }

//     toast.innerText = message;
//     toast.classList.add("show");

//     setTimeout(() => {
//         toast.classList.remove("show");
//     }, 3000);
// }


