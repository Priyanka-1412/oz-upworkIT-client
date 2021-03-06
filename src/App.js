import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Home from "./components/home/Home";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile/Profile";
import ShowProfile from "./components/profile/ShowProfile";
import MyProfile from "./components/profile/MyProfile";
import UpdateProfile from "./components/profile/UpdateProfile";
import NewProject from "./components/project/NewProject"
import Project from "./components/project/Project";
import MyProject from "./components/project/MyProject";
import ProjectDetails from "./components/project/ProjectDetails"
import UpdateProject from "./components/project/UpdateProject";
import Search from "./components/project/Search";
// import Profile from "./components/profile/Profile";
import CreateProfile from "./components/profile/CreateProfile";

const queryClient = new QueryClient();

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <QueryClientProvider client={queryClient}>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/projects"} className="nav-link">
                BROWSE JOBS
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/project"} className="nav-link">
                POST A PROJECT
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/profiles"} className="nav-link">
                DEVELOPER
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                CREATE A PROFILE
              </Link>
            </li>

            {currentUser && currentUser.userType === "developer" && (
              <li className="nav-item">
                <Link to={`/user/${currentUser.id}`} className="nav-link">
                  MY PROFILE
                </Link>
              </li>
            )}

            {currentUser && currentUser.userType === "client" && (
              <li className="nav-item">
                <Link to={`/projects/user/${currentUser.id}`} className="nav-link">
                  MY JOB POST
                </Link>
              </li>
            )}

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LOGOUT
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  LOGIN
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  SIGN UP
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div class="searchbar">
            <Search />
        </div>

        <div className="container mt-3">

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profiles" component={Profile} />
            <Route exact path="/profile" component={CreateProfile} />
            <Route exact path="/profile/:profileId" component={(props) => <ShowProfile {...props} />} />
            <Route exact path="/user/:userId" component={ MyProfile } />
            <Route exact path="/profile/:userId/update" component={UpdateProfile} />
            <Route exact path="/projects" component={Project} />
            <Route exact path="/project/:projectId" component={(props) => <ProjectDetails {...props} />}/>
            <Route exact path="/projects/user/:userId" component={ MyProject } />
            <Route exact path="/project/:userId/update" component={UpdateProject} />
            <Route exact path="/project" component={ NewProject} />
            <Route exact path="/search" component={Search} />
          </Switch>
        </div>
      </div>
      </QueryClientProvider>
    );
  }
}

export default App;
