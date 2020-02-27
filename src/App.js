import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Header from './layout/header';
import Content from './layout/content';
import Footer from './layout/footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Content />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
