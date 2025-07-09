import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

export default function LanguageSwitcher() {
    const { i18n, t } = useTranslation();

    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
    };
    return (
        <div className={`${styles['translation-selector']}`}>
            <button onClick={() => handleLanguageChange('pt')}>{t('common.portuguese')}</button>
            <button onClick={() => handleLanguageChange('en')}>{t('common.english')}</button>
        </div>
    )
};