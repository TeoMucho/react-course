import {Route, Routes} from 'react-router'
import { HomePage } from './pages/HomePage'
import './App.css'

export function App() {
  

  return (
    <Routes>
      <Route path="/" element={<HomePage />} ></Route>
    </Routes>
   
  )
}

export default App
