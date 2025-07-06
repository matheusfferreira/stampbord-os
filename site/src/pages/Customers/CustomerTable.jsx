import Pagination from '../../components/Pagination/Pagination';
import styles from './Customer.module.css';
import { useTranslation } from 'react-i18next';

export default function CustomerTable({ customers, totalPages, page, setPage }) {
    const { t } = useTranslation();

    return (
        <div className={`${styles['table-container']}`}>
            <table className={`${styles['customer-table']}`}>
                <thead>
                    <tr>
                        <th>{t('customer.name')}</th>
                        <th>{t('customer.email')}</th>
                        <th>{t('customer.phone')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>{customer.telefone}</td>
                            <td className={styles.actions}>
                                <button className={`${styles.actionBtn} ${styles.editBtn}`}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    )
}