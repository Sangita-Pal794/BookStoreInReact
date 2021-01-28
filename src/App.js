import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";
import AdminLogin from "../../bookstore/src/component/Admin/AdminLogin/adminLogin.jsx"
import AdminDashboard from "../../bookstore/src/component/Admin/AdminDashboard/adminDashboard.jsx"
import PrivateRoute from "./component/auth/privateRoute.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/adminlogin" component={AdminLogin} />
        <PrivateRoute path="/admindashboard" component={AdminDashboard} />
      </Router>
      
    </div>
  );
}

export default App;
