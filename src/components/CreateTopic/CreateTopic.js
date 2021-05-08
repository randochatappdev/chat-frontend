import './CreateTopic.css';
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

import { DropzoneArea } from 'material-ui-dropzone';
import socket from '../../socket';

function mapStateToProps(state) {
    const { currentUser } = state;
    const { jwt } = state;
    const { selectedUser } = state;
    const { users } = state;
    return { currentUser, jwt, selectedUser, users };
}

function CreateTopic(props) {
    const initialValues = {
        topicName: "",
        description: "",
    };

    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState(initialValues);
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


    async function handleConfirm() {

        const data = {
            name: values.topicName,
            description: values.description
        }
        const response = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/api/topic', {
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
    };


    return (
        <div className="create-topic-container">

            <h1 className="header">Create Topic</h1>

            <form className="form" noValidate autoComplete="off">
                <TextField className="text" id="outlined-basic" label="Name" variant="outlined" name="topicName" onChange={handleInputChange} value={values.roomName}></TextField>
                <TextField className="text" id="outlines-basic" label="Description" variant="outlined" name="description" onChange={handleInputChange} value={values.description}></TextField>
                <Button className="button" onClick={handleClickOpen} variant="contained" color="primary">Create Topic</Button>


            </form>





            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{`Create ${values.topicName} topic?`}</DialogTitle>
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
export default connect(mapStateToProps)(CreateTopic);