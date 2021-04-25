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
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

function mapStateToProps(state, ownProps) {
  const s = state;

  return { count: state }
}


// Action Creator
var INCREMENT = function (number) {
  return { type: INCREMENT, payload: number }
}

var DECREMENT = function (number) {
  return { type: DECREMENT, payload: number }
}

// Reducer
function counter(state, action) {
  if (typeof state === 'undefined') {
    state = 0 // If state is undefined, initialize it with a default value
  }

  switch (action.type) {
    case 'INCREMENT':
      return parseInt(state) + action.payload
    case 'DECREMENT':
      return state - action.payload
    default:
      return state
  }

}

const store = createStore(counter, [0] + window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.dispatch({
  type: 'INCREMENT',
  payload: 10
})



function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* This div is only for testing purposes */}
        {console.log(store.getState())}
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
    </Provider>

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
