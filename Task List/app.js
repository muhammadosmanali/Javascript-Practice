
const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskinput = document.querySelector('#task');

//load event listener
loadEventListeners();

//load event listener function
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTask);
  form.addEventListener('submit', addTask);
  tasklist.addEventListener('click', removeTask);
  clearbtn.addEventListener('click', clearList);
  filter.addEventListener('keyup', filterList);
  
}

//get task from local storage
function getTask() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    tasklist.appendChild(li);
  });
}

//Add task
function addTask(e) {
  if(taskinput.value === '' ) {
    alert('Task is empty');
  } else {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskinput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    li.appendChild(link);
    tasklist.appendChild(li);
    addTasktoLocalStorage(taskinput.value);
  }
  taskinput.value = '';
  e.preventDefault();
}

//add tasks to local storage
function addTasktoLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove tasks
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
}

//Remove tasks from local storage
function removeTaskFromLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(item, index) {
    if(task.textContent === item) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear all Lists
function clearList() {
  while(tasklist) {
    tasklist.removeChild(tasklist.firstChild);
    localStorage.clear();
  }
}

//filter List
function filterList(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    let item = task.firstChild.textContent; 
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}