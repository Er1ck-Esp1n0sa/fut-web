import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AddFut from "./components/add-fut.component";
import FutList from "./components/fut-list.component";


class App extends Component {
  render() {
    return (
      <body>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="https://github.com/Er1ck-Esp1n0sa" target="_blank" rel="noopener noreferrer" className="navbar-brand">
            Creador
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={""} className="nav-link">
                Lista
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Agregar
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>FUT ⚽ WEB</h2>
          <Routes>
            <Route path="/" element={<FutList />} />
            <Route path="add" element={<AddFut />} />
          </Routes>
        </div>
      </div>
      </body>
    );
  }
}

export default App;
