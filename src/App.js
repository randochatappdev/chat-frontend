import logo from './logo.svg';
import './App.css';
import Chat from "./components/chat-ui/chat"
import Join from "./components/Assess-room/join"
import Call from "./components/voiceCall/call/call"
import End from "./components/voiceCall/end/end"
import Settings from "./components/Settings/Settings"
import Login from "./components/Login/Login"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect, Provider } from 'react-redux';

import Homescreen from './components/Homescreen/Homescreen';
import actions from './actions';
import store from './store';

function mapStateToProps(state) {
  console.log(state)
  return { counter: state }
}








function App(props) {
  return (

    <Router>
      <button type="button" onClick={() => props.dispatch(actions.INCREMENT(50))}>Add</button>
      {/* This div is only for testing purposes */}
      {console.log(store.getState())}
      <div>
        {console.log(props)}
        <p>{props.counter}</p>
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
          <Homescreen></Homescreen>
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

        <Route path="/login">
          <Login />
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


export default connect(mapStateToProps)(App);
