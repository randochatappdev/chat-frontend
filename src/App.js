import './App.css';
import Hello from './components/Hello/Hello';
import Login from './components/Login/login';
import Homescreen from './components/Homescreen/Homescreen';
import CreateRoom from './components/CreateRoom/CreateRoom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      {/* This div is only for testing purposes */}
      <div>
        <ul>
         
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/exit">Exit</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to ="/createRoom">CreateRoom</Link>
          </li>
          <li>
            <Link to="/">Homescreen</Link>
          </li>
          

        </ul>
      </div>


      <Switch>


        <Route path="/welcome">
          <Hello></Hello>
        </Route>

        <Route path="/exit">
          <Goodbye></Goodbye>
        </Route>

        <Route path='/login'>
          <Login></Login>
        </Route>

        <Route path="/createRoom">
          <CreateRoom></CreateRoom>
        </Route>

        <Route path="/">
          <Homescreen></Homescreen>
        </Route>

      

      </Switch>
    </Router>
  );
}

/* The following components are for testing purposes only. They are placeholders. */


function Goodbye() {
  return (
    <p>Bye!</p>
  )
}



export default App;
