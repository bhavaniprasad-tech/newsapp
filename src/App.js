import './App.css'; 
import NavBar from './components/NavBar'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import React, { useState } from 'react'; 
import News from './components/News'; 
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 5;
  const apikey = process.env.REACT_APP_NEWS_API;

  const [progress, setProgress] = useState(0);

  return (
    <div>
      <Router>
        <NavBar />
        <LoadingBar height={3} color='#f11946' progress={progress} />
        <Routes>
          <Route exact path='/' element={<News setProgress={setProgress} apikey={apikey} key="Home" pageSize={pageSize} country="us" category="general" />} />
          <Route exact path='/business' element={<News setProgress={setProgress} apikey={apikey} key="business" pageSize={pageSize} country="us" category="business" />} />
          <Route exact path='/entertainment' element={<News setProgress={setProgress} apikey={apikey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
          <Route exact path='/general' element={<News setProgress={setProgress} apikey={apikey} key="general" pageSize={pageSize} country="us" category="general" />} />
          <Route exact path='/health' element={<News setProgress={setProgress} apikey={apikey} key="health" pageSize={pageSize} country="us" category="health" />} />
          <Route exact path='/science' element={<News setProgress={setProgress} apikey={apikey} key="science" pageSize={pageSize} country="us" category="science" />} />
          <Route exact path='/sports' element={<News setProgress={setProgress} apikey={apikey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
          <Route exact path='/technology' element={<News setProgress={setProgress} apikey={apikey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

