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


class Homescreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        users: users,
        topics: topics,
        rooms: rooms,
        messages: messages,     
    
        }

        console.log(users)   

    }
    render() {
        console.log(this.state.users);
       
            return (
                <div className="container">
                    <h1 className="header">Rooms</h1>

                    <List className="list">
                        {this.state.users.map((user) => 
                            <ListItem button>
                            <ListItemAvatar>
                                <Avatar alt={user.alias} src={user.displayPicture}/>
                            </ListItemAvatar>
                            <ListItemtext
                                primary={user.alias}
                                secondary="Hello people to the world"></ListItemtext>
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
                </div>
            )
        }
    }

    export default Homescreen;