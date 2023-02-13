import { SaveToLocalStorage, GetLocalStorage, RemoveFromLocalStorage, EditLocalStorage } from "./localStorage.js";

let taskNameInput = document.getElementById('taskNameInput');
let taskDescriptionInput = document.getElementById('taskDescriptionInput');
let taskStatusSelect = document.getElementById('taskStatusSelect');
let prioritySelect = document.getElementById('prioritySelect');
let taskDueDateInput = document.getElementById('taskDueDateInput');
let saveTaskBtn = document.getElementById('saveTaskBtn');

let toDoBodyDiv = document.getElementById('toDoBodyDiv');
let inProgressBodyDiv = document.getElementById('inProgressBodyDiv');
let completeBodyDiv = document.getElementById('completeBodyDiv');

saveTaskBtn.addEventListener('click', function () {
    if (taskNameInput.value === '' || taskDescriptionInput.value === '' || taskStatusSelect.value === '' || prioritySelect.value === '' || taskDueDateInput.value === '') { alert('Task Not Created! Not ALL Inputs Were Filled') }
    else {
        let task = {
            taskName: taskNameInput.value,
            taskDescription: taskDescriptionInput.value,
            taskStatus: taskStatusSelect.value,
            taskPriority: prioritySelect.value,
            taskDueDate: taskDueDateInput.value
        };
        SaveToLocalStorage(task);
        CreateTasks();
    }
})



function CreateTasks() {
    toDoBodyDiv.innerHTML = '';
    inProgressBodyDiv.innerHTML = '';
    completeBodyDiv.innerHTML = '';

    let tasks = GetLocalStorage();
    tasks.map(task => {
        let taskName = document.createElement('p');
        if (task.taskPriority == 'high') { taskName.className = 'taskTxt taskTxtWhite'; }
        else { taskName.className = 'taskTxt'; }
        taskName.textContent = 'Name: ' + task.taskName;

        let taskDescription = document.createElement('p');
        if (task.taskPriority == 'high') { taskDescription.className = 'taskTxt taskTxtWhite'; }
        else { taskDescription.className = 'taskTxt'; }
        taskDescription.textContent = 'Description: ' + task.taskDescription;

        let leftCol = document.createElement('div');
        leftCol.className = 'col-8';

        leftCol.appendChild(taskName);
        leftCol.appendChild(taskDescription);

        let editBtn = document.createElement('button');
        editBtn.className = 'btn btn-primary taskBtns';
        editBtn.textContent = 'Edit';
        editBtn.type = 'button';
        editBtn.setAttribute('data-bs-target', '#editModal');
        editBtn.setAttribute('data-bs-toggle', 'modal')
        editBtn.addEventListener('click', function(){
            EditLocalStorage(task);
        })

        let removeBtn = document.createElement('button');
        if (task.taskPriority == 'high') { removeBtn.className = 'btn btn-danger taskBtns taskBtnsWhite'; }
        else { removeBtn.className = 'btn btn-danger taskBtns'; }
        removeBtn.textContent = 'Delete';
        removeBtn.type = 'button';
        removeBtn.addEventListener('click', function(){
            RemoveFromLocalStorage(task);
            CreateTasks();
        })

        let rightCol = document.createElement('div');
        rightCol.className = 'col-4';
        
        rightCol.appendChild(editBtn);
        rightCol.appendChild(removeBtn);

        let row = document.createElement('div');
        row.className = 'row';
        
        row.appendChild(leftCol);
        row.appendChild(rightCol);
        

        let taskColorDiv = document.createElement('div');
        if (task.taskPriority == 'low') { taskColorDiv.className = 'lowPriority'; }
        else if (task.taskPriority == 'medium') { taskColorDiv.className = 'mediumPriority'; }
        else { taskColorDiv.className = 'highPriority'; }
        taskColorDiv.appendChild(row);

        let taskSpacingDiv = document.createElement('div');
        taskSpacingDiv.className = 'taskSpacingDiv';
        taskSpacingDiv.appendChild(taskColorDiv);

        if (task.taskStatus === 'ToDo') { toDoBodyDiv.appendChild(taskSpacingDiv); }
        else if (task.taskStatus === 'InProgress') { inProgressBodyDiv.appendChild(taskSpacingDiv); }
        else { completeBodyDiv.appendChild(taskSpacingDiv); }
    })
}

CreateTasks();

export { CreateTasks };