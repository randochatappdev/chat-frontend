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


class Homescreen extends React.Component {
    constructor(props) {
        super(props);
        let localStorage = window.localStorage;




        this.state = {
            users: users,
            rooms: [],
            topics: topics,
            messages: messages,
            isLoggedIn: localStorage.getItem('jwt'),
            isLoading: true

        }





        console.log(users)


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
            this.setState({ rooms: newData })
            this.fetchMessages()
            console.log(newData)

        } catch (error) {
            console.error(error)
        }
    }

    async fetchMessages() {
        const roomArray = this.state.rooms.slice(0, 5);

        roomArray.forEach((room, index) => {
            let previousState = this.state;
            console.log(room._id)
            console.log(index)






            let rooms = [...previousState.rooms]
            console.log(this.state.rooms)
            console.log(rooms);
            let roomItem = { ...rooms[index] }
            roomItem.messages = "Hello";
            rooms[index] = roomItem;
            console.log(rooms[index])
            console.log(rooms)

            this.setState({ rooms: rooms, isLoading: false })






        })
    }


    componentDidMount() {
        this.fetchUsers();


    }



    render() {
        console.log(this.state.users);
        if (this.state.isLoggedIn && !this.state.isLoading) {
            console.log(this.state.rooms)
            console.log(this.state.rooms[1].messages)

            return (
                < div className="container" >
                    <h1 className="header">Rooms</h1>

                    <List className="list">
                        {this.state.rooms.map((room) =>

                            <ListItem button key={room._id}>
                                <ListItemAvatar>
                                    <Avatar alt={room.name} src={room.groupDisplayPictureLink || "https://picsum.photos/200"} />
                                </ListItemAvatar>
                                <ListItemtext
                                    primary={room.name}
                                    secondary={room.messages}
                                    className="chat-preview"
                                ></ListItemtext>
                                <ListItemtext className="time">09:00</ListItemtext>
                            </ListItem>

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

                    </div>




                    <BottomNavigation className="nav"
                        showLabels

                    >
                        <BottomNavigationAction className="buttonnav" label="Rooms" icon={<RestoreIcon />} />
                        <BottomNavigationAction className="buttonnav" label="Room Finder" icon={<SearchIcon />} />
                        <BottomNavigationAction className="buttonnav" label="Settings" icon={<SettingsIcon />} />
                    </BottomNavigation>
                </div >
            )
        }

    }
}

export default connect()(Homescreen)