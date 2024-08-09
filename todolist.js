document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.querySelector('.task-text').textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToList(task.text, task.completed);
        });
    }

    function addTaskToList(text, completed = false) {
        const li = document.createElement('li');
        if (completed) li.classList.add('completed');
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = text;

        const btns = document.createElement('div');
        btns.className = 'task-btns';

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = () => {
            li.classList.toggle('completed');
            saveTasks();
        };

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
            const newText = prompt('Edit task:', taskText.textContent);
            if (newText) {
                taskText.textContent = newText;
                saveTasks();
            }
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            if (confirm('Are you sure you want to delete this task?')) {
                li.remove();
                saveTasks();
            }
        };

        btns.append(completeBtn, editBtn, deleteBtn);
        li.append(taskText, btns);
        taskList.appendChild(li);
    }

    addTaskBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text) {
            addTaskToList(text);
            taskInput.value = '';
            saveTasks();
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskBtn.click();
        }
    });

    loadTasks();
});

