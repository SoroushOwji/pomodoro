import React from "react";
import { VscGear, VscPieChart } from "react-icons/vsc";
import { Link } from 'react-router-dom';

import IconButton from "../IconButton";

import './nav.scss';


export default function Nav() {
  return (
    <nav className="nav">
      <Link className="nav__home" to="/">
        HOME
      </Link>
      <Link to="/setting">
        <IconButton>
          <VscGear />
        </IconButton>
      </Link>
      <Link to="/stats">
        <IconButton>
          <VscPieChart />
        </IconButton>
      </Link>
    </nav>
  )
}
