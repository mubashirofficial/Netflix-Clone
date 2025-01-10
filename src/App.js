import React from 'react';
import './App.css';
import urls from './Urls';
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RowPost from './Components/RowPost/RowPost';

function App() {
  return (
    <div className="app">
      <NavBar/>
      <Banner/>
      <RowPost url={urls.Originals} title='Netflix Originals'/>
      <RowPost url={urls.Action} title='Action' isSmall/>
    </div>
  );
}

export default App;
