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
import CreateRoom from "./components/CreateRoom/CreateRoom";
import CreateTopic from './components/CreateTopic/CreateTopic';
import Signup from './components/Signup/Signup';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { connect, Provider } from 'react-redux';

import Homescreen from './components/Homescreen/Homescreen';
import Topic from './components/Topic/Topic';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';




import actions from './actions';
import store from './store';
import React from 'react';
import socket from './socket';
import { Container } from '@material-ui/core';

function mapStateToProps(state) {
  const { counter } = state;
  const { users } = state;
  const { rooms } = state;
  const { navBeVisible } = state;
  return { counter, users, rooms, navBeVisible }
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
    const usersData = await fetch('https://randochatapp.herokuapp.com/retrieveRoom', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      }
    });

    const roomsData = await fetch('https://randochatapp.herokuapp.com/api/rooms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      }
    });

    try {
      const newData = await usersData.json();
      const newRoomsData = await roomsData.json();

      // Create shallow copy of data
      const newRooms = [...newData];

      // Attach a message property to each room
      newRooms.forEach((room) => {
        room.messages = [];
      })

      this.props.dispatch(actions.POPULATE_USERS(newRooms))


      // Filter rooms to participated rooms only
      const participatedRooms = [];

      newRooms.forEach((room) => {
        newRoomsData.forEach((partRoom) => {
          if (room._id === partRoom._id) {
            participatedRooms.push(room)
          }
        })
      })

      // Update rooms state
      this.props.dispatch(actions.POPULATE_ROOMS(participatedRooms));

      socket.emit('join-rooms', participatedRooms)


    } catch (error) {
    }
  }

  async fetchSelf() {
    const data = await fetch('https://randochatapp.herokuapp.com/api/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      }
    });

    try {
      const newData = await data.json();
      this.props.dispatch(actions.SET_USER(newData[0]))

    } catch (error) {
    }
  }



  componentDidMount() {
    let localStorage = window.localStorage;
    let session = localStorage.getItem("sessionToken");


    if (session !== 'undefined' && session) {
      socket.auth = { session };
      socket.connect();
      this.setState({ isLoggedIn: true })
      // Populates the state where all rooms are kept
      this.fetchUsers();
      this.fetchSelf();


    }






    // Listener for session details
    socket.on("session", ({ sessionToken, userID, alias }) => {
      // Attach the sessionToken to the next reconnection attempts
      socket.auth = { sessionToken };

      // Store in localStorage
      localStorage.setItem("sessionToken", sessionToken)

      // Save the ID of the user
      socket.userID = userID;
      socket.alias = alias;

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



    socket.on("private message", ({ content, from }) => {
      this.setState({ nyeam: "yum" });
      const newUsers = [...this.props.users];
      for (let i = 0; i < this.props.users.length; i++) {

        const user = newUsers[i];
        if (!user.messages) {
          user.messages = []
        }
        if (user.userID === from) {
          user.messages.push({
            content,
            fromSelf: false,
          });
          if (user !== this.selectedUser) {
            user.hasNewMessages = true;
          }

          break;
        }
      }

      this.props.dispatch(actions.POPULATE_USERS(newUsers))
    });

    socket.on("room message", ({ content, from, room }) => {
      const newRooms = [...this.props.users];
      const findRoom = (roome) => roome._id === room;
      const newRoomIndex = newRooms.findIndex(findRoom);
      const newRoom = newRooms.find(roome => roome._id === room);
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
      <div className="app-container">

        <div className="desktop-warning">
          <p>Rando Chat App is not yet optimized for larger screens at the moment. Please use a phone or a tablet to access this website.</p>
        </div>

        <Router>

          <Switch>

            <Route path="/home" >
              <Homescreen ></Homescreen>
            </Route>

            <Route path="/chat/:id" >
              <Chat ></Chat>
            </Route>


            <Route path="/settings">
              <Settings ></Settings>
            </Route>

            <Route path="/login">
              <Login />
            </Route>
            <Route path="/room-finder">
              <Room ></Room>
            </Route>
            <Route path="/extended-view" >
              <Extend ></Extend>
            </Route>
            <Route path="/find">
              <Find />
            </Route>

            <Route path="/finder" >
              <Finder ></Finder>
            </Route>

            <Route path="/topics/edit" >
              <Topic ></Topic>
            </Route>

            <Route path="/room/new">
              <CreateRoom />
            </Route>

            <Route path="/topics/new">
              <CreateTopic />
            </Route>

            <Route path="/register">
              < Signup />
            </Route>

            <Route path="/">
              {this.state.isLoggedIn
                ? <Homescreen />
                : <Login />}
            </Route>





          </Switch>

          {this.props.navBeVisible &&
            <BottomNavigation className="nav"
              showLabels

            >
              <BottomNavigationAction className="buttonnav" label="Rooms" icon={<RestoreIcon />}
                component={Link} to="/home"

              />


              <BottomNavigationAction className="buttonnav" label="Room Finder" icon={<SearchIcon />}
                component={Link} to="/find" />





              <BottomNavigationAction component={Link} to="/settings" className="buttonnav" label="Settings" icon={<SettingsIcon />}
              />
            </BottomNavigation>
          }

        </Router >
      </div>

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
