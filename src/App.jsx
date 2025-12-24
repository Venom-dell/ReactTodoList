import { useState } from "react";
import { useEffect } from "react";
import "./App.css";

const TaskItem = (props) => {
  return (
    <li>
      <span
        onClick={props.onComplete}
        style={{
          textDecoration: props.completed ? "line-through" : "none",
          color: props.completed ? "grey" : "black",
        }}
      >
        {props.task}
      </span>
      <button className="delete-btn" onClick={props.onDelete}>
        X
      </button>
    </li>
  );
};

function App() {
  const [taskName, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("tasks")) || [
        { taskName: "", completed: false },
      ]
    );
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskName) => {
    if (taskName.trim() !== "") {
      setTasks([...tasks, { taskName, completed: false }]);
      setTask("");
    } else if (tasks.includes(taskName)) {
      setTask("");
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <nav>
        <h1>TODO LIST</h1>
        <input
          type="text"
          id="task-input"
          onChange={(e) => setTask(e.target.value)}
          value={taskName}
          autoComplete="off"
        />
        <button id="add-btn" onClick={() => addTask(taskName)}>
          ADD
        </button>
      </nav>
      <h1>GET THINGS DONE TODAY!</h1>
      <ul id="task-list" style={{alignItems: "center"}}>
        {tasks.map((task, index) => {
          return (
            <TaskItem
              key={index}
              task={task.taskName}
              completed={task.completed}
              onDelete={() => deleteTask(index)}
              onComplete={() => toggleTaskCompletion(index)}
            />
          );
        })}
      </ul>
    </>
  );
}

export default App;
