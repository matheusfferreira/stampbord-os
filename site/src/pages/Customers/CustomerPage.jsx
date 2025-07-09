import { useEffect, useState } from 'react';
import CustomerTable from "./CustomerTable";
import api from '../../services/api';
import styles from './Customer.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Spinner from '../../components/Spinner/Spinner';
import SearchBar from '../../components/SearchBar/SearchBar';

export default function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCustomers() {
            try {
                setLoading(true);
                const res = await api.get('/Customer/paged', {
                    params: {
                        page,
                        pageSize: 3,
                        search: searchTerm,
                    },
                });

                setCustomers(res.data.data);
                setTotalPages(res.data.pagination.totalPages);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCustomers();
    }, [page, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };
    return (
        <main>
            {loading && <Spinner />}
            <div className='page-top'>
                <h1>{t('customer.formTitle')}</h1>
                <button onClick={() => navigate('novo')} type='button' className={`${styles.actionBtn} ${styles.editBtn}`}>{t('common.new')}</button>
            </div>
            <SearchBar onSearch={handleSearch} />
            <CustomerTable customers={customers} totalPages={totalPages} page={page} setPage={setPage} />
        </main>
    );
}