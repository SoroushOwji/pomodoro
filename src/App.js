import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Timer from './Timer';
import Nav from './Nav';

import './app.scss';


function Home() {
  return (
    <>
      <Timer />
    </>
  )
}

function Stats() {
  return <div>stats here</div>
}

function Setting() {
  return  <div>settings here</div>
}


function App() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4 offset-md-3 offset-lg-4 app">
          <Router>
            <Nav />
            <div className="app__container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/setting" element={<Setting />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
