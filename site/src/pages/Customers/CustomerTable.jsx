import Pagination from '../../components/Pagination/Pagination';
import styles from './Customer.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function CustomerTable({ customers, totalPages, page, setPage }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

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
                                <button className={`${styles.actionBtn} ${styles.editBtn}`}
                                    onClick={() => navigate(`/clientes/editar/${customer.id}`)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    )
}