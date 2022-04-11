import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.component";
import Login from "./pages/login/login.component";
import Create from "./pages/create/create.component";
import Signup from "./pages/signup/signup.component";
import ProjectDetails from "./pages/project-details/project-detail.component";
import Navbar from "./components/navbar/navbar.component";
import Sidebar from "./components/sidebar/sidebar.component";

import { useAuthContext } from "./hooks/useAuthContext";

import "./App.css";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="container">
            <Navbar />
            <Switch>
              <Route exact path={"/"}>
                {user && <Dashboard />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path={"/create"}>
                {user && <Create />}
                {!user && <Redirect to="/login" />}
              </Route>
              <Route path={"/login"}>
                {!user && <Login />}
                {user && <Redirect to="/" />}
              </Route>
              <Route path={"/signup"}>
                {!user && <Signup />}
                {user && <Redirect to="/" />}
              </Route>
              <Route path={"/projects/:id"}>
                {user && <ProjectDetails />}
                {!user && <Redirect to="/login" />}
               </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
