import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './components/Home'
import { Browse } from './components/Browse'
import JobDescription from './components/JobDescription'
import Profile from './components/Profile'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Jobs from './components/Jobs'
import Companies from './components/admin/companies'



const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/description/:id',
    element:<JobDescription/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  // Admin
  {
    path:'/admin/Companies',
    element:<Companies/>
  },
])

function App() {
  return (
   <>
<RouterProvider router = {appRouter}/>
   </>
  )
}

export default App