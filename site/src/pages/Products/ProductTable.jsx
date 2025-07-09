import Pagination from '../../components/Pagination/Pagination';
import styles from './Product.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ProductTable({ products, totalPages, page, setPage }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className={`${styles['table-container']}`}>
            <table className={`${styles['product-table']}`}>
                <thead>
                    <tr>
                        <th>{t('product.description')}</th>
                        <th>{t('product.code')}</th>
                        <th>{t('product.ncmsh')}</th>
                        <th>{t('product.price')}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.description}</td>
                            <td>{product.productCode}</td>
                            <td>{product.ncmSh}</td>
                            <td>{product.unitaryPrice}</td>
                            <td className={styles.actions}>
                                <button className={`${styles.actionBtn} ${styles.editBtn}`}
                                    onClick={() => navigate(`/produtos/editar/${product.id}`)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    )
}