import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.component";
import Login from "./pages/login/login.component";
import Create from "./pages/create/create.component";
import Signup from "./pages/signup/signup.component";
import ProjectDetails from "./pages/project-details/project-detail.component";

import Navbar from "./components/navbar/navbar.component";

import "./App.css";
import Sidebar from "./components/sidebar/sidebar.component";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="container">
          <Navbar />
          <Switch>
            <Route exact path={"/"}>
              <Dashboard />
            </Route>
            <Route path={"/create"}>
              <Create />
            </Route>
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/signup"}>
              <Signup />
            </Route>
            <Route path={"/projects/:id"}>
              <ProjectDetails />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
