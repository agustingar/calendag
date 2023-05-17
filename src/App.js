import React from 'react';
import ResponsiveAppBar from './components/Header/header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BasicTable from './components/Tabla/tabla';
import Doc from './components/Doc/doc';
import Calendario from './components/Calendario/calendario';



export default  function App ()  {
  return (
   <Router>
    <ResponsiveAppBar />
            <Routes>
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/tabla" element={<BasicTable />} />
                <Route path="/doc" element={<Doc />} />
            </Routes>
        </Router>
  );
};
