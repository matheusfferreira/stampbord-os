import { useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

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
            placeholder="Buscar..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
        />
    );
}