import './CreateTopic.css';
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {DropzoneArea} from 'material-ui-dropzone';


function CreateRoom (props) {
    
    return (
        <div className="container">

            <h1 className="header">Create Topic</h1>

            <form className="form" noValidate autoComplete="off">
            <DropzoneArea className="drop"/>
            <TextField  className="text" id="outlined-basic" label="Name" variant="outlined"></TextField>
            <TextField  className="text"id="outlines-basic" label="Description" variant="outlined"></TextField>
            <Button className="button" variant="contained" color="primary">Create Topic</Button>
            </form>
    
        </div>
    )
   
}
export default CreateRoom;