import { useState } from 'react'
import './App.css'
import { Route, Router, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Page404 from './pages/Page404'
import EntityPage from './pages/EntityPage'
import EditEntity from './pages/EditEntity'

function App() {

  return (
    <>

      <Routes>
        <Route path='/'>
          <Route index element={<Dashboard />} />
          <Route path='entity/:id' element={<EntityPage />}/>
          <Route path='edit-entity/:id' element={<EditEntity />}/>
        </Route>


        <Route path='*' element={<Page404/>}/>

      </Routes>


    </>
  )
}

export default App
