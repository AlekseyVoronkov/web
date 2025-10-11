document.addEventListener('DOMContentLoaded', function() {
    let addButton = document.querySelector('.addButton');
    let titleInput = document.querySelectorAll('.textBox')[0];
    let descriptionInput = document.querySelectorAll('.textBox')[1];
    let tasksContainer = document.querySelector('.tasks');

    updateNoTasksMessage();

    function createTask(title, description) {
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        let taskTextDiv = document.createElement('div');
        taskTextDiv.className = 'task-text';
        
        let taskTitle = document.createElement('h1');
        taskTitle.className = 'task-title';
        taskTitle.textContent = title;
        
        let taskDesc = document.createElement('p');
        taskDesc.className = 'task-desc';
        taskDesc.textContent = description;
        
        let closeButton = document.createElement('button');
        closeButton.className = 'closeButton';
        closeButton.textContent = 'x';

        taskTextDiv.appendChild(taskTitle);
        taskTextDiv.appendChild(taskDesc);
        taskDiv.appendChild(taskTextDiv);
        taskDiv.appendChild(closeButton);
        
        tasksContainer.appendChild(taskDiv);
        
        closeButton.addEventListener('click', function() {
            taskDiv.remove();
            updateNoTasksMessage();
        });
        updateNoTasksMessage();
    }

    function addTask() {
        let title = titleInput.value;
        let description = descriptionInput.value;
        
        if(title.trim() === '' || description.trim() === '') {
            // should make a modal window for that later ig
            alert('Fill a title and description fields please!');
            return;
        }

        createTask(title, description);
        titleInput.value = '';
        descriptionInput.value = '';
    }

    addButton.addEventListener('click', addTask);

    function updateNoTasksMessage() {
        let existingMessage = document.querySelector('.no-tasks-text');
        let taskCounter = document.querySelectorAll('.task').length;
        let noTasksContainer = document.querySelector('.no-tasks'); 

        if (taskCounter === 0 && !existingMessage) {
            let noTasksMessage = document.createElement('div');
            noTasksMessage.className = 'no-tasks-text';
            noTasksMessage.textContent = 'No tasks';

            noTasksContainer.appendChild(noTasksMessage);
            tasksContainer.appendChild(noTasksContainer);
        }
        else if (taskCounter != 0 && existingMessage) {
            existingMessage.remove();
        }
    }
})
