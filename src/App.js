import logo from './logo.svg';
import './App.css';
import Chat from "./components/chat-ui/chat"
import Join from "./components/Assess-room/join"
import Call from "./components/voiceCall/call/call"
import End from "./components/voiceCall/end/end"
import Room from "./components/Room-Finder/room"
import Extend from "./components/Extended-view/extend"
import Settings from "./components/Settings/Settings"
import Login from "./components/Login/Login"
import Find from "./components/Find/Find";
import Finder from "./components/Finder/Finder";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect, Provider } from 'react-redux';

import Homescreen from './components/Homescreen/Homescreen';
import Topic from './components/Topic/Topic';
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
    this.state = { users: [], nyeam: "", isLoggedIn: false }

    this.onLogout = this.onLogout.bind(this);
    this.fetchUsers = this.fetchUsers.bind(this);
    this.fetchSelf = this.fetchSelf.bind(this);

  }

  async fetchUsers() {
    const data = await fetch('http://localhost:4000/api/rooms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      }
    });

    try {
      const newData = await data.json();
      console.log(newData)
      this.setState({ rooms: newData })


      // Create shallow copy of data
      const newRooms = [...newData];
      console.log(newRooms)

      newRooms.forEach((room) => {

        room.messages = [];



      })
      console.log("new", newRooms)
      console.log(" proppy", this.props.users)

      if (this.props.users.length < 1) {
        this.props.dispatch(actions.POPULATE_USERS(newRooms))

      }
      //this.fetchMessages()
      //console.log(newData)
      console.log(newRooms)
      console.log("Went through here")

      socket.emit('join-rooms', newRooms)


    } catch (error) {
      console.error(error)
    }
  }

  async fetchSelf() {
    const data = await fetch('http://localhost:4000/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      }
    });

    try {
      const newData = await data.json();
      console.log(newData)
      this.props.dispatch(actions.SET_USER(newData[0]))

    } catch (error) {
      console.error(error)
    }
  }



  componentDidMount() {
    let localStorage = window.localStorage;
    let session = localStorage.getItem("sessionToken");
    this.setState({ isLoggedIn: true })



    if (session !== 'undefined' && session) {
      const sessionToken = localStorage.getItem("sessionToken");
      console.log("why")
      if (sessionToken) {
        socket.auth = { sessionToken };
        socket.connect();
      }
    }


    this.fetchUsers();




    // Listener for session details
    socket.on("session", ({ sessionToken, userID, alias }) => {
      // Attach the sessionToken to the next reconnection attempts
      socket.auth = { sessionToken };

      // Store in localStorage
      localStorage.setItem("sessionToken", sessionToken)

      // Save the ID of the user
      socket.userID = userID;
      socket.alias = alias;

      console.log(userID)
      console.log(socket.userID)
    })

    /*socket.on("users", (users) => {
      console.log(users)
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

    });*/









    socket.on("user connected", (user) => {
      console.log(user)
      //this.props.dispatch(actions.PUSH_USER(user));
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

    socket.on("room message", ({ content, from, room }) => {
      const newRooms = [...this.props.users];
      const findRoom = (roome) => roome._id === room;
      const newRoomIndex = newRooms.findIndex(findRoom);
      const newRoom = newRooms.find(roome => roome._id === room);
      console.log(newRoom)
      //console.log(newUser)
      newRoom.messages.push({ sender: from, content: { contentType: "String", body: content } })
      newRooms[newRoomIndex] = newRoom;

      this.props.dispatch(actions.POPULATE_USERS(newRooms))


    });

    socket.on("connect", () => {
      // Shallow copy user state
      const usersCopy = [...this.props.users]

      usersCopy.forEach((user) => {
        if (user.self) {
          user.connected = true;
        }
      });

      this.props.dispatch(actions.POPULATE_USERS(usersCopy))
    });

    socket.on("disconnect", () => {
      /* Shallow copy user state
      const usersCopy = [...this.props.users]

      usersCopy.forEach((user) => {
        if (user.self) {
          user.connected = false;
        }
      });
      this.props.dispatch(actions.POPULATE_USERS(usersCopy))
      */
      console.log("Oh noe")
      socket.connect()


    });
  }



  componentDidUpdate() {
    if (this.state.isLoggedIn)
      this.fetchSelf();

  }

  componentWillUnmount() {
    socket.removeAllListeners();
  }

  onLogout() {
    window.localStorage.clear();
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

            <li>
              <button onClick={this.onLogout}>Logout</button>
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

          <Route path="/chat/:id">
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
          <Route path="/room-finder">
            <Room></Room>
          </Route>
          <Route path="/extended-view">
            <Extend></Extend>
          </Route>
          <Route path="/find">
            <Find />
          </Route>

          <Route path="/finder">
            <Finder></Finder>
          </Route>

          <Route path="/topics/edit">
            <Topic></Topic>
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
