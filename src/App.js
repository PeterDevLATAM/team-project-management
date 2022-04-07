import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.component"
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route exact path={"/"}>
              <Dashboard/>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
