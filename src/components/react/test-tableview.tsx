import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Language = {
    iso_639_1: string;
    english_name: string;
    name: string;
};

import data from '../../assets/data/iso639_english.json';

const rows = data as Language[];

export default function BasicTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="languages table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right" width={72}>#</TableCell>
                        <TableCell>ISO 639-1</TableCell>
                        <TableCell>English name</TableCell>
                        <TableCell>Native name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow
                            key={row.iso_639_1 || row.english_name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{idx + 1}</TableCell>
                            <TableCell component="th" scope="row">
                                {row.iso_639_1}
                            </TableCell>
                            <TableCell>{row.english_name}</TableCell>
                            <TableCell>{row.name || '—'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
