import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import SignUpForm from './components/SignUpForm'
import AdminPage from './components/Admins/AdminPage'

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element = {<SignUpForm />} />
        <Route path="/admin" element = { <AdminPage /> } />

        
    </Routes>

  )
}

export default AppRoutes