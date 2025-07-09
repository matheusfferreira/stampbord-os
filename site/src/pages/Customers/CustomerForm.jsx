import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Customer.module.css';
import { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';

import api from '../../services/api'

export default function CustomerForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const inputName = useRef();
    const inputTaxCode = useRef();
    const inputEmail = useRef();
    const inputPhone = useRef();

    useEffect(() => {
        if (id) {
            async function fetchCustomer() {
                const res = await api.get(`/Customer/${id}`);
                const data = res.data;

                inputName.current.value = data.name;
                inputTaxCode.current.value = data.taxCode;
                inputEmail.current.value = data.email;
                inputPhone.current.value = data.telefone;
            }

            fetchCustomer();
        }
    }, [id]);

    async function handleSubmit() {
        setLoading(true);
        const customerObj = {
            name: inputName.current.value,
            taxCode: inputTaxCode.current.value,
            email: inputEmail.current.value,
            telefone: inputPhone.current.value
        };

        if (id) {
            await api.put(`/Customer/${id}`, customerObj);
        } else {
            await api.post('/Customer', customerObj);
        }

        setLoading(false);
        navigate('/clientes');
    };

    return (
        <main className={`${styles['customer-form']}`}>
            {loading && <Spinner />}
            <form>
                <h1>{t('customer.formTitle')}</h1>
                <input placeholder={t('customer.name')} name='name' type='text' ref={inputName}></input>
                <input placeholder={t('customer.taxCode')} name='taxCode' type='text' ref={inputTaxCode}></input>
                <input placeholder={t('customer.email')} name='email' type='email' ref={inputEmail}></input>
                <input placeholder={t('customer.phone')} name='phone' type='text' ref={inputPhone}></input>

                <button type='button' onClick={handleSubmit}>{t('customer.saveButton')}</button>
            </form>
        </main>
    )
};