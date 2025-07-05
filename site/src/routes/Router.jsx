import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import CustomerForm from '../pages/Customers/CustomerForm';
import Layout from './Layout';
import { useTranslation } from 'react-i18next';
import CustomerPage from '../pages/Customers/CustomerPage';

export default function Router() {
    const { t } = useTranslation();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/clientes/" element={<Layout />}>
                    <Route index element={<CustomerPage />} />
                    <Route path="novo" element={<CustomerForm />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}