import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Header from './layout/header';
import Content from './layout/content';
import Footer from './layout/footer';

function App() {
  return (
    <HashRouter>
      <Header />
      <Content />
      <Footer />
    </HashRouter>
  );
}

export default App;
