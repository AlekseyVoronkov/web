import React, { useState, useEffect } from 'react';
import { useTaskStore } from './store/taskStorage';

function App() {
  const { tasks, addTask, deleteTask, editTask, togglePin, reorderTasks } = useTaskStore();

  console.log(tasks)

  return(
    <>
    <AddForm onAddTask={addTask}/>
    <AddTasksSection 
    tasks={tasks} 
    onDeleteTask={deleteTask}
    onEditTask={editTask}
    onTogglePin={togglePin}
    onReorderTasks={reorderTasks}
    />
    </>
  );
}

export default App;

function AddForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTaskClick = () => {
    onAddTask(
      title.trim() || "New task",
      description.trim() || "No Description");
    setTitle("");
    setDescription("");
  };

  return (
    <div className="form">
      <div className="inputs">
        <input
          className="textBox" 
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="textBox" 
          placeholder="About..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button className="addButton" onClick={handleAddTaskClick}>+</button>
    </div>
  );
}

function AddTasksSection({ tasks, onDeleteTask, onEditTask, onTogglePin, onReorderTasks }) {
  const pinnedTasks = tasks.filter(task => task.isPinned);
  const normalTasks = tasks.filter(task => !task.isPinned);

  return (
    <section className="tasks">
      {pinnedTasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onTogglePin={onTogglePin}
          isPinned={true}
          isDraggable={false}
          onReorder={onReorderTasks}
        />
      ))}
      
      {normalTasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          onDelete={onDeleteTask}
          onEdit={onEditTask}
          onTogglePin={onTogglePin}
          isPinned={false}
          isDraggable={true}
          onReorder={onReorderTasks}
        />
      ))}
      
      {tasks.length === 0 && <NoTasksSection/>}
    </section>
  );
}
  
function NoTasksSection() {
  return (
    <div className="no-tasks">
      <h1 className="no-tasks-text">No tasks yet</h1>
    </div>
  );
}

function Task({ id, title, description, onDelete, onEdit, onTogglePin, isPinned, isDraggable, onReorder }) {
  const [showOptions, setShowOptions] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragStart = (e) => {
    if (!isDraggable || isPinned) return;
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', id.toString());
  };

  const handleDragOver = (e) => {
    if (!isDraggable || isPinned) return;
    e.preventDefault();
  };

  const handleDrop = (e) => {
    if (!isDraggable || isPinned) return;
    e.preventDefault();
    const draggedId = parseInt(e.dataTransfer.getData('text/plain'));
    if (draggedId !== id) {
      onReorder(draggedId, id);
    }
    setIsDragging(false);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <>
    <div 
      className={`task ${isDragging ? 'dragging' : ''} ${isPinned ? 'pinned' : ''}`}
      draggable={isDraggable && !isPinned}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
      onClick={() => setShowOptions(!showOptions)}
    >
        <div className="task-text">
          <h1 className='task-title'>{title}</h1>
          <p className='task-desc'>{description}</p>
        </div>
        <button className="closeButton" onClick={(e) => { e.stopPropagation(); onDelete(id); }}>x</button>
      </div>
      {showOptions && <TaskOptions 
          taskId={id}
          taskTitle={title}
          taskDesc={description}
          onEdit={onEdit}
          onTogglePin={onTogglePin}
        />}
      </>
  );
}

function TaskOptions({ taskId, taskTitle, taskDesc, onEdit, onTogglePin}) {
  const [showShare, setShowShare] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleShareClick = () => {
    setShowShare(true);
  }

  const handleCloseShare = () => {
    setShowShare(false);
  }

  const handleInfoClick = () => {
    setShowInfo(true);
  }

  const handleCloseInfo = () => {
    setShowInfo(false);
  }

  const handleEditClick = () => {
    setShowEdit(true);
  }

  const handleCloseEdit = () => {
    setShowEdit(false);
  }

  const handlePinClick = () => {
    onTogglePin(taskId)
  }
  return (
    <>
      <div className='task-options'>
        <button className='task-options-button' onClick={handleShareClick}>
          <img src="src\assets\share.svg" alt="share"/>
        </button>
        <button className='task-options-button' onClick={handleInfoClick}>
          <img src="src\assets\info.svg" alt="info"/>
        </button>
        <button className='task-options-button' onClick={handleEditClick}>
          <img src="src\assets\edit.svg" alt="edit"/>
        </button>
        <button className='task-options-button' onClick={handlePinClick}>
          <img src="src\assets\pin.svg" alt="pin"/>
        </button>
      </div>

      {showInfo && (
        <TaskOptionsInfo
          taskTitle={taskTitle}
          taskDesc={taskDesc}
          onClose={handleCloseInfo}
        />
      )}

      {showEdit && (
        <TaskOptionsEdit
          taskId={taskId}
          taskTitle={taskTitle}
          taskDesc={taskDesc}
          onClose={handleCloseEdit}
          onEdit={onEdit}
        />
      )}

      {showShare && (
        <TaskOptionsShare
          onClose={handleCloseShare}
        />
      )}
    </>
  );
}

function TaskOptionsShare({ onClose }) {
  const urlToShare = window.location.href;
  const textToShare = "Damn boy, what a cool task manager!";

  const handleShareCopyClick = () => {
    navigator.clipboard.writeText(urlToShare).then(function() {
      alert('Link copied to clipboard');
    });
  }

  const handleShareVKClick = () => {
    const vkShareLink = `https://vk.com/share.php?url=${encodeURIComponent(urlToShare)}&title=${encodeURIComponent(textToShare)}`;
    window.open(vkShareLink, '_blank');
  }

  const handleShareTGClick = () => {
    const telegramShareLink = `https://telegram.me/share/url?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(textToShare)}`;
    window.open(telegramShareLink, '_blank');
  };

  const handleShareWAClick = () => {
    const waShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(textToShare + ' ' + urlToShare)}`;
    window.open(waShareLink, '_blank');
  };

  const handleShareFBClick = () => {
    const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    window.open(fbShareLink, '_blank');
  };

  return (
    <div className='alert-overlay' onClick={onClose}>
      <section className='share-container'>
        <button className='share-button' onClick={handleShareCopyClick}>
          <img src="src\assets\shareCopy.svg" alt="Copy"/>
        </button>
        <button className='share-button' onClick={handleShareVKClick}>
          <img src="src\assets\shareVK.svg" alt="VK"/>
        </button>
        <button className='share-button' onClick={handleShareTGClick}>
          <img src="src\assets\shareTG.svg" alt="TG"/>
        </button>
        <button className='share-button' onClick={handleShareWAClick}>
          <img src="src\assets\shareWA.svg" alt="WA"/>
        </button>
        <button className='share-button' onClick={handleShareFBClick}>
          <img src="src\assets\shareFB.svg" alt="FB"/>
        </button>
      </section>
    </div>
  )
}

function TaskOptionsInfo({ taskTitle, taskDesc, onClose }) {
  return (
    <div className='alert-overlay' onClick={onClose}>
      <div className='delete-alert'>
        <h1 className='task-title'>{taskTitle}</h1>
        <p className='task-desc'>{taskDesc}</p>
      </div>
    </div>
  );
}

function TaskOptionsEdit({ taskId, taskTitle, taskDesc, onClose, onEdit}) {
  const [editTitle, setEditTitle] = useState(taskTitle);
  const [editDesc, setEditDesc] = useState(taskDesc);

  const handleSave = () => {
    onEdit(taskId, editTitle, editDesc)
    onClose();
  };

  return (
    <div className='alert-overlay'>
      <section className='edit-container'>
        <input 
          className='textBox'
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <input 
          className='textBox' 
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
        />
        <div className='delete-alert-options'>
          <button className='alert-button-no' onClick={onClose}>Cancel</button>
          <button className='alert-button-yes' onClick={handleSave}>Save</button>
        </div>
      </section>
    </div>
  )
}