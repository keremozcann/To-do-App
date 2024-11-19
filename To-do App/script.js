const inputBox = document.getElementById("input-box");
const toDoList = document.getElementById("to-do-list");
const addButton = document.getElementById("add-button");
const infoBox = document.getElementById("info");
const checkIcon = document.getElementById("checkbox");
const clearBtn = document.querySelector(".clear-button");

addButton.addEventListener("click", function (e) {
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", function () {
  loadTask();
  updateTaskInfo();
});

function updateTaskInfo() {
  const tasks = toDoList.getElementsByTagName("li");
  const taskCount = tasks.length;
  const infoText = document.getElementById("info-text");

  if (taskCount > 0) {
    infoText.innerText = `${taskCount} total task(s)`;
    clearBtn.classList.remove("disable");
  } else {
    infoText.innerHTML = "";
    clearBtn.classList.add("disable");
  }
}

function addTask() {
  if (inputBox.value === "") {
    alert("You must enter a task.");
  } else {
    const liItem = document.createElement("li");
    liItem.classList.add("to-do-item");
    liItem.id = "liItem";

    const checkIcon = document.createElement("input");
    checkIcon.type = "checkbox";
    checkIcon.id = "checkbox";
    liItem.appendChild(checkIcon);
    checkIcon.addEventListener("click", taskStatusChange);

    const taskText = document.createElement("span");
    taskText.innerHTML = inputBox.value;
    liItem.appendChild(taskText);
    taskText.addEventListener("click", taskStatusChange);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    liItem.appendChild(deleteIcon);
    deleteIcon.addEventListener("click", deleteTask);

    toDoList.appendChild(liItem);

    inputBox.value = "";

    saveToLocalStorage();
    updateTaskInfo();
  }
}

function deleteTask(e) {
  const liItem = e.target.parentElement;
  toDoList.removeChild(liItem);
  updateTaskInfo();
  saveToLocalStorage();
}

function taskStatusChange(e) {
  const liItem = e.target.parentElement;
  const checkIcon = liItem.querySelector("input[type='checkbox']");
  liItem.classList.toggle("completed");
  if (liItem.classList.contains("completed") == true) {
    checkIcon.checked = true;
  } else {
    checkIcon.checked = false;
  }
  updateTaskInfo();
  saveToLocalStorage();
}

function saveToLocalStorage() {
  const taskItems = toDoList.querySelectorAll("li");
  const tasks = [];
  for (let i = 0; i < taskItems.length; i++) {
    const taskName = taskItems[i].querySelector("span").textContent;
    const isCompleted = taskItems[i].classList.contains("completed");
    tasks.push({ name: taskName, completed: isCompleted });
  }
  localStorage.setItem("taskList", JSON.stringify(tasks));
}

function loadTask() {
  const tasks = JSON.parse(localStorage.getItem("taskList")) || [];

  toDoList.innerHTML = "";

  tasks.forEach(function (task) {
    const liItem = document.createElement("li");
    liItem.classList.add("to-do-item");

    const checkIcon = document.createElement("input");
    checkIcon.type = "checkbox";
    checkIcon.checked = task.completed;
    liItem.appendChild(checkIcon);

    const taskText = document.createElement("span");
    taskText.textContent = task.name;
    liItem.appendChild(taskText);

    if (task.completed) {
      liItem.classList.toggle("completed");
    }

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "fa-solid fa-trash";
    liItem.appendChild(deleteIcon);

    checkIcon.addEventListener("click", taskStatusChange);
    taskText.addEventListener("click", taskStatusChange);
    deleteIcon.addEventListener("click", deleteTask);

    deleteIcon.addEventListener("click", deleteTask);

    toDoList.appendChild(liItem);
  });

  updateTaskInfo();
}

function clearAll() {
  toDoList.innerHTML = "";
  updateTaskInfo();
  saveToLocalStorage();
}
