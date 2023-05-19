import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function createData(dia, situacion, pienso, siento, hago) {
    return { dia, situacion, pienso, siento, hago };
}

const BasicTable = () => {
    const [rows, setRows] = useState(() => {
        const storedRows = localStorage.getItem('tableData');
        if (storedRows) {
            return JSON.parse(storedRows);
        } else {
            return [createData('')];
        }
    });

    useEffect(() => {
        localStorage.setItem('tableData', JSON.stringify(rows));
    }, [rows]);

    const addMore = () => {
        const newData = createData('');
        setRows((prevRows) => [...prevRows, newData]);
    };

    const handleCellChange = (value, field, index) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Día y hora</TableCell>
                        <TableCell>¿Qué situación me pasa?</TableCell>
                        <TableCell>¿Qué pienso?</TableCell>
                        <TableCell>¿Qué siento?</TableCell>
                        <TableCell>¿Qué hago?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <input
                                    type="text"
                                    value={row.dia}
                                    onChange={(e) => handleCellChange(e.target.value, 'dia', index)}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.situacion}
                                    onChange={(e) => handleCellChange(e.target.value, 'situacion', index)}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.pienso}
                                    onChange={(e) => handleCellChange(e.target.value, 'pienso', index)}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.siento}
                                    onChange={(e) => handleCellChange(e.target.value, 'siento', index)}
                                />
                            </TableCell>
                            <TableCell>
                                <input
                                    type="text"
                                    value={row.hago}
                                    onChange={(e) => handleCellChange(e.target.value, 'hago', index)}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button onClick={addMore}>Añadir más</Button>
        </TableContainer>
    );
};

export default BasicTable;
