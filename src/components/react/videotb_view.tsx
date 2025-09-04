import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import rawData from '../../assets/data/videotb_view.json';
import { assertVideoTable, type VideoRow } from '../../assets/data/videotb_view.schema';

// Helpers de formatação
function formatDuration(seconds?: number): string {
    if (seconds == null || Number.isNaN(seconds)) return '—';
    const s = Math.floor(seconds % 60).toString().padStart(2, '0');
    const m = Math.floor((seconds / 60) % 60).toString().padStart(2, '0');
    const h = Math.floor(seconds / 3600);
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`;
}

function formatDate(iso?: string): string {
    if (!iso) return '—';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '—' : d.toISOString().slice(0, 10);
}

function formatNumber(n?: number): string {
    return typeof n === 'number' ? n.toLocaleString() : '—';
}

// Validação e tipagem segura do JSON
const rows: VideoRow[] = (() => {
    try {
        const data = rawData as unknown;
        assertVideoTable(data);
        return data;
    } catch (e) {
        console.error('videotb_view.json inválido:', e);
        return [];
    }
})();

export default function VideoTableView() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="videos table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right" width={64}>#</TableCell>
                        <TableCell>Título</TableCell>
                        <TableCell>Canal</TableCell>
                        <TableCell>Publicado</TableCell>
                        <TableCell align="right">Duração</TableCell>
                        <TableCell align="right">Views</TableCell>
                        <TableCell align="right">Likes</TableCell>
                        <TableCell>Tags</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, idx) => (
                        <TableRow
                            key={row.id || `${row.title}-${idx}`}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{idx + 1}</TableCell>
                            <TableCell component="th" scope="row">
                                <Link href={row.url} target="_blank" rel="noopener noreferrer" underline="hover">
                                    {row.title}
                                </Link>
                            </TableCell>
                            <TableCell>{row.channel ?? '—'}</TableCell>
                            <TableCell>{formatDate(row.publishedAt)}</TableCell>
                            <TableCell align="right">{formatDuration(row.durationSeconds)}</TableCell>
                            <TableCell align="right">{formatNumber(row.views)}</TableCell>
                            <TableCell align="right">{formatNumber(row.likes)}</TableCell>
                            <TableCell>{Array.isArray(row.tags) && row.tags.length ? row.tags.join(', ') : '—'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}