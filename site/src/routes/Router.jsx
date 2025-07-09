import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Layout from './Layout';
import { useTranslation } from 'react-i18next';
import CustomerRoutes from '../pages/Customers/CustomerRoutes';

export default function Router() {
    const { t } = useTranslation();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="clientes/*" element={<CustomerRoutes />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}