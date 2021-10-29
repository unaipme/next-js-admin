import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, IconButton, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { mutate } from "swr";
import { useState } from "react";

import entities from "../../public/schema";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";

const View = ({ entity, data }) => {
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    const { fields } = entities[entity];
    const [ orderBy, setOrderBy ] = useState(fields.includes("id") ? "id" : fields[0]);
    const [ order, setOrder ] = useState("asc", "desc");

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    }

    const descendingComparator = (a, b) => {
        if (b[orderBy] < a[orderBy]) {
          return -1;
        }
        if (b[orderBy] > a[orderBy]) {
          return 1;
        }
        return 0;
    }

    const getComparator = () => 
        order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

    const handleDeletion = async (id) => {
        mutate(
            `/api/${entity}/${id}`,
            await fetch(`/api/${entity}/${id}`, {
                method: "DELETE"
            })
        );
    }

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
                                <TableCell key={index}
                                           sortDirection={orderBy === name ? order : false}
                                           align={index === 0 ? "left" : "right"}>
                                                <TableSortLabel active={orderBy === name}
                                                                direction={orderBy === name ? order : "asc"}
                                                                onClick={() => handleRequestSort(name)}
                                                                style={{ color: "white" }}>
                                                    {name}
                                                    {orderBy === name &&
                                                        <Box component="span" sx={ visuallyHidden }>
                                                            {order === "desc" ? "sorted descending" : "sorted ascending"}
                                                        </Box>
                                                    }
                                                </TableSortLabel>
                                </TableCell>
                            ))}
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.sort(getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleDeletion(row.id)}>
                                        <DeleteIcon />
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

export default View;