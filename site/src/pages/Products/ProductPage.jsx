import { useEffect, useState } from 'react';
import ProductTable from "./ProductTable";
import api from '../../services/api';
import styles from './Product.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Spinner from '../../components/Spinner/Spinner';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const res = await api.get('/Product/paged', {
                    params: {
                        page,
                        pageSize: 3,
                        search: searchTerm,
                    },
                });

                setProducts(res.data.data);
                setTotalPages(res.data.pagination.totalPages);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [page, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    return (
        <main>
            {loading && <Spinner />}
            <div className='page-top'>
                <h1>{t('product.title')}</h1>
                <button onClick={() => navigate('novo')} type='button' className={`${styles.actionBtn} ${styles.editBtn}`}>{t('common.new')}</button>
            </div>
            <SearchBar onSearch={handleSearch} />
            <ProductTable products={products} totalPages={totalPages} page={page} setPage={setPage} />
        </main>
    );
}