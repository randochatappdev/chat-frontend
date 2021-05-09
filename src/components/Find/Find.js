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
import BackIcon from '@material-ui/icons/ArrowBackIos';
import CircularProgress from '@material-ui/core/CircularProgress';
import './find.css';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


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

function mapStateToProps(state) {
  const { selectedUser } = state;
  const { users } = state;
  const { rooms } = state;
  const { currentUser } = state;
  const { topics } = state;
  return { selectedUser, users, rooms, currentUser, topics }
}

function Find(props) {

  // State
  const [isFetched, setFetch] = useState(false);

  useEffect(() => {

    if (props.currentUser && !isFetched) {
      fetchTopics();
    }
  })

  useEffect(() => {
    props.dispatch(actions.SET_NAV_VIS(true));
  }, []);





  const classes = useStyles();
  const history = useHistory();


  function handleBack(event) {
    history.goBack();
  }


  async function fetchTopics() {
    setFetch(true);
    const data = await fetch('https://randochatapp.herokuapp.com/topics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      },
    });
    console.log(props.currentUser.preferredTopics)
    const newData = await data.json();

    // Use Array filter to filter topics
    const topics = newData.filter((topic, index) => props.currentUser.preferredTopics.includes(topic._id));

    fetchRooms().then((rooms) => {
      topics.forEach((topic, topicIndex) => {
        rooms.forEach((room, roomIndex) => {
          if (!topic.rooms) {
            topic.rooms = [];

          }

          if (room.topic.includes(topic._id)) {
            let newTopic = { ...topic }
            newTopic.rooms.push(room);
            topics[topicIndex] = newTopic;
          }



        })
      })
      props.dispatch(actions.POPULATE_TOPICS(topics))


    });

  }

  // Returns all rooms from DB
  async function fetchRooms() {
    const data = await fetch('https://randochatapp.herokuapp.com/retrieveRoom', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      },
    });

    const newData = await data.json();
    return newData;

  }

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
    <div className="find-container">
      <div className="find-header">
        <IconButton onClick={handleBack} aria-label="back" size="small" className="back-find">
          <BackIcon fontSize="large" />

        </IconButton>
        <h1 className="find-title">Find a Room</h1>
      </div>



      <div className="quick-actions">
        <h2>QUICK ACTIONS</h2>
        <div>
          <Chip className={classes.root1} avatar={<Avatar>+</Avatar>} label="Create a new room" component={Link} to="/room/new" />
          <Chip className={classes.root1} avatar={<Avatar>+</Avatar>} label="Create a new topic" component={Link} to="/topics/new" />
        </div>
      </div>

      <div className="finder-topic-list">




        {props.topics

          ?
          props.topics.map(topic => (
            <div key={topic._id}>
              {topic.rooms && topic.rooms[0] && topic.rooms.length >= 1 &&

                <h3>{topic.name.toUpperCase()}</h3>

              }

              <List component="nav" aria-label="">
                {topic.rooms &&

                  topic.rooms.map(room => (
                    <ListItem button key={room._id} component={Link} to={"/chat/" + room._id} >
                      <ListItemAvatar>
                        <Avatar alt={room.name} src={room.groupDisplayPictureLink} />
                      </ListItemAvatar>
                      <ListItemText primary={room.name} />
                    </ListItem>
                  ))
                }



              </List>
            </div>
          ))

          :

          <div className="loading-container">
            <CircularProgress className="loading" />

            {props.topics &&
              <p>You have no rooms associated to your account.</p>}



          </div>

        }

      </div>

    </div >
  );
}

export default connect(mapStateToProps)(Find);