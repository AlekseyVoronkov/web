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

  return(
    <>
    <AddForm onAddTask={handleAddTask}/>
    <AddTasksSection tasks={tasks}/>
    </>
  );
}

export default App;

function AddForm({onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTaskClick = () => {
    onAddTask(title, description);
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

function AddTasksSection({ tasks }) {
  return (
    <section className="tasksSection">
        {tasks.map(task => (
          <Task
            key={task.id}
            title={task.title}
            description={task.description}
          />
        ))}
    </section>
  );
}

function Task({title, description}) {
  return (
    <div className="task">
      <div className="task-text">
        <h1 className='task-title'>{title}</h1>
        <p className='task-desc'>{description}</p>
      </div>
      <button className="closeButton">x</button>
    </div>
  );
}