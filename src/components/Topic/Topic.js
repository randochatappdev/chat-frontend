import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { users, topics, rooms, messages } from '../../sample-data';
import './topic.css';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';

function mapStateToProps(state) {
  const { currentUser } = state;
  const { jwt } = state;
  const { selectedUser } = state;
  const { users } = state;
  return { currentUser, jwt, selectedUser, users };
}


function Topic(props) {
  const [topicChipsArray, setChipData] = useState();
  const [allTopics, setAllTopics] = useState();
  const [inputValue, setInputValue] = useState('');
  const [topicsOnResults, setResults] = useState();
  const [didFetch, setDidFetch] = useState(false);

  useEffect(() => {
    if (props.currentUser && !didFetch) {
      fetchTopics();
      filterTopicsOnSearch(inputValue);

    }

    console.log(inputValue)
  })

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


  // Search query change handler
  async function handleInputChange(event) {
    setInputValue(event.target.value);
    console.log(event.target.value)
    filterTopicsOnSearch(event.target.value);
  }



  async function fetchTopics() {
    const data = await fetch('http://localhost:4000/topics', {
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





  return (
    <div className='containers'>
      <h1>Rando</h1>
      <TextField label="serch for topics" variant="outlined" value={inputValue} onChange={handleInputChange} />
      <Paper className='papers' elevation={3}>
        {props.currentUser && topicChipsArray &&
          topicChipsArray.map(topic => (
            <Chip label={topic.name}>  </Chip>
          ))
        }

      </Paper>
      <List>
        {topicsOnResults &&
          topicsOnResults.map((topic) => (
            <ListItem key={topic._id}>
              <ListItemText primary={topic.name}></ListItemText>
            </ListItem>
          ))}
      </List>
    </div>
  )
}
export default connect(mapStateToProps)(Topic);