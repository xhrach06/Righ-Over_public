/* Author: Michal Ondrejka
Login: xondre15 */

// Importing Link and useLocation from react-router-dom and the corresponding styling
import { Link, useLocation } from "react-router-dom";
import "./style/Home.css";

// Component representing the navigation bar
function NavBar() {
  // Accessing the current location using useLocation from react-router-dom
  const location = useLocation();

  // JSX structure for the navigation bar
  return (
    <nav className="navbar navbar-expand-lg custom-bg-green-600">
      <div className="container-fluid">
        <div className="navbar-brand">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            className="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"
            />
          </svg>
          <span>RightOver</span>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">
                <div
                  className={`nav-link ${
                    location.pathname === "/recipes" ? "active" : "inactive"
                  }`}
                  aria-current="page"
                >
                  Recipes
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/pantry">
                <div
                  className={`nav-link ${
                    location.pathname === "/pantry" ? "active" : "inactive"
                  }`}
                >
                  Pantry
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/calendar">
                <div
                  className={`nav-link ${
                    location.pathname === "/calendar" ? "active" : "inactive"
                  }`}
                >
                  Planning
                </div>
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex">
          <Link to="/profile">
            <div className="nav-link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
                />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
