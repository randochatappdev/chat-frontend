import logo from './logo.svg';
import './App.css';
import Chat from "./components/chat-ui/chat"
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
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/welcome">Welcome</Link>
          </li>
          <li>
            <Link to="/exit">Exit</Link>
          </li>
          <li>
            <Link to="/chat">Chat</Link>
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

        <Route path="/home">
          <p>Home</p>
        </Route>

        <Route path="/chat">
          <Chat></Chat>
        </Route>


      </Switch>
    </Router>
  );
}

/* The following components are for testing purposes only. They are placeholders. */
function Hello() {
  return (
    <p>Hello!</p>
  )
}


function Goodbye() {
  return (
    <p>Bye!</p>
  )
}


export default App;
