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

const c = [2,4,5,6,7,3,1,12,3]

function Block({ max, item }) {
  return <div>
    <svg viewBox={`0 0 4 ${max}`} width="100%">
      <line x1={2} x2={2} y1={max} y2={max - item} stroke="maroon"/>
    </svg>
    <div style={{ textAlign: 'center', marginTop: 10 }}>
      {item}
    </div>
  </div>
}


function Stats() {
  const max = Math.max(...c) + 1;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {c.map(item => <Block max={max} item={item} />)}
    </div>
  )
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
