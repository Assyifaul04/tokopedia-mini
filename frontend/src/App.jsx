import React from 'react'
import { Routes, Route } from 'react-router-dom'
import router from './router'

export default function App() {
  return (
    <Routes>
      {router.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={<route.layout>{<route.component />}</route.layout>}
        />
      ))}
    </Routes>
  )
}
