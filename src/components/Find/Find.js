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
import BackIcon from '@material-ui/icons/ArrowBackIos'
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
    console.log(props.currentUser)
    console.log(props.currentUser.preferredTopics)
    console.log(props.topics)

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
    const data = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/topics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      },
    });

    const newData = await data.json();
    console.log(newData)



    // Use Array filter to filter topics
    console.log(props.currentUser.preferredTopics)
    const topics = newData.filter((topic, index) => props.currentUser.preferredTopics.includes(topic._id));
    newData.forEach((topic, index) => {
      console.log(topic._id,)
    })
    console.log("prefinal", topics)

    fetchRooms().then((rooms) => {
      topics.forEach((topic, topicIndex) => {
        rooms.forEach((room, roomIndex) => {
          if (!topic.rooms) {
            topic.rooms = [];

          }
          console.log(room.topic)
          console.log(topic._id)
          if (room.topic.includes(topic._id)) {
            console.log("Wow")
            console.log(room)
            let newTopic = { ...topic }
            newTopic.rooms.push(room);
            console.log(newTopic)
            topics[topicIndex] = newTopic;
          }



        })
      })
      console.log("final", topics);
      props.dispatch(actions.POPULATE_TOPICS(topics))


    });

  }

  // Returns all rooms from DB
  async function fetchRooms() {
    const data = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/retrieveRoom', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      },
    });

    const newData = await data.json();
    console.log(newData)
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




        {props.topics &&
          props.topics.map(topic => (
            <div key={topic._id}>
              {topic.rooms && topic.rooms[0] && topic.rooms.length >= 1 &&

                <h3>{topic.name.toUpperCase()}</h3>

              }

              <List component="nav" aria-label="">
                {topic.rooms &&

                  topic.rooms.map(room => (
                    console.log(room),
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

        }

      </div>

    </div >
  );
}

export default connect(mapStateToProps)(Find);