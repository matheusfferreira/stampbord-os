import './App.css'
import './i18n'
import CustomerForm from './components/CustomerForm'
import LanguageSwitcher from './components/LanguageSwitcher'


function App() {
  return (
    <>
      <header>
        <img src="/public/logo.svg" alt="Logo" />
        <LanguageSwitcher />
      </header>
      <main>
        <CustomerForm />
      </main>
    </>
  )
}

export default App
