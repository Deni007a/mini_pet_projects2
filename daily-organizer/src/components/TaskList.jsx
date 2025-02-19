import { useState } from 'react';
import Task from "./Task.jsx";

const TaskList = ({ tasks, onAddTask, onDeleteTask, onToggleTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddClick = () => {
    if (newTask.trim() !== '') {
      onAddTask({ text: newTask, completed: false });
      setNewTask('');
    }
  };

  return (
    <div className="entering-tasks">
      <ul>
        {tasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onDelete={() => onDeleteTask(index)}
            onToggle={() => onToggleTask(index)}
          />
        ))}
      </ul>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button className="btn myBtn" onClick={handleAddClick}>Добавить</button>
    </div>
  );
};

export default TaskList;
