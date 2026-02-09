import {Link} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faBell, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

function Layout({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className='flex min-h-screen bg-gray-100'>

        <aside className={`fixed p-5 inset-y-0 left-0 w-64 bg-white shadow-md ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 md:translate-x-0 md:static md:inset-0`}>
        <h2 className="text-2xl font-bold mb-8">Coaching Logo</h2>

        <nav className="space-y-4">
          <Link to="/dashboard" className="block hover:bg-gray-100 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/students" className="block hover:bg-gray-100 p-2 rounded">
            All Students
          </Link>
          <Link to="/results" className="block hover:bg-gray-100 p-2 rounded">
            Results
          </Link>
          <Link to="/results" className="block hover:bg-gray-100 p-2 rounded">
            Courses
          </Link>
        </nav>
      </aside>

      <div className='flex-1 flex flex-col'>
        <header className='bg-white shadow p-4 flex justify-between items-center'>
         <div className='flex items-center'>
           <button
            className='mr-4 md:hidden p-2 rounded-md hover:bg-gray-100'
            onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <h1 className='text-xl font-semibold'>Dashboard</h1>
          </div>
         <div className='flex items-center space-x-4'>
            <button className='rounded-full p-2 hover:bg-gray-200'><FontAwesomeIcon icon={faBell} /></button>
            <div className='hover:bg-gray-200 rounded-full p-2'>
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
             </div>
           </div>
        </header>

      <main className="p-6">
        {children}
      </main>

    </div>
    </div>
  )
}

export default Layout
