bdocument.addEventListener('DOMContentLoaded',() => {
    loadTask()
})

function addTask(){
    const taskInput = document.getElementById('task')
    const taskValue = taskInput.value.trim()
    if(taskValue === ''){
        alert('Please enter the task')
        return
    }
    const taskId = Date.now()
    const task = {id:taskId, text:taskValue}
    saveTask(task)
    renderTasks()
    taskInput.value = ''
}

function saveTask(task){
    const tasks = getTasks()
    tasks.push(task)
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

function getTasks(){
    const tasks = localStorage.getItem('tasks')
    return tasks ? JSON.parse(tasks) : []
}

function deleteTask(id){
    let tasks = getTasks()
    tasks = tasks.filter(task => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    renderTasks()
}

function editTasks(id, newTask){
    const tasks = getTasks()
    const task = tasks.find(task => task.id === id)
    if(task){
        task.text = newTask 
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks()
    }
}

function toggleTask(id){
    const tasks = getTasks()
    const task = tasks.find(task => task.id === id)
    if(task){
        task.completed = !task.completed 
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks()
    }
}

function renderTasks(){
    const taskList = document.getElementById('taskList')
    const tasks = getTasks()
    taskList.innerHTML = ''
    tasks.forEach(task => {
        const taskDiv = document.createElement('div')
        taskDiv.className = 'task'
        taskDiv.innerHTML = `
        <input type = 'checkbox' ${task.completed ? 'checked' : ''} onClick = 'toggleTask(${task.id})'/>
        <span class = '${task.completed ? 'completed' : ''}'>${task.text}</span>       
        <div>
        <button class = "edit-button" onClick = 'promptEditTask(${task.id})'>Edit</button>
        <button class = "delete-button" onClick = 'deleteTask(${task.id})'>Delete</button>
        </div>
        `
        taskList.appendChild(taskDiv)
    });
}

function promptEditTask(id){
    const newTask = prompt('Edit task')
    if(newTask !== null && newTask.trim() !== ''){
        editTasks(id, newTask.trim())
    }
}