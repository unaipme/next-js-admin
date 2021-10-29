import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    IconButton,
    TableSortLabel,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button
} from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { mutate } from "swr";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import entities from "../../public/schema";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from "@mui/system";

const DeletionDialog = ({ open, entity, id, fallback }) => {
    return (
        <Dialog open={open}>
            <DialogTitle>Deletion confirmation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete {entity} with id {id}?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error"
                        variant="outlined"
                        onClick={() => fallback(false)}>
                        Cancel
                </Button>
                <Button color="success"
                        variant="outlined"
                        onClick={() => fallback(true)}>
                        Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const View = ({ entity, data }) => {
    const [ _data, setData ] = useState(data);
    const [ page, setPage ] = useState(0);
    const [ rowsPerPage, setRowsPerPage ] = useState(5);

    const { fields } = entities[entity];
    const _orderBy = fields.includes("id") ? "id" : fields[0];
    const [ orderBy, setOrderBy ] = useState(_orderBy);
    const [ order, setOrder ] = useState("asc", "desc");

    const [ deletionId, setDeletionId ] = useState(false);

    const router = useRouter();

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

    const handleDialogInteraction = (confirm) => {
        if (confirm) {
            handleDeletion(deletionId);
            const deletedIndex = _data.findIndex(({ id }) => id === deletionId);
            setData([
                ..._data.slice(0, deletedIndex),
                ..._data.slice(deletedIndex + 1)
            ]);
        }
        setDeletionId(undefined);
    }

    const handleDeletion = async (id) => {
        mutate(
            `/api/${entity}/${id}`,
            await fetch(`/api/${entity}/${id}`, {
                method: "DELETE"
            })
        );
    }

    useEffect(() => {
        setData(data);
        setOrder(order);
        setOrderBy(_orderBy);
    }, [data, order, _orderBy]);

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
                        {_data.sort(getComparator(order, orderBy))
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
                                    <IconButton color="primary" onClick={() => setDeletionId(row.id)}>
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
                             count={_data.length} 
                             rowsPerPage={rowsPerPage}
                             page={page}
                             onPageChange={(event, newPage) => setPage(newPage)}
                             onRowsPerPageChange={event => {
                                setRowsPerPage(parseInt(event.target.value));
                                setPage(0);
                             }}/>
            <DeletionDialog open={!!deletionId} entity={entity} id={deletionId} fallback={handleDialogInteraction} />
        </>
    );
};

export default View;