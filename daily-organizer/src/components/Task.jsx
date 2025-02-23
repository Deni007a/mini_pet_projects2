import React from 'react';

const Task = ({ task, onDelete, onToggle }) => {
  return (
    <li className="collection-item">
      <label className="task-label">
        <input className="checkbox"
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        <span className={`${task.completed ? 'red-text text-darken-1' : ''}task-text`}>
    {task.text}
</span>
      </label>
      <button className="btn red lighten-1" onClick={onDelete}>Удалить</button>
    </li>
  );
};

export default Task;