import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#0056b3' }}>
        <div className="container-fluid">
          <Link
            to='/'
            className="navbar-brand"
          >
            IUD PELIS
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  to='/'
                  className="nav-link"
                  style={{ color: 'white' }}
                  activeClassName="active"
                >
                  Generos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to='/directores'
                  className="nav-link"
                  style={{ color: 'white' }}
                  activeClassName="active"
                >
                  Directores
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to='/productoras'
                  className="nav-link"
                  style={{ color: 'white' }}
                  activeClassName="active"
                >
                  Productoras
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to='/tipos'
                  className="nav-link"
                  style={{ color: 'white' }}
                  activeClassName="active"
                >
                  Tipos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to='/series-peliculas'
                  className="nav-link"
                  style={{ color: 'white' }}
                  activeClassName="active"
                >
                  Series y Peliculas
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
    </nav>
  )
}    
