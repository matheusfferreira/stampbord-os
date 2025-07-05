import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
    const { t } = useTranslation();

    return (
        <nav className={styles.sidebar}>
            <ul>
                <li>
                    <NavLink to="/clientes" className={({ isActive }) => isActive ? styles.active : ''}>
                        {t('customer.title')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/produtos" className={({ isActive }) => isActive ? styles.active : ''}>
                        {t('product.title')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/pedidos" className={({ isActive }) => isActive ? styles.active : ''}>
                        {t('order.title')}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}