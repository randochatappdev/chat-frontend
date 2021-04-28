import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import './find.css';


const useStyles = makeStyles((theme) => ({
    root1: {
      display: 'center',
      justifyContent: 'center',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
  }));

    export default function SimpleList() {
        const classes = useStyles();
    
    function Chips() {
        const classes = useStyles();
    }
    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
      }
    const handleClick = () => {
      console.info('You clicked the Chip.');
    };

    return (
        <div className='arrow'>
        <IconButton aria-label="back" className={classes.margin} size="small">
          <ArrowBack fontSize="inherit" />
        </IconButton>
        <div>
        <h1>Find a Room</h1>
        </div>
        <h2>QUICK ACTIONS</h2>
        <div>
          <Chip className={classes.root1} avatar={<Avatar>+</Avatar>} label="Create a new room" onClick={handleClick} />
          <Chip className={classes.root1} avatar={<Avatar>+</Avatar>} label="Create a new topic" onClick={handleClick} />
          </div>
          <div>
        <h3>STARRED</h3>
        <List component="nav" aria-label="">
        <ListItem button>
        <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar>
          <ListItemText primary="Windows Phone Bashers" />
        </ListItem>
        <ListItemLink href="#simple-list">
        <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar>
          <ListItemText primary="Windows Phone Bashers" />
        </ListItemLink>
      </List>
      <h4>BY Topic</h4>
      <List component="nav" aria-label="">
        <ListItem button>
        <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar>
          <ListItemText primary="Windows Phone Bashers" />
        </ListItem>
        <ListItemLink href="#simple-list">
        <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar>
          <ListItemText primary="Windows Phone Bashers" />
        </ListItemLink>
      </List>
        </div>
        </div>
    );
  }

