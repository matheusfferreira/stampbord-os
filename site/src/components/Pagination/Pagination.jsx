import { useTranslation } from 'react-i18next';
import styles from './Pagination.module.css';

export default function Pagination({ page, setPage, totalPages }) {
    const { t } = useTranslation();

    return (
        <div className={styles.pagination}>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
                {t('common.previous')}
            </button>
            <span>{t('common.page')} {page} {t('common.of')} {totalPages}</span>
            <button className={styles.button} onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
                {t('common.next')}
            </button>
        </div>
    )
}