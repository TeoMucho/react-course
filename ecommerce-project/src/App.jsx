import {Route, Routes} from 'react-router'
import { HomePage } from './pages/HomePage'
import './App.css'

export function App() {
  

  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<div>Checkout Page</div>}></Route>
    </Routes>
   
  )
}

export default App
