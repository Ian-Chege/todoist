document.getElementById('addTaskButton').addEventListener('click', addTask);

let totalTasks = 0;
let completedTasks = 0;

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create new task list item
  const taskList = document.getElementById('taskList');
  const newTask = document.createElement('li');

  const taskDetails = document.createElement('div');
  taskDetails.classList.add('task-details');
  taskDetails.innerHTML = `
    <span>${taskText}</span><br>
    <small>${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}</small>
  `;

  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  const editButton = document.createElement('button');
  editButton.classList.add('edit-btn');
  editButton.textContent = '✏️';
  editButton.addEventListener('click', () => {
    editTask(newTask, taskDetails);
  });

  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-btn');
  completeButton.textContent = '✅';
  completeButton.addEventListener('click', () => {
    completeTask(newTask);
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.textContent = '🗑️';
  deleteButton.addEventListener('click', () => {
    deleteTask(newTask);
  });

  taskActions.append(editButton, completeButton, deleteButton);
  newTask.append(taskDetails, taskActions);
  taskList.appendChild(newTask);

  // Update statistics
  totalTasks++;
  updateStats();

  // Clear input field
  taskInput.value = '';
}

function editTask(taskItem, taskDetails) {
  const newTaskText = prompt('Edit your task:', taskDetails.querySelector('span').textContent);
  if (newTaskText) {
    taskDetails.querySelector('span').textContent = newTaskText;
  }
}

function completeTask(taskItem) {
  if (!taskItem.classList.contains('completed')) {
    taskItem.classList.add('completed');
    completedTasks++;
    updateStats();
  }
}

function deleteTask(taskItem) {
  if (taskItem.classList.contains('completed')) {
    completedTasks--;
  }
  taskItem.remove();
  totalTasks--;
  updateStats();
}

function updateStats() {
  document.getElementById('totalTasks').textContent = totalTasks;
  document.getElementById('completedTasks').textContent = completedTasks;
  document.getElementById('completionRate').textContent = `${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%`;
}
