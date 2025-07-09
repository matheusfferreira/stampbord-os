import { Routes, Route } from 'react-router-dom';
import CustomerPage from './CustomerPage';
import CustomerForm from './CustomerForm';

export default function CustomerRoutes() {
    return (
        <Routes>
            <Route index element={<CustomerPage />} />
            <Route path="novo" element={<CustomerForm />} />
            <Route path="editar/:id" element={<CustomerForm />} />
        </Routes>
    );
}