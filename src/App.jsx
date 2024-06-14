import { useState } from 'react'

import './App.css'
import './components/Fetchdata'
import Fetchdata from './components/Fetchdata'
import GoogleLocation from "./components/GoogleLocation"

function App() {
 

  return (
    <>
      <GoogleLocation/>
      <Fetchdata/>
    </>
  )
}

export default App
