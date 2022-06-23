import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import PatientForm from "./PatientForm";

export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route exact path="/user/:pid" element={<PatientForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
