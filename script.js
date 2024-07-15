document.getElementById('task-form').addEventListener('submit', addTask);
document.getElementById('filter-tasks').addEventListener('change', filterTasks);

function addTask(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value.trim();
    const taskDesc = document.getElementById('task-desc').value.trim();
    const taskDate = document.getElementById('task-date').value;

    if (taskTitle !== '') {
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        taskItem.innerHTML = `
            <div>
                <strong>${taskTitle}</strong>
                <p>${taskDesc}</p>
                <small>Due: ${taskDate}</small>
            </div>
            <div>
                <button class="delete-btn">Delete</button>
                <button class="edit-btn">Edit</button>
                <button class="complete-btn">Mark as Completed</button>
            </div>
        `;

        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            taskItem.remove();
        });

        taskItem.querySelector('.edit-btn').addEventListener('click', () => {
            editTask(taskItem, taskTitle, taskDesc, taskDate);
        });

        taskItem.querySelector('.complete-btn').addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        taskList.appendChild(taskItem);

        $('#taskModal').modal('hide');
        document.getElementById('task-form').reset();
    }
}

function editTask(taskItem, title, desc, date) {
    document.getElementById('task-title').value = title;
    document.getElementById('task-desc').value = desc;
    document.getElementById('task-date').value = date;

    $('#taskModal').modal('show');

    document.getElementById('task-form').addEventListener('submit', function updateTask(event) {
        event.preventDefault();

        taskItem.querySelector('strong').textContent = document.getElementById('task-title').value;
        taskItem.querySelector('p').textContent = document.getElementById('task-desc').value;
        taskItem.querySelector('small').textContent = `Due: ${document.getElementById('task-date').value}`;

        $('#taskModal').modal('hide');
        document.getElementById('task-form').reset();
        document.getElementById('task-form').removeEventListener('submit', updateTask);
    });
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
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
}
