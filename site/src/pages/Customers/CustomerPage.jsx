import { useEffect, useState } from 'react';
import CustomerTable from "./CustomerTable";
import api from '../../services/api';
import styles from './Customer.module.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CustomerPage() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation()

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await api.get('/Customer');
                setCustomers(response.data);
            } catch (error) {
                console.error('Erro ao buscar clientes:', error);
            } finally {
                setLoading(false)
            }
        }

        fetchCustomers();
    }, []);
    return (
        <>
            {loading ? (
                <div className='spinner'></div>
            ) : (
                <>
                    <button onClick={() => navigate('novo')} type='button' className={`${styles.actionBtn} ${styles.editBtn}`}>{t('customer.formTitle')}</button>
                    <CustomerTable customers={customers} />
                </>
            )}
        </>
    )
}