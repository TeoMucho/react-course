import { useState } from 'react'
import { LoginForm } from './components/LoginForm'
import './App.css'

function App() {
        const [showPassword, setShowPassword] = useState(false);

        function togglePasswordVisibility() {
          setShowPassword(!showPassword);
        }

        return (
          <>
            <button
              onClick={togglePasswordVisibility}
              className={showPassword ? 'ButtonON' : 'ButtonOFF'}
            >
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>

            <p className="title">Hello, welcome to my website</p>

            <LoginForm showPassword={showPassword} />
          </>
        );
      }

      export default App