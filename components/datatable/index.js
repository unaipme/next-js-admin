import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { useState } from "react";

const DataTable = ({ fields, data }) => {
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {fields.map((name, index) => (
                                <TableCell key={index} align={index === 0 ? "left" : "right"}>{name}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row => (
                            <TableRow key={row.id}>
                                {fields.map((name, index) => (
                                    <TableCell key={index} align={index === 0 ? "left" : "right"}>
                                        {row[name]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination rowsPerPageOptions={[5, 10, 25]}
                             component="div"
                             count={data.length} 
                             rowsPerPage={rowsPerPage}
                             page={page}
                             onPageChange={(event, newPage) => setPage(newPage)}
                             onRowsPerPageChange={event => {
                                setRowsPerPage(parseInt(event.target.value));
                                setPage(0);
                             }}/>
        </>
    );
};

export default DataTable;