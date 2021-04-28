import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { users, topics, rooms, messages } from '../component/sample-data';
import './topic.css';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';


function Topic() {
  console.log(topics)
  return (
    <div className='containers'>
      <h1>Rando</h1>
        <TextField label="serch for topics" variant="outlined" />
        <Paper className='papers' elevation={3}>
        <Chip label="Food">  </Chip>
       </Paper>
        <List>  
        {topics.map((topic) => (
            <ListItem key={topic._id}>
              <ListItemText primary={topic.name}></ListItemText>
            </ListItem>
          ))}
        </List>
        </div>
  ) 
}
export default Topic;