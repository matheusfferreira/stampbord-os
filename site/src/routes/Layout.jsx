import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import styles from './Layout.module.css';

export default function Layout() {
    return (
        <>
            <Header />
            <div className={styles.page}>
                <Sidebar />
                <main className={styles.content}>
                    <Outlet />
                </main>
            </div>
        </>
    );
}