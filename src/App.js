import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AllTheft from './components/Main/AllTheftPage/AllTheft';
import Theft from './components/Main/AllTheftPage/Theft';
import Authorization from './components/Main/AuthorizationPage/Authorization';
import Home from './components/Main/HomePage/Home';
import Registration from './components/Main/RegistrationPage/Registration';
import ReportTheft from './components/Main/ReportTheftPage/ReportTheft';
import Employee from './components/Main/ResponsibleEmployeesPage/Employee';
import ResponsibleEmployees from './components/Main/ResponsibleEmployeesPage/ResponsibleEmployees';
import './App.css'
import Footer from './components/Footer/Footer';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className='main'>
          <Routes>
            <Route path='/' element={<Home />} />    
            <Route path='/reportTheft' element={<ReportTheft />} />  
            <Route path='/allTheft' element={<AllTheft />} />   
            <Route path='/responsibleEmployees' element={<ResponsibleEmployees />} />    
            <Route path='/registration' element={<Registration />} />
            <Route path='/authorization' element={<Authorization />} />
            <Route path='/allTheft/:id' element={<Theft />} />
            <Route path='/responsibleEmployees/:id' element={<Employee />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
