import './Homescreen.css';
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import ListItemtext from '@material-ui/core/ListItemText';
import ListItemavatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { users, topics, rooms, messages } from '../../sample-data';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import Login from '../Login/Login';
import { BrowserRouter } from 'react-router-dom';
import { browserHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import Hello from '../Hello/Hello';
import CircularProgress from '@material-ui/core/CircularProgress';
import socket from '../../socket';
import { Link } from 'react-router-dom';
import actions from '../../actions';


function mapStateToProps(state) {
    const { currentUser } = state;
    const { jwt } = state;
    const { selectedUser } = state;
    const { users } = state;
    return { currentUser, jwt, selectedUser, users };
}

class Homescreen extends React.Component {
    constructor(props) {
        super(props);
        let localStorage = window.localStorage;




        this.state = {
            users: [],
            rooms: [],
            topics: topics,
            messages: messages,
            isLoggedIn: localStorage.getItem('jwt'),
            isLoading: true,
            props: props

        }
        console.log(this.props.users)










    }

    primaryStyles = {
        "text-overflow": "ellipsis",
        "color": "green"
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



            // Create shallow copy of data
            const newRooms = [...newData];

            newRooms.forEach((room) => {

                room.messages = [];



            })
            console.log("new", newRooms)
            console.log(" proppy", this.props.users)

            if (this.props.users.length < 1) {
                this.props.dispatch(actions.POPULATE_USERS(newRooms))

            }

            socket.emit('join-rooms', newRooms)


        } catch (error) {
            console.error(error)
        }
    }




    componentDidMount() {
        this.fetchUsers();
        this.props.dispatch(actions.CHANGE_USER(null))
        socket.on("users", (users) => {
            users.forEach((user) => {
                user.self = user.userID === socket.id;
            });
            // put the current user first, and then sort by username
            this.state.users = users.sort((a, b) => {
                if (a.self) return -1;
                if (b.self) return 1;
                if (a.username < b.username) return -1;
                return a.username > b.username ? 1 : 0;
            });
            console.log(this.state.users)

        });

        socket.on("newMessage", (message) => {
            console.log(message)
        })




    }



    render() {
        if (this.props.users && this.props.users.length > 0) {
            return (
                < div className="container" >
                    <h1 className="header">Rooms</h1>

                    <List className="list">
                        {this.props.users.map((room) =>
                            <Link to={"/chat/" + room._id} key={room._id}  >
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar alt={room.name} src={room.groupDisplayPictureLink || "https://picsum.photos/200"} />
                                    </ListItemAvatar>
                                    <ListItemtext
                                        primary={room.name}
                                        secondary={"Hello"}
                                        className="chat-preview"
                                    ></ListItemtext>
                                    <ListItemtext className="time">09:00</ListItemtext>
                                </ListItem>
                            </Link>


                        )}

                    </List>




                    <BottomNavigation className="nav"
                        showLabels

                    >
                        <BottomNavigationAction className="buttonnav" label="Rooms" icon={<RestoreIcon />} />
                        <BottomNavigationAction className="buttonnav" label="Room Finder" icon={<SearchIcon />} />
                        <BottomNavigationAction className="buttonnav" label="Settings" icon={<SettingsIcon />} />
                    </BottomNavigation>
                </div >
            )
        } else {
            return (

                < div className="container" >
                    <h1 className="header">Rooms</h1>

                    <div className="loading-container">
                        <CircularProgress className="loading" />

                        {this.state.rooms &&
                            <p>You have no rooms associated to your account.</p>}


                        {this.props.users &&
                            <List className="list">
                                {this.props.users.map((user) =>

                                    <Link to={"/chat/" + user.userID} onClick={() => this.props.dispatch(actions.CHANGE_USER(user))}>
                                        <ListItem button key={user.userID}>
                                            <ListItemAvatar>
                                                <Avatar alt={user.alias} src={"https://picsum.photos/200"} />
                                            </ListItemAvatar>
                                            <ListItemtext
                                                primary={user.alias}
                                                secondary="Hello"
                                                className="chat-preview"
                                            ></ListItemtext>
                                            <ListItemtext className="time">{user.connected}</ListItemtext>

                                        </ListItem>

                                    </Link>

                                )}

                            </List>
                        }
                    </div>




                    <BottomNavigation className="nav"
                        showLabels

                    >
                        <BottomNavigationAction className="buttonnav" label="Rooms" icon={<RestoreIcon />} />

                        <Link to="/find">
                            <BottomNavigationAction className="buttonnav" label="Room Finder" icon={<SearchIcon />} />

                        </Link>



                        <BottomNavigationAction className="buttonnav" label="Settings" icon={<SettingsIcon />} />
                    </BottomNavigation>
                </div >
            )
        }

    }
}

export default connect(mapStateToProps)(Homescreen)