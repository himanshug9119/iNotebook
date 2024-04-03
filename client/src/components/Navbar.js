import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const path = useLocation().pathname;
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item px-2">
              <Link
                className={`nav-link ${
                  path === "/notes" ? "active text-white bg-secondary" : ""
                }`}
                aria-current="page"
                to="/notes"
              >
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  path === "/createnote" ? "active text-white bg-secondary" : ""
                }`}
                aria-current="page"
                to={"/createnote"}
              >
                Create Note
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  path === "/about" ? "active text-white bg-secondary" : ""
                }`}
                aria-current="page"
                to="/about"
              >
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  path === "/contact" ? "active text-white bg-secondary" : ""
                }`}
                aria-current="page"
                to="/contact"
              >
                Contact Us
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
