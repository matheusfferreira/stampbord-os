import { useEffect, useRef } from 'react'
import './App.css'
import api from './services/api'

function App() {

  const inputName = useRef()
  const inputTaxCode = useRef()
  const inputEmail = useRef()
  const inputPhone = useRef()

  async function createCustomer() {
    const customerObj = {
      name: inputName.current.value,
      taxCode: inputTaxCode.current.value,
      email: inputEmail.current.value,
      telefone: inputPhone.current.value
    }

    await api.post('/Customer', customerObj)
  }

  return (
    <div className='container'>
      <form>
        <h1>Customer form</h1>
        <input placeholder='Name' name='name' type='text' ref={inputName}></input>
        <input placeholder='Tax Code' name='taxCode' type='text' ref={inputTaxCode}></input>
        <input placeholder='Email' name='email' type='email' ref={inputEmail}></input>
        <input placeholder='Phone' name='phone' type='text' ref={inputPhone}></input>

        <button type='button' onClick={createCustomer}>Save</button>
      </form>
    </div>
  )
}

export default App
