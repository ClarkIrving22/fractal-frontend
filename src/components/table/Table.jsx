import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

export default function StickyHeadTable ({
    data, columnheaders, keysToDelete = [], handleEditButton, handleDeleteButton,
}){
    const deleteKeys = (row = {}) => {
        keysToDelete.map((keyToDelete) => {
            delete row[keyToDelete];
        })
        return row
    }

    const renderColumnHeaders = (headers = []) => {
        return (
            <>
                {headers.map((column) => (
                    <TableCell key={column}>
                        {column}
                    </TableCell>
                ))}
            </>
        )
    }

    const handleEditButtonClick = (event, item) => {
        handleEditButton(item);
    };

    const handleDeleteButtonClick = (event, item) => {
        handleDeleteButton(item);
    };

    const renderRow = (rowData = {}) => {
        const keys = Object.keys(rowData)
        return(
            <>
                {keys.map((key) => {
                    return(
                        <TableCell key={`${rowData.id}.${key}`} >{rowData[key]}</TableCell>
                    )
                })}
                <TableCell>
                    <IconButton className="IconButton" onClick={(event) => handleEditButtonClick(event, rowData)}>
                        <EditIcon className="Icon" sx={{color: "#FB8C00"}}/>
                    </IconButton>
                    <IconButton className="IconButton" onClick={(event) => handleDeleteButtonClick(event, rowData)}>
                        <DeleteIcon className="Icon" sx={{color: "#FF5722"}}/>
                    </IconButton>
                </TableCell>                
            </>
        )
    }   
    

    const renderRows = (rowsData) => {
        return(
            <>
                {rowsData.map((rowData) => {
                    deleteKeys(rowData)
                    return(
                        <TableRow key={rowData.id}>
                            {renderRow((rowData))}
                        </TableRow>
                    )
                })}
            </>
        )
    }
    
    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                    {renderColumnHeaders(columnheaders)}
                </TableRow>
            </TableHead>
            <TableBody>
                {renderRows(data)}
            </TableBody>
            </Table>
        </TableContainer>
        </Paper>
    );
}