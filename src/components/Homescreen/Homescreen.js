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
    const { rooms } = state;
    return { currentUser, jwt, selectedUser, users, rooms };
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





    componentDidMount() {
    }



    render() {
        if (this.props.rooms && this.props.rooms.length > 0) {
            return (
                < div className="container" >
                    <h1 className="header">Rooms</h1>

                    <List className="list">
                        {this.props.rooms.map((room) =>
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