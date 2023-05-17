import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import '../../assets/styles.css';

const Calendario = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasksByDay, setTasksByDay] = useState({});

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedDay(null);
    setTask('');
    setTime('');
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSave = () => {
    if (!task.trim() || !time.trim()) {
      alert('Please enter a task and time.');
      return;
    }

    const formattedDate = format(selectedDay, 'dd/MM/yyyy');
    const existingTasks = tasksByDay[formattedDate] || [];

    const updatedTasks = [...existingTasks, { task, time, completed: false }];
    const updatedTasksByDay = {
      ...tasksByDay,
      [formattedDate]: updatedTasks
    };
    setTasksByDay(updatedTasksByDay);

    handleModalClose();
  };

  const handleEditTask = (day, index) => {
    const formattedDate = format(day, 'dd/MM/yyyy');
    const tasks = tasksByDay[formattedDate];

    if (tasks) {
      const taskObj = tasks[index];
      setSelectedDay(day);
      setTask(taskObj.task);
      setTime(taskObj.time);
      setModalOpen(true);
    }
  };

  const handleDeleteTask = (day, index) => {
    const formattedDate = format(day, 'dd/MM/yyyy');
    const tasks = tasksByDay[formattedDate];

    if (tasks) {
      const updatedTasks = tasks.filter((taskObj, taskIndex) => taskIndex !== index);
      const updatedTasksByDay = {
        ...tasksByDay,
        [formattedDate]: updatedTasks.length > 0 ? updatedTasks : null
      };
      setTasksByDay(updatedTasksByDay);
    }
  };

  const handleCompleteTask = (day, index) => {
    const formattedDate = format(day, 'dd/MM/yyyy');
    const tasks = tasksByDay[formattedDate];

    if (tasks) {
      const updatedTasks = tasks.map((taskObj, taskIndex) => {
        if (taskIndex === index) {
          return {
            ...taskObj,
            completed: !taskObj.completed
          };
        }
        return taskObj;
      });

      const updatedTasksByDay = {
        ...tasksByDay,
        [formattedDate]: updatedTasks.filter((taskObj) => !taskObj.completed)
      };
      setTasksByDay(updatedTasksByDay);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  return (
    <div>
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>{format(currentDate, 'MMMM yyyy')}</h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day) => (
            <div key={day} onClick={() => handleDayClick(day)}>
              <div className="day-number">{format(day, 'dd')}</div>
              <div className="day-text">
                {format(day, 'EEEE')}
               
              </div>
              {tasksByDay[format(day, 'dd/MM/yyyy')] &&
                tasksByDay[format(day, 'dd/MM/yyyy')].map((task, index) => (
                  <div
                    key={`${format(day, 'dd/MM/yyyy')}-${index}`}
                    className={`task ${task.completed ? 'completed' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompleteTask(day, index);
                    }}
                  >
                    {task.task}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>{format(selectedDay, 'EEEE, dd MMMM yyyy')}</h2>
            <input type="text" value={task} onChange={handleTaskChange} placeholder="Task" />
            <input type="time" value={time} onChange={handleTimeChange} placeholder="Time" />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
      <div className="task-table">
        <h3>Tasks</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(tasksByDay).map(([date, tasks]) =>
              tasks &&
              tasks.map((task, index) => (
                <tr key={`${date}-${index}`}>
                  <td>{format(new Date(date), 'EEEE, dd MMMM yyyy')}</td>
                  <td>{task.task}</td>
                  <td>{task.time}</td>
                  <td>
                    <button onClick={() => handleEditTask(new Date(date), index)}>Edit</button>
                    <button onClick={() => handleCompleteTask(new Date(date), index)}>
                      {task.completed ? 'Completed' : 'Check'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendario;
