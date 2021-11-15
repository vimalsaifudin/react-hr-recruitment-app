import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import CreateCandidate from "./components/CreateUser";
import { Container, NavDropdown } from 'react-bootstrap';
import Sidebar from "./components/Sidebar";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    }
  }, [])

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  }

  return (
    <Container fluid className="p-0">
      <div className="d-flex" id="wrapper">
        <div className="border-end bg-white" id="sidebar-wrapper">
          <div className="sidebar-heading border-bottom bg-light">
          <Link to={"/"} className="navbar-brand" style={{fontSize:'1.2rem'}}>
            Human Resources
          </Link>
          </div>
          <Sidebar currentUser={currentUser} showAdminBoard={showAdminBoard} showModeratorBoard={showModeratorBoard} />
        </div>
        <div id="page-content-wrapper">
          <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <Container fluid>
          <ul className="navbar-nav">
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {/* {currentUser && (
             <li className="nav-item">
             <Link to={"/user"} className="nav-link">Candidates </Link>
             </li>
          )} */}


          </ul>

          {currentUser ? (
            <div className="navbar-nav ml-auto">

              <NavDropdown title={currentUser.username}  id="basic-nav-dropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="/resetpwd">Reset Password</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/login" onClick={logOut}>Logout</NavDropdown.Item>
              </NavDropdown>



            </div>
          ) : (
            <ul className="navbar-nav navbar-right">
              <li>
                <Link to={"/login"} className="btn btn-primary m-1">
                  Login
                </Link>
              </li>

              <li>
                <Link to={"/register"} className="btn btn-secondary m-1">
                  Register
                </Link>
              </li>
            </ul>
          )}
        </Container>
          </nav>
          <Container fluid>
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/resetpwd" component={ResetPassword} />
            <Route exact path="/createuser" component={CreateCandidate} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
          </Switch>
          </Container>

        </div>
      </div>
    </Container>
  )
}

export default App;
