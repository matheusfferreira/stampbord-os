import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher"
import styles from './Header.module.css';
import logo from '../../assets/stampbord2.svg';

export default function Header() {
    return (
        <header className={styles.header}>
            <img src={logo} alt="Logo" className={styles.logo} />
            <LanguageSwitcher />
        </header>
    )
}