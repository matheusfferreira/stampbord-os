import { useState } from 'react';
import styles from './Pagination.module.css';

export default function Pagination({ page, setPage, totalPages }) {
    return (
        <div className={styles.pagination}>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                Anterior
            </button>
            <span>Página {page} de {totalPages}</span>
            <button className={styles.button} onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                Próxima
            </button>
        </div>
    )
}