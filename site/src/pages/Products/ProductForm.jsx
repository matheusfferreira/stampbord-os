import { useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './Product.module.css';
import { useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';

import api from '../../services/api'

export default function ProductForm() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const inputDescription = useRef();
    const inputCode = useRef();
    const inputNcmsh = useRef();
    const inputPrice = useRef();

    useEffect(() => {
        if (id) {
            async function fetchProduct() {
                const res = await api.get(`/Product/${id}`);
                const data = res.data;

                inputDescription.current.value = data.description;
                inputCode.current.value = data.productCode;
                inputNcmsh.current.value = data.ncmSh;
                inputPrice.current.value = data.unitaryPrice;
            }

            fetchProduct();
        }
    }, [id]);

    async function handleSubmit() {
        setLoading(true);
        const productObj = {
            description: inputDescription.current.value,
            productCode: inputCode.current.value,
            ncmSh: inputNcmsh.current.value,
            unitaryPrice: inputPrice.current.value
        };

        if (id) {
            await api.put(`/Product/${id}`, productObj);
        } else {
            await api.post('/Product', productObj);
        }

        setLoading(false);
        navigate('/produtos');
    };

    return (
        <main className={`${styles['product-form']}`}>
            {loading && <Spinner />}
            <form>
                <h1>{t('product.formTitle')}</h1>
                <div className='form-group'>
                    <label htmlFor="description">{t('product.description')}</label>
                    <input name='description' type='text' ref={inputDescription}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor="code">{t('product.code')}</label>
                    <input name='code' type='text' ref={inputCode}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor="ncmsh">{t('product.ncmsh')}</label>
                    <input name='ncmsh' type='text' ref={inputNcmsh}></input>
                </div>
                <div className='form-group'>
                    <label htmlFor="price">{t('product.price')}</label>
                    <input name='price' type="number" step="0.01" min="0" ref={inputPrice}></input>
                </div>

                <button type='button' onClick={handleSubmit}>{t('common.saveButton')}</button>
            </form>
        </main>
    )
};