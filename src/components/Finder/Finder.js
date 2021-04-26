import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import './finder.css';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
  function generate(element) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  
  export default function InteractiveList() {
    const classes = useStyles();
    const [dense] = React.useState(false);
    const [secondary] = React.useState(false);
  
    return (
        <div className={classes.root}>
            <h1>Topic</h1>
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
            <div className={classes.demo}>
            <List dense={dense}>
                {generate(
                    <ListItem button>
                    <ListItemAvatar>
                    <Avatar>
                    <FolderIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                    primary="Single-line item"
                    secondary={secondary ? 'Secondary text' : null}
                    />
                    </ListItem>,
                )}
            </List>
            </div>
            </Grid>
        </Grid>
        </div>
    )
}