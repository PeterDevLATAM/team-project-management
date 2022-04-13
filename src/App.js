import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.component";
import Login from "./pages/login/login.component";
import Create from "./pages/create/create.component";
import Signup from "./pages/signup/signup.component";
import ProjectDetails from "./pages/project-details/project-detail.component";
import Navbar from "./components/navbar/navbar.component";
import Sidebar from "./components/sidebar/sidebar.component";
import OnlineUsers from "./components/online-users/online-users.component";

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
            <Routes>
              <Route
                path={"/"}
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path={"/create"}
                element={user ? <Create /> : <Navigate to="/login" />}
              ></Route>
              <Route
                path={"/login"}
                element={!user ? <Login /> : <Navigate to="/" />}
              ></Route>
              <Route
                path={"/signup"}
                element={!user ? <Signup /> : <Navigate to="/" />}
              ></Route>
              <Route
                path={"/projects/:id"}
                element={user ? <ProjectDetails /> : <Navigate to="/login" />}
              ></Route>
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
