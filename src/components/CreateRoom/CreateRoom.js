import './CreateRoom.css';
import React, { Component, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import actions from '../../actions';

import { DropzoneArea } from 'material-ui-dropzone';
import socket from '../../socket';

function mapStateToProps(state) {
    const { currentUser } = state;
    const { jwt } = state;
    const { selectedUser } = state;
    const { users } = state;
    return { currentUser, jwt, selectedUser, users };
}

function CreateRoom(props) {
    const initialValues = {
        roomName: "",
        description: "",
        searchInput: ""
    };

    useEffect(() => {
        if (props.currentUser && !didFetch) {
            fetchTopics();
            filterTopicsOnSearch(values.searchInput);
            console.log(values.searchInput);

        }

    })

    useEffect(() => {
        props.dispatch(actions.SET_NAV_VIS(false))
    }, [])


    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState(initialValues);
    const [topicChipsArray, setChipData] = useState([]);
    const [topicsOnResults, setResults] = useState();
    const [allTopics, setAllTopics] = useState();
    const [didFetch, setDidFetch] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDropChange = (event) => {
        console.log(event)

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });

        if (event.target.name === "searchInput") {
            filterTopicsOnSearch(event.target.value);
        }
    };

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

        console.log(newData);

        // Assign all topics to state
        setAllTopics(newData);
        setDidFetch(true);
    }


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

    async function handleConfirm() {

        const data = {
            name: values.roomName,
            topic: topicChipsArray,
            participants: [props.currentUser._id],
            description: values.description,
            groupDisplayPictureLink: `https://picsum.photos/id/${Math.trunc(Math.random() * 1000)}/200`

        }
        const response = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/api/room', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('jwt')


            }
        });
        try {
            const formattedData = await response.json();
            if (formattedData.status === "Success") {
                return formattedData.status;
            }


        } catch (error) {
            return { status: "Error" }
        }

    }


    return (
        <div className="create-room-container">

            <h1 className="header">Create Room</h1>

            <form className="form" noValidate autoComplete="off">
                {/*<DropzoneArea className="drop" onChange={handleDropChange} filesLimit="1" dropzoneText="Press this area to select Room display picture." useChipsForPreview="true" /> */}
                <TextField className="text" id="outlined-basic" label="Name" variant="outlined" name="roomName" onChange={handleInputChange} value={values.roomName}></TextField>
                <TextField className="text" id="outlines-basic" label="Description" variant="outlined" name="description" onChange={handleInputChange} value={values.description}></TextField>

                <TextField label="Search" variant="outlined" value={values.searchInput} onChange={handleInputChange} name="searchInput" className="topic-search-cr" />
                <Paper className='papers' elevation={3}>
                    {props.currentUser && topicChipsArray &&
                        topicChipsArray.map(topic => (
                            <Chip label={topic.name} onDelete={(e) => handleDelete(e, topic)}>  </Chip>
                        ))
                    }

                </Paper>
                <Paper className='papers' elevation={3} className="topic-list-cr">
                    <List>
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

                <Button className="button" onClick={handleClickOpen} variant="contained" color="primary">Create Room</Button>




            </form>








            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Create ${values.roomName} room?`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Confirming will create a new room with you as the administrator.
</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        CANCEL
</Button>
                    <ConfirmButton handleConfirm={handleConfirm} />
                </DialogActions>
            </Dialog>




        </div >
    )

}

function ConfirmButton(props) {
    let history = useHistory();

    function handleClick() {
        props.handleConfirm().
            then((data) => {
                console.log(data)
                if (data == "Success") {
                    history.push('/home')
                    window.location.reload();
                    return
                }
            })



    }

    return (
        <Button onClick={handleClick} color="primary" autoFocus>
            CONFIRM
        </Button>
    )
}
export default connect(mapStateToProps)(CreateRoom);