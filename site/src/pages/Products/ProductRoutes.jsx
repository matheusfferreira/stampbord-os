import { Routes, Route } from 'react-router-dom';
import ProductPage from './ProductPage';
import ProductForm from './ProductForm';

export default function ProductRoutes() {
    return (
        <Routes>
            <Route index element={<ProductPage />} />
            <Route path="novo" element={<ProductForm />} />
            <Route path="editar/:id" element={<ProductForm />} />
        </Routes>
    );
}