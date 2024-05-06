import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { Container, Typography } from '@mui/material';
import Header from './HomePage/Header';
import RegistrationForm from './HomePage/RegistrationForm';


function App() {
  return (
    <>
    <Header></Header>
    <RegistrationForm></RegistrationForm>
    </>
  );
}

export default App;
