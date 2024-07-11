document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
  
    addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        updateLocalStorage();
        taskInput.value = '';
        renderTasks();
      }
    });
  
    function addTaskToDOM(task, index) {
      const taskItem = document.createElement('li');
      taskItem.classList.toggle('completed', task.completed);
      taskItem.dataset.index = index;
  
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
  
      const toggleCompletionButton = document.createElement('button');
      toggleCompletionButton.textContent = task.completed ? 'Uncomplete' : 'Complete';
      toggleCompletionButton.classList.add('toggle-completion');
      toggleCompletionButton.addEventListener('click', () => {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        renderTasks();
      });
  
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('edit-button');
      editButton.addEventListener('click', () => {
        const newTaskText = prompt('Edit your task', tasks[index].text);
        if (newTaskText !== null && newTaskText.trim() !== '') {
          tasks[index].text = newTaskText.trim();
          updateLocalStorage();
          renderTasks();
        }
      });
  
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-button');
      deleteButton.addEventListener('click', () => {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
      });
  
      taskItem.appendChild(taskText);
      taskItem.appendChild(toggleCompletionButton);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    }
  
    function updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => addTaskToDOM(task, index));
    }
  });
  