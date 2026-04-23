import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home'
import Invoice from './pages/Invoice'
import Sidebar from './component/sidebar'
import React from 'react'

function App() {
  const [open, setIsOpen] = React.useState(false)
  const [darkMode, setDarkMode] = React.useState(false);
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const onToggle = () => setDarkMode(prev => !prev)
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage open={open} isOpen={setIsOpen} />
    },
    {
      path: "/:id",
      element: <Invoice open={open} isOpen={() => setIsOpen(true)} />
    }
  ])
  return (
    <>
      <main className='flex flex-col md:flex-row min-h-screen  dark:bg-[#0C0E16]'>
        <Sidebar onClick={onToggle} />
        <section className='flex min-h-screen'>
          <RouterProvider router={router} />
        </section>
      </main>
    </>
  )
}

export default App
