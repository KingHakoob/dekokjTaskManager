import { CreateTasks } from "./apps.js";

let taskNameEdit = document.getElementById('taskNameEdit');
let taskDescriptionEdit = document.getElementById('taskDescriptionEdit');
let taskStatusEdit = document.getElementById('taskStatusEdit');
let priorityEdit = document.getElementById('priorityEdit');
let taskDueDateEdit = document.getElementById('taskDueDateEdit');
let saveEditBtn = document.getElementById('saveEditBtn');

let editTaskIndex;

function SaveToLocalStorage(object) {
    let dupeTask = false;
    let tasks = GetLocalStorage();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskName == object.taskName && tasks[i].taskDescription == object.taskDescription && tasks[i].taskStatus == object.taskStatus && tasks[i].taskPriority == object.taskPriority && tasks[i].taskDueDate == object.taskDueDate) { dupeTask = true; }
    }

    if (dupeTask) { alert('Task Already Created - No Dupe Tasks') }
    else {
        tasks.push(object);
        localStorage.setItem('Tasks', JSON.stringify(tasks));
    }
}

function GetLocalStorage() {
    let localStorageData = localStorage.getItem('Tasks');

    if (localStorageData == null) {
        return [];
    }

    return JSON.parse(localStorageData);
}

function RemoveFromLocalStorage(object) {
    let tasks = GetLocalStorage();
    let index = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskName == object.taskName && tasks[i].taskDescription == object.taskDescription && tasks[i].taskStatus == object.taskStatus && tasks[i].taskPriority == object.taskPriority && tasks[i].taskDueDate == object.taskDueDate) { index = i; }
    }

    tasks.splice(index, 1);
    localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function EditLocalStorage(object) {
    let tasks = GetLocalStorage();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskName == object.taskName && tasks[i].taskDescription == object.taskDescription && tasks[i].taskStatus == object.taskStatus && tasks[i].taskPriority == object.taskPriority && tasks[i].taskDueDate == object.taskDueDate) { editTaskIndex = i; }
    }

    taskNameEdit.value = object.taskName;
    taskDescriptionEdit.value = object.taskDescription;
    taskStatusEdit.value = object.taskStatus;
    priorityEdit.value = object.taskPriority;
    taskDueDateEdit.value = object.taskDueDate;
}

saveEditBtn.addEventListener('click', function () {
    let dupeTask = false;
    let tasks = GetLocalStorage();
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskName == taskNameEdit.value && tasks[i].taskDescription == taskDescriptionEdit.value && tasks[i].taskStatus == taskStatusEdit.value && tasks[i].taskPriority == priorityEdit.value && tasks[i].taskDueDate == taskDueDateEdit.value) { dupeTask = true; }
    }

    if (dupeTask) { alert('Task Already Created - No Dupe Tasks') }
    else {
        tasks[editTaskIndex] = {
            taskName: taskNameEdit.value,
            taskDescription: taskDescriptionEdit.value,
            taskStatus: taskStatusEdit.value,
            taskPriority: priorityEdit.value,
            taskDueDate: taskDueDateEdit.value
        };
        localStorage.setItem('Tasks', JSON.stringify(tasks));
        CreateTasks();
    }
})

export { SaveToLocalStorage, GetLocalStorage, RemoveFromLocalStorage, EditLocalStorage };