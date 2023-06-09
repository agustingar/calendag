import React, { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from 'date-fns';
import '../../assets/styles.css';

const Calendario = () => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');
  const [selectedTableDay, setSelectedTableDay] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasksByDay, setTasksByDay] = useState(() => {
    const storedRows = localStorage.getItem('tasksData');
    if (storedRows) {
      return JSON.parse(storedRows);
    } else {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('tasksData', JSON.stringify(tasksByDay));
  }, [tasksByDay]);

  const handleCellChange = (value, field, formattedDate, index) => {
    if (!tasksByDay[formattedDate] || index >= tasksByDay[formattedDate].length) {
      return;
    }

    const updatedTasksByDay = {
      ...tasksByDay,
      [formattedDate]: tasksByDay[formattedDate].map((taskObj, taskIndex) => {
        if (taskIndex === index) {
          return {
            ...taskObj,
            [field]: value
          };
        }
        return taskObj;
      })
    };

    setTasksByDay(updatedTasksByDay);
  };
  

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setSelectedTableDay(day);
    setTask('');
    setTime('');
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
    const value = e.target.value;
  
    // Verificar si el valor es una cadena vacía
    if (value === '') {
      setTime(value);
      return;
    }
  
    // Obtener la hora y minutos del valor
    const [hours, minutes] = value.split(':');
  
    // Crear un objeto Date con la fecha actual y la hora especificada
    const currentTime = new Date();
    currentTime.setHours(hours);
    currentTime.setMinutes(minutes);
  
    // Verificar si el objeto Date resultante es válido
    if (isNaN(currentTime.getTime())) {
      // El valor del campo de tiempo no es válido
      alert('Please enter a valid time.');
      return;
    }
  
    setTime(value);
  };
  
  const handleSave = () => {
    if (!task.trim() || !time.trim()) {
      alert('Please enter a task and time.');
      return;
    }

    const formattedDate = format(selectedDay, 'MM dd yyyy');
    const existingTasks = tasksByDay[formattedDate] || [];

    const updatedTasks = [
      ...existingTasks,
      { task, time, completed: false }
    ];

    const updatedTasksByDay = {
      ...tasksByDay,
      [formattedDate]: updatedTasks
    };

    setTasksByDay(updatedTasksByDay);
    handleModalClose();
  };

  const handleEditTask = (day, index) => {
    const formattedDate = format(day, 'MM dd yyyy');
    const tasks = tasksByDay[formattedDate];

    if (tasks) {
      const taskObj = tasks[index];
      setSelectedDay(day);
      setTask(taskObj.task);
      setTime(taskObj.time);
      setModalOpen(true);
    }
  };

  const handleCompleteTask = (day, index) => {
    const formattedDate = format(day, 'MM dd yyyy');
    const tasks = tasksByDay[formattedDate];

    if (tasks) {
      const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);

      const updatedTasksByDay = {
        ...tasksByDay,
        [formattedDate]: updatedTasks
      };

      setTasksByDay((prevState) => ({
        ...prevState,
        ...updatedTasksByDay
      }));
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
          <button className="nextPrev" onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day) => {
            const formattedDate = format(day, 'MM dd yyyy');
            const dayTasks = tasksByDay[formattedDate];
            return (
              <div key={day} onClick={() => handleDayClick(day)}>
                <div className="day-number">{format(day, 'dd')}</div>
                <div className="day-text">{format(day, 'EEEE')}</div>
                {dayTasks && dayTasks.map((task, index) => (
                  <div
                    key={`${formattedDate}-${index}`}
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
            );
          })}
        </div>
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>
              &times;
            </span>
            <h2>{format(selectedDay, 'EEEE,  MMMM dd yyyy')}</h2>
            <input type="text" value={task} onChange={handleTaskChange} placeholder="Task" />
            <input type="time" value={time} onChange={handleTimeChange} placeholder="Time" />
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
      <div className="task-table">
        <h3>Tasks</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Día</th>
                <th>Tarea</th>
                <th>Hora</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
           {Object.entries(tasksByDay).map(([date, tasks]) =>
  tasks &&
  tasks.map((task, index) => (
    <tr key={`${date}-${index}`} className={selectedTableDay === new Date(date) ? 'selected' : ''}>
      <td>{format(new Date(date), 'EEEE, dd MMMM yyyy')}</td>
                    <td>
                      <input
                        type="text"
                        value={task.task}
                        onChange={(e) => handleCellChange(e.target.value, 'task', date, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="time"
                        value={task.time}
                        onChange={(e) => handleCellChange(e.target.value, 'time', date, index)}
                      />
                    </td>
                    <td>
                      <button className="edit-button" onClick={() => handleEditTask(new Date(date), index)}>
                        Edit
                      </button>
                      <input
                        type="checkbox"
                        defaultChecked={task.completed}
                        onChange={() => handleCompleteTask(new Date(date), index)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
