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
import React from 'react';
import socket from './socket';

function mapStateToProps(state) {
  const { counter } = state;
  const { users } = state;
  return { counter, users }
}








class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], nyeam: "" }



  }

  componentDidMount() {
    socket.on("users", (users) => {
      console.log("hello")
      users.forEach((user) => {
        user.self = user.userID === socket.id;
      });
      // put the current user first, and then sort by username
      let userList = users.sort((a, b) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.alias < b.alias) return -1;
        return a.alias > b.alias ? 1 : 0;
      });

      users.forEach((user) => {
        user.messages = []
      })
      this.props.dispatch(actions.POPULATE_USERS([...userList]))
      console.log("state", this.props.users)

    });



    socket.on("user connected", (user) => {
      this.props.dispatch(actions.PUSH_USER(user));
    });

    socket.on("private message", ({ content, from }) => {
      this.setState({ nyeam: "yum" });
      const newUsers = [...this.props.users];
      console.log(newUsers)
      for (let i = 0; i < this.props.users.length; i++) {

        const user = newUsers[i];
        if (!user.messages) {
          console.log("Empty lol")
          user.messages = []
        }
        console.log(typeof user.messages)
        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          if (user !== this.selectedUser) {
            user.hasNewMessages = true;
          }
          console.log(user)

          break;
        }
      }

      this.props.dispatch(actions.POPULATE_USERS(newUsers))
      console.log(this.props.users)
    });

  }

  render() {

    return (

      <Router>
        <p>{this.state.nyeam}</p>
        <button type="button" onClick={() => this.props.dispatch(actions.INCREMENT(50))} >Add</button>
        {/* This div is only for testing purposes */}
        {console.log(store.getState())}
        {console.log(this.props.users)}
        <div>
          {console.log(this.props)}
          <p>{this.props.counter}</p>
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
