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
            deleteTaskAlert(closeButton.parentNode);
            updateNoTasksMessage();
        });
        updateNoTasksMessage();
    }

    function deleteTaskAlert(task) {
        let overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        let deleteAlert = document.createElement('section');
        deleteAlert.className = 'delete-alert';

        let alertTitle = document.createElement('h1');
        alertTitle.className = 'alert-title';
        alertTitle.textContent = 'Delete this task?';
        
        let deleteAlertOptions = document.createElement('div');
        deleteAlertOptions.className = 'delete-alert-options'
        let alertButtonYes = document.createElement('button');
        alertButtonYes.className = 'alert-button-yes';
        alertButtonYes.textContent = 'Yes';

        let alertButtonNo = document.createElement('button');
        alertButtonNo.className = 'alert-button-yes';
        alertButtonNo.textContent = 'No';
        

        deleteAlert.appendChild(alertTitle);
        deleteAlertOptions.appendChild(alertButtonYes);
        deleteAlertOptions.appendChild(alertButtonNo);
        deleteAlert.appendChild(deleteAlertOptions);

        overlay.appendChild(deleteAlert);

        document.body.appendChild(overlay);

        alertButtonYes.addEventListener('click', function() {
            overlay.remove();
            task.remove();
            updateNoTasksMessage();
        });

        alertButtonNo.addEventListener('click', function() {
            overlay.remove();
        });

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
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
