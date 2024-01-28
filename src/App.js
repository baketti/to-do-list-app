import React from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import { lazy, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import ToDoList from './components/ToDoList';
import Filters from './components/Filters';
import './index.css';

function App() {
  return (
    <MDBContainer fluid>
      <div className="App">
          <Header />
          <div className='app-container'>
            <ToDoList />
            <Filters />
          </div>
        </div>
    </MDBContainer>
  );
}

export default App;
