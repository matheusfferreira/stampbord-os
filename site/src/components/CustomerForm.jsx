import { useRef } from 'react'
import { useTranslation } from 'react-i18next';

import api from '../services/api'

export default function CustomerForm() {
    const { t } = useTranslation();

    const inputName = useRef()
    const inputTaxCode = useRef()
    const inputEmail = useRef()
    const inputPhone = useRef()

    async function createCustomer() {
        const customerObj = {
            name: inputName.current.value,
            taxCode: inputTaxCode.current.value,
            email: inputEmail.current.value,
            telefone: inputPhone.current.value
        }

        await api.post('/Customer', customerObj)
    }
    return (
        <div className='container'>
            <form>
                <h1>{t('customerForm.title')}</h1>
                <input placeholder={t('customerForm.name')} name='name' type='text' ref={inputName}></input>
                <input placeholder={t('customerForm.taxCode')} name='taxCode' type='text' ref={inputTaxCode}></input>
                <input placeholder={t('customerForm.email')} name='email' type='email' ref={inputEmail}></input>
                <input placeholder={t('customerForm.phone')} name='phone' type='text' ref={inputPhone}></input>

                <button type='button' onClick={createCustomer}>{t('customerForm.saveButton')}</button>
            </form>
        </div>
    )
};