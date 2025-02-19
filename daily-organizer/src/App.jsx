import { useState } from 'react';
import HeaderData from './components/HeaderData.jsx';
import TaskList from './components/TaskList';
import Calendar from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './App.css'


const App = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState({});

  //добавляет новую задачу
  const handleAddTask = (day, task) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [day]: [...(prevTasks[day] || []), task]
    }));
  };
  //удаляет задачу по индексу
  const handleDeleteTask = (day, index) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [day]: prevTasks[day].filter((_, i) => i !== index)
    }));
  };
//переключает состояние выполнения задачи по индексу (четбокс)
  const handleToggleTask = (day, index) => {
    setTasks(prevTasks => ({
      ...prevTasks,
      [day]: prevTasks[day].map((task, i) =>
        i === index ? {...task, completed: !task.completed} : task
      )
    }));
  };


//метод проверяет, есть ли задачи для конкретного дня
  const dayHasTasks = (day) => {
    const formattedDay = day.toLocaleDateString();
    return tasks[formattedDay] && tasks[formattedDay].length > 0;
  };

  const formattedDate = date.toLocaleDateString();
  return (
    <main className='container content'>
      <HeaderData date={formattedDate} />
      <Calendar
        selected={date}
        onChange={(date) => setDate(date)}
        inline
        dayClassName={(day) => dayHasTasks(day) ? 'react-datepicker__day--highlight' : ''}  // Добавляем класс для выделения дней с задачами
      />
      <TaskList
        tasks={tasks[formattedDate] || []}
        onAddTask={task => handleAddTask(formattedDate, task)}
        onDeleteTask={index => handleDeleteTask(formattedDate, index)}
        onToggleTask={index => handleToggleTask(formattedDate, index)}
      />
    </main>
  );
};

export default App;


