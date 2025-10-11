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

        taskDiv.addEventListener('click', function(e) {
            let existingOptions = document.querySelector('.task-options');

            if (e.target != closeButton && !existingOptions) {
                let taskOptions = document.createElement('div');
                taskOptions.className = 'task-options';

                let taskOptionShare = document.createElement('button');
                taskOptionShare.className = "task-options-button";
                let shareImage = document.createElement('img');
                shareImage.src = 'img/share.svg';
                taskOptionShare.appendChild(shareImage);

                let taskOptionInfo = document.createElement('button');
                taskOptionInfo.className = "task-options-button";
                let infoImage = document.createElement('img');
                infoImage.src = 'img/info.svg';
                taskOptionInfo.appendChild(infoImage);

                let taskOptionEdit = document.createElement('button');
                taskOptionEdit.className = "task-options-button";
                let editImage = document.createElement('img');
                editImage.src = 'img/edit.svg';
                taskOptionEdit.appendChild(editImage);

                taskOptions.appendChild(taskOptionShare);
                taskOptions.appendChild(taskOptionInfo);
                taskOptions.appendChild(taskOptionEdit);
                tasksContainer.appendChild(taskOptions);

                taskOptionShare.addEventListener('click', function() {
                    openShareModal(taskDiv);
                });

                taskOptionInfo.addEventListener('click', function() {
                    openInfoModal(taskDiv);
                });

                taskOptionEdit.addEventListener('click', function() {
                    openEditModal(taskDiv);
                });
            }
            else if (e.target != closeButton && existingOptions) {
                existingOptions.remove();
            }
        });

        updateNoTasksMessage();
    }

    function openEditModal(task) {
        let taskTitle = task.querySelector('.task-title').textContent;
        let taskDesc = task.querySelector('.task-desc').textContent;
        let overlay = document.createElement('div');
        overlay.className = 'alert-overlay';
        let editContainer = document.createElement('section');
        editContainer.className = 'edit-container';

        let editTitle = document.createElement('input');
        editTitle.className = 'textBox';
        editTitle.value  = taskTitle;

        let editDesc = document.createElement('input');
        editDesc.className = 'textBox';
        editDesc.value  = taskDesc;
        
        let editOptions = document.createElement('div');
        editOptions.className = 'delete-alert-options'

        let editButtonCancel = document.createElement('button');
        editButtonCancel.className = 'alert-button-no';
        editButtonCancel.textContent = 'Cancel';

        let editButtonSave = document.createElement('button');
        editButtonSave.className = 'alert-button-yes';
        editButtonSave .textContent = 'Save';
        

        editContainer.appendChild(editTitle);
        editContainer.appendChild(editDesc);
        editOptions.appendChild(editButtonSave);
        editOptions.appendChild(editButtonCancel);
        editContainer.appendChild(editOptions);

        overlay.appendChild(editContainer);

        document.body.appendChild(overlay);

        editButtonSave.addEventListener('click', function() {
            task.querySelector('.task-title').textContent = editTitle.value;
            task.querySelector('.task-desc').textContent = editDesc.value;
            overlay.remove();
        });

        editButtonCancel.addEventListener('click', function() {
            overlay.remove();
        });

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
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
