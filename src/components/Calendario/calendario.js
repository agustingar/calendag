import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from './Modal';

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [task, setTask] = useState('');
  const [time, setTime] = useState('');

  const openModal = (date) => {
    setSelectedDate(date);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
    setTask('');
    setTime('');
  };

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const saveTask = () => {
    console.log(`Fecha: ${selectedDate}, Tarea: ${task}, Hora: ${time}`);
    closeModal();
  };

  return (
    <div>
      <Calendar onClickDay={openModal} />

      {modalOpen && (
        <Modal
          selectedDate={selectedDate ? selectedDate.toString() : ''}
          task={task}
          time={time}
          closeModal={closeModal}
          handleTaskChange={handleTaskChange}
          handleTimeChange={handleTimeChange}
          saveTask={saveTask}
        />
      )}
    </div>
  );
};

export default Calendario;
