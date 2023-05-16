import React from 'react';

const Modal = ({
    selectedDate,
    task,
    time,
    closeModal,
    handleTaskChange,
    handleTimeChange,
    saveTask,
}) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Agregar tarea</h2>
                <p>Fecha seleccionada: {selectedDate}</p>
                <label>Tarea:</label>
                <input type="text" value={task} onChange={handleTaskChange} />
                <label>Hora:</label>
                <input type="text" value={time} onChange={handleTimeChange} />
                <button onClick={saveTask}>Guardar</button>
                <button onClick={closeModal}>Cancelar</button>
            </div>
        </div>
    );
};

export default Modal;
