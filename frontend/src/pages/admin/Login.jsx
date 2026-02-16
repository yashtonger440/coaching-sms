import { useState } from 'react'
import {useNavigate} from "react-router-dom"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()

        if (email === "" || password === "") {
            alert("Please fill the details")
            return
        }

        console.log(email, password)
        navigate("/dashboard")
    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-8'>
    <form onSubmit={handleLogin}
    className='bg-white p-10 rounded-xl shadow-2xl w-full max-w-sm'
    >
        <h2 className='text-2xl font-bold mb-6 text-center'>
            Admin Login
        </h2>

        <input
         className='w-full mb-4 px-3 py-2 border rounded'
         type="email"
         placeholder='Email'
         value={email}
         onChange={(e) => setEmail(e.target.value)}
        />
        <input
         className='w-full mb-4 px-3 py-2 border rounded'
         type="password"
         placeholder='Password'
         value={password}
         onChange={(e) => setPassword(e.target.value)}
         />
        <button className='w-full bg-blue-600 py-2 text-white mb-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
            Login
        </button>
    </form>
    </div>
  )
}

export default Login
