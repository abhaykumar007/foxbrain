import "./App.css";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./component/Login/Login";
import Registration from "./component/Registration/Registration";
import Home from "./component/Home/Home";
function App() {
  function PrivateRoute({ Component, path }) {
    let user = localStorage.getItem("login");
    return (
      <Route
        path={path}
        render={(props) =>
          user ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/registration" exact component={Registration} />
          <PrivateRoute exact path={"/home"} Component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
