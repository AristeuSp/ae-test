import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// ... existing code ...
import TableSortLabel from '@mui/material/TableSortLabel';
import TablePagination from '@mui/material/TablePagination';

type Language = {
    iso_639_1: string;
    english_name: string;
    name: string;
};

import data from '../../assets/data/iso639_english.json';

const rows = data as Language[];

// ---- utilitários de ordenação ----
type Order = 'asc' | 'desc';
type OrderBy = 'index' | 'iso_639_1' | 'english_name' | 'name';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const vA = (a as any)[orderBy];
    const vB = (b as any)[orderBy];
    if (vB < vA) return -1;
    if (vB > vA) return 1;
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilized = array.map((el, index) => [el, index] as const);
    stabilized.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
}
// ---- fim utilitários de ordenação ----

// ... existing code ...

export default function BasicTable() {
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<OrderBy>('iso_639_1');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (property: OrderBy) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
        setPage(0); // volta pra primeira página quando muda a ordenação
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Para permitir ordenação por "index" (número da linha), criamos uma cópia com índice original
    const rowsWithIndex = React.useMemo(
        () =>
            rows.map((r, idx) => ({
                ...r,
                index: idx + 1, // 1-based
            })),
        []
    );

    const sortedRows = React.useMemo(() => {
        return stableSort(rowsWithIndex, getComparator(order, orderBy));
    }, [rowsWithIndex, order, orderBy]);

    const paginatedRows = React.useMemo(() => {
        const start = page * rowsPerPage;
        return sortedRows.slice(start, start + rowsPerPage);
    }, [sortedRows, page, rowsPerPage]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="languages table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right" width={72}>
                            <TableSortLabel
                                active={orderBy === 'index'}
                                direction={orderBy === 'index' ? order : 'asc'}
                                onClick={() => handleRequestSort('index')}
                            >
                                #
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'iso_639_1' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'iso_639_1'}
                                direction={orderBy === 'iso_639_1' ? order : 'asc'}
                                onClick={() => handleRequestSort('iso_639_1')}
                            >
                                ISO 639-1
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'english_name' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'english_name'}
                                direction={orderBy === 'english_name' ? order : 'asc'}
                                onClick={() => handleRequestSort('english_name')}
                            >
                                English name
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sortDirection={orderBy === 'name' ? order : false}>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={() => handleRequestSort('name')}
                            >
                                Native name
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedRows.map((row, idxInPage) => (
                        <TableRow
                            key={`${row.iso_639_1 || row.english_name}-${page}-${idxInPage}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{row.index}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.iso_639_1}
                            </TableCell>
                            <TableCell>{row.english_name}</TableCell>
                            <TableCell>{row.name || '—'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <TablePagination
                component="div"
                count={rows.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                labelRowsPerPage="Linhas por página:"
            />
        </TableContainer>
    );
}