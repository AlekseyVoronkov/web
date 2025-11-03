import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (title, description) => {
    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return(
    <>
    <AddForm onAddTask={handleAddTask}/>
    <AddTasksSection tasks={tasks} onDeleteTask={handleDeleteTask}/>
    </>
  );
}

export default App;

function AddForm({onAddTask }) {
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

function AddTasksSection({ tasks, onDeleteTask }) {
  return (
    <section className="tasks">
        {tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            onDelete={onDeleteTask}
          />
        ))}
    </section>
  );
}

function Task({ id, title, description, onDelete }) {
  const [showOptions, setShowOptions] = useState(false);

  const handleDeleteClick = () => {
    onDelete(id);
  }

  const handleTaskClick = () => {
    setShowOptions(!showOptions);
  }
  return (
    <>
      <div className="task" onClick={handleTaskClick}>
        <div className="task-text">
          <h1 className='task-title'>{title}</h1>
          <p className='task-desc'>{description}</p>
        </div>
        <button className="closeButton" onClick={handleDeleteClick}>x</button>
      </div>
      {showOptions && <TaskOptions taskTitle={title} taskDesc={description}/>}
    </>
  );
}

function TaskOptions({ taskTitle, taskDesc }) {
  const [showInfo, setShowInfo] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

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
  return (
    <>
      <div className='task-options'>
        <button className='task-options-button'>
          <img src="src\assets\share.svg" alt="share"/>
        </button>
        <button className='task-options-button' onClick={handleInfoClick}>
          <img src="src\assets\info.svg" alt="info"/>
        </button>
        <button className='task-options-button' onClick={handleEditClick}>
          <img src="src\assets\edit.svg" alt="edit"/>
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
          taskTitle={taskTitle}
          taskDesc={taskDesc}
          onClose={handleCloseEdit}
        />
      )}
    </>
  );
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

function TaskOptionsEdit({ taskTitle, taskDesc, onClose }) {
  const [editTitle, setEditTitle] = useState(taskTitle);
  const [editDesc, setEditDesc] = useState(taskDesc);
  const handleSave = () => {
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