import styles from './Spinner.module.css';

export default function Spinner() {
    return (
        <div className={`${styles['spinner-overlay']}`}>
            <div className={`${styles['spinner']}`} />
        </div>
    );
}