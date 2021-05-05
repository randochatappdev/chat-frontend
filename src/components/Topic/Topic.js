import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import { users, topics, rooms, messages } from '../../sample-data';
import './topic.css';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import actions from '../../actions';
import { makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

function mapStateToProps(state) {
  const { currentUser } = state;
  const { jwt } = state;
  const { selectedUser } = state;
  const { users } = state;
  return { currentUser, jwt, selectedUser, users };
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


function Topic(props) {
  const history = useHistory();
  const classes = useStyles();


  const [topicChipsArray, setChipData] = useState();
  const [allTopics, setAllTopics] = useState();
  const [inputValue, setInputValue] = useState('');
  const [topicsOnResults, setResults] = useState();
  const [didFetch, setDidFetch] = useState(false);
  const [savePrefSuccess, setSavePrefStatus] = useState();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  function handleBack(event) {
    history.goBack();
  }



  useEffect(() => {
    if (props.currentUser && !didFetch) {
      fetchTopics();
      filterTopicsOnSearch(inputValue);

    }

    console.log(inputValue)
  })

  useEffect(() => {
    props.dispatch(actions.SET_NAV_VIS(false))
  }, [])




  // Change search results based on search query input
  function filterTopicsOnSearch(value) {
    if (!value || value === '' || value === ' ' || value.length == 0) {
      console.log('is empty ')
      if (allTopics)
        setResults(allTopics)
    } else {
      if (allTopics) {
        const regExp = new RegExp(value, 'gi');
        let searchTopics = allTopics.filter((topic) => topic.name.match(regExp))
        setResults(searchTopics)
      }
    }
  }

  // Add new topics to topic chip array
  function handleFaveButtonClick(event, topic) {
    //console.log(topic)
    const newTopicChipsArray = [...topicChipsArray];


    let isAlreadyIncluded;
    // Check if topic to be added is already included
    newTopicChipsArray.forEach(topicIndexed => {
      if (topicIndexed._id === topic._id) {
        //console.log("Already included")
        isAlreadyIncluded = true;
      }
    })

    // Add topic to chips array
    if (!isAlreadyIncluded) {
      newTopicChipsArray.push(topic);
      setChipData(newTopicChipsArray)

    }

  }

  // Handle deleting a chip from the array
  function handleDelete(event, topic) {
    const newTopicChipArray = topicChipsArray.filter((indexedTopic) => indexedTopic._id !== topic._id)
    setChipData(newTopicChipArray);
  }


  // Search query change handler
  async function handleInputChange(event) {
    setInputValue(event.target.value);
    console.log(event.target.value)
    filterTopicsOnSearch(event.target.value);
  }



  async function fetchTopics() {
    const data = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/topics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      },
    });

    const newData = await data.json();

    // Assign all topics to state
    setAllTopics(newData);
    setDidFetch(true);


    // Use Array filter to filter topics
    const topics = newData.filter((topic, index) => props.currentUser.preferredTopics.includes(topic._id));
    setChipData(topics);

  }

  // Saves new preferences to database
  async function handleSavePref() {

    const data = { preferredTopics: topicChipsArray }
    const response = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/api/user/topics', {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': localStorage.getItem('jwt')


      }
    });
    try {
      let serverResponse = await response.json();
      setSavePrefStatus(serverResponse.status)
      if (serverResponse.status === "Success") {
        handleClick();

      }

    } catch (error) {
      console.log(error)
    }

  }





  return (
    <div className='containers'>

      <div className="topic-head">
        <IconButton onClick={handleBack} aria-label="back" size="small" className="back-find">
          <BackIcon fontSize="large" />

        </IconButton>
        <h1 className="topic-header">Topic Preferences</h1>
      </div>

      <TextField label="Search for topics" variant="outlined" value={inputValue} onChange={handleInputChange} />
      <Paper className='papers' elevation={3}>
        {props.currentUser && topicChipsArray &&
          topicChipsArray.map(topic => (
            <Chip label={topic.name} onDelete={(e) => handleDelete(e, topic)} className={classes.chip}>  </Chip>
          ))
        }

      </Paper>
      <Paper className='papers' elevation={3}>
        <List className="topic-list">
          {topicsOnResults &&
            topicsOnResults.map((topic) => (
              <ListItem key={topic._id}>
                <ListItemText primary={topic.name}></ListItemText>
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="add topic">
                    <FavoriteIcon onClick={(e) => handleFaveButtonClick(e, topic)} />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Your preferences are saved.
        </Alert>
      </Snackbar>


      <Button className="save-pref-button" color="secondary" onClick={handleSavePref}>Save Preferences</Button>


    </div >
  )
}

function Bars() {

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        Open success snackbar
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>

    </div>

  )

}
export default connect(mapStateToProps)(Topic);