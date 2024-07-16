document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('filter-tasks').addEventListener('change', filterTasks);

let isEditing = false;
let currentTaskItem = null;

function addTask(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value.trim();
    const taskDesc = document.getElementById('task-desc').value.trim();
    const taskDate = document.getElementById('task-date').value;

    if (taskTitle !== '') {
        if (isEditing && currentTaskItem) {
            // Update the existing task
            updateTask(currentTaskItem, taskTitle, taskDesc, taskDate);
        } else {
            // Add a new task
            createNewTask(taskTitle, taskDesc, taskDate);
        }

        $('#taskModal').modal('hide');
        document.getElementById('task-form').reset();
        resetModal();
    }
}

function createNewTask(title, desc, date) {
    const taskList = document.getElementById('task-list');

    if (taskList.innerHTML === "List is empty.") {
        taskList.innerHTML = '';
    }

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <div class="task-content">
            <strong class="task-title">${title}</strong>
            <p class="task-desc">${desc}</p>
            <small>Due: ${date}</small>
        </div>
        <div>
            <button class="delete-btn"><i class="bi bi-trash3"></i></button>
            <button class="edit-btn"><i class="bi bi-pencil-square"></i></button>
            <button class="complete-btn">Mark as Completed</button>
        </div>
    `;

    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        taskItem.remove();
        updateEmptyListMessage();
    });

    taskItem.querySelector('.edit-btn').addEventListener('click', () => {
        editTask(taskItem);
    });

    taskItem.querySelector('.complete-btn').addEventListener('click', () => {
        toggleComplete(taskItem);
    });

    taskList.appendChild(taskItem);
}

function updateEmptyListMessage() {
    const taskList = document.getElementById('task-list');
    if (taskList.children.length === 0) {
        taskList.innerHTML = 'List is empty.';
    }
}

function editTask(taskItem) {
    isEditing = true;
    currentTaskItem = taskItem;

    const title = taskItem.querySelector('.task-title').textContent;
    const desc = taskItem.querySelector('.task-desc').textContent;
    const date = taskItem.querySelector('small').textContent.replace('Due: ', '');

    document.getElementById('taskModalLabel').textContent = 'Edit Task';
    document.querySelector('#task-form button[type="submit"]').textContent = 'Update';

    document.getElementById('task-title').value = title;
    document.getElementById('task-desc').value = desc;
    document.getElementById('task-date').value = date;

    $('#taskModal').modal('show');
}

function updateTask(taskItem, title, desc, date) {
    taskItem.querySelector('.task-title').textContent = title;
    taskItem.querySelector('.task-desc').textContent = desc;
    taskItem.querySelector('small').textContent = `Due: ${date}`;

    isEditing = false;
    currentTaskItem = null;
}

function toggleComplete(taskItem) {
    const title = taskItem.querySelector('.task-title');
    const desc = taskItem.querySelector('.task-desc');
    const completeBtn = taskItem.querySelector('.complete-btn');

    if (taskItem.classList.toggle('completed')) {
        title.classList.add('completed');
        desc.classList.add('completed');
        completeBtn.textContent = 'Unmark as Completed';
    } else {
        title.classList.remove('completed');
        desc.classList.remove('completed');
        completeBtn.textContent = 'Mark as Completed';
    }
}

function filterTasks() {
    const filter = document.getElementById('filter-tasks').value;
    const tasks = document.querySelectorAll('.task-item');

    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.style.display = 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            case 'uncompleted':
                task.style.display = !task.classList.contains('completed') ? 'flex' : 'none';
                break;
        }
    });
}

function resetModal() {
    document.getElementById('taskModalLabel').textContent = 'Add Task';
    document.querySelector('#task-form button[type="submit"]').textContent = 'Add';
    isEditing = false;
    currentTaskItem = null;
}
