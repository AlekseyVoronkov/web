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
    <section className="tasksSection">
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
  const handleDeleteClick = () => {
    onDelete(id)
  }
  return (
    <div className="task">
      <div className="task-text">
        <h1 className='task-title'>{title}</h1>
        <p className='task-desc'>{description}</p>
      </div>
      <button className="closeButton" onClick={handleDeleteClick}>x</button>
    </div>
  );
}