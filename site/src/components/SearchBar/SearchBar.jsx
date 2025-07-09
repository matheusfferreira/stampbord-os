import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';
import { useTranslation } from 'react-i18next';

export default function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    const { t } = useTranslation()

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(inputValue);
        }, 400);

        return () => clearTimeout(timer);
    }, [inputValue]);

    useEffect(() => {
        onSearch(debouncedValue);
    }, [debouncedValue, onSearch]);

    return (
        <input
            type="text"
            placeholder={t('common.search')}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
        />
    );
}