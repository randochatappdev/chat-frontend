import logo from './logo.svg';
import './App.css';
import Chat from "./components/chat-ui/chat"
import Join from "./components/Assess-room/join"
import Call from "./components/voiceCall/call/call"
import End from "./components/voiceCall/end/end"
import Settings from "./components/Settings/Settings"
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

          <li>
            <Link to="/join">Join</Link>
          </li>

          <li>
            <Link to="/call">(Call) </Link>
            <Link to="/end"> (End)</Link>
          </li>

          <li>
            <Link to="/settings">Settings</Link>
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

        <Route path="/join">
          <Join></Join>
        </Route>

        <Route path="/call">
          <Call></Call>
        </Route>

        <Route path="/end">
          <End></End>
        </Route>

        <Route path="/settings">
          <Settings></Settings>
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
