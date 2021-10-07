import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

import EditIcon from '@mui/icons-material/Edit';

const DataTable = ({ entity, fields, data }) => {
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    const router = useRouter();

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <colgroup>
                        {fields.map((_, index) => (
                            <col key={index} style={{}} />
                        ))}
                        <col style={{ width: "5%" }} />
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            {fields.map((name, index) => (
                                <TableCell key={index} align={index === 0 ? "left" : "right"}>{name}</TableCell>
                            ))}
                            <TableCell>Edit</TableCell>
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
                                <TableCell>
                                    <IconButton color="primary" onClick={() => router.push(`/${entity}/edit/${row.id}`)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
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