import './App.css'
import './i18n'
import CustomerForm from './components/CustomerForm/CustomerForm'
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher'


function App() {
  return (
    <>
      <header>
        <img src="/src/assets/stampbord2.svg" alt="Logo" />
        <LanguageSwitcher />
      </header>
      <main>
        <CustomerForm />
      </main>
    </>
  )
}

export default App
