document.getElementById('taskForm').addEventListener('submit', function(event) {
  event.preventDefault(); // prevents the form from refreshing the page
  addTask();
});

let totalTasks = 0;
let completedTasks = 0;

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  // Error handling section
  if (taskText === '') {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = 'Please enter a task';
    return;
  } else {
    errorMessage.textContent = '';
  }

  const maxLength = 30;
  if (taskText.length > maxLength) {
    errorMessage.textContent = `Task cannot exceed ${maxLength} characters!`;
    return;
  }

  // Create new task list item
  const taskList = document.getElementById('taskList');
  const newTask = document.createElement('li');

  // create task details container
  const taskDetails = document.createElement('div');
  taskDetails.classList.add('task-details');

  // create and append the task details
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  // Create and append the date and time
  const dateSmall = document.createElement('small');
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date());
  dateSmall.textContent = formattedDate;

  // Append elements to task details
  taskDetails.appendChild(taskSpan);
  taskDetails.appendChild(document.createElement('br'));
  taskDetails.appendChild(dateSmall);

  // Create task actions container
  const taskActions = document.createElement('div');
  taskActions.classList.add('task-actions');

  // Create and append the Edit button
  const editButton = document.createElement('button');
  editButton.classList.add('edit-btn');
  editButton.textContent = '✏️';
  editButton.addEventListener('click', () => {
    editTask(newTask, taskDetails);
  });

  // Create and append the Complete button
  const completeButton = document.createElement('button');
  completeButton.classList.add('complete-btn');
  completeButton.textContent = '✅';
  completeButton.addEventListener('click', () => {
    completeTask(newTask);
  });

  // Create and append the Delete button
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-btn');
  deleteButton.textContent = '🗑️';
  deleteButton.addEventListener('click', () => {
    deleteTask(newTask);
  });

  // Append action buttons to taskActions
  taskActions.append(editButton, completeButton, deleteButton);
  // Append taskDetails and taskActions to newTask
  newTask.append(taskDetails, taskActions);
  // Append newTask to taskList
  taskList.appendChild(newTask);

  // Update statistics
  totalTasks++;
  updateStats();

  // Clear input field
  taskInput.value = '';
  taskInput.focus();
}

// Function to inline-edit a task
function editTask(taskItem, taskDetails) {
  const taskSpan = taskDetails.querySelector('span');
  const input = document.createElement('input');
  input.type = 'text';
  input.value = taskSpan.textContent;
  taskDetails.replaceChild(input, taskSpan);

  input.addEventListener('blur', () => {
    if (input.value.trim()) {
      taskSpan.textContent = input.value.trim();
    }
    taskDetails.replaceChild(taskSpan, input);
  });

  input.focus();
}

function completeTask(taskItem) {
  const taskText = taskItem.querySelector('.task-details span');
  if (taskText) {
    if (!taskText.classList.contains('completed')) {
      taskText.classList.add('completed');
      completedTasks++;
    } else {
      taskText.classList.remove('completed');
      completedTasks--;
    }
    updateStats();
  }
}

function deleteTask(taskItem) {
  if(confirm('Are you sure you want to delete this task?')) {
    if (taskItem.classList.contains('completed')) {
      completedTasks--;
    }
    taskItem.remove();
    totalTasks--;
    updateStats();
  }
}

function updateStats() {
  document.getElementById('totalTasks').textContent = totalTasks;
  document.getElementById('completedTasks').textContent = completedTasks;
  document.getElementById('completionRate').textContent = `${totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%`;
}
