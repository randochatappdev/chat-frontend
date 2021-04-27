import './manage.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertDialog from './pop-up/popup';




function Manage (props)  {
    return(
        <div className="container">
            
            <h1 className="header">ROOM SETTINGS</h1>
            
            <div className="list">
                <h2 className="account">ROOM PROFILE</h2>

                <p className="property-header">Participants</p>
                <p className="property-value">25</p>

                <p className="property-header">Room Alias</p>
                <p className="property-value">Gastronomic Adventures</p>

                <p className="property-header">Date Created</p>
                <p className="property-value">April 11, 2021</p>

                <p className="property-header">Topics</p>
                <p className="property-value">Food, Southeast Asian cuisine, East Asian food</p>

            </div>
           

            <div className="button">
                <Button color="primary">VIEW ALL PARTICIPANTS</Button>
                <Button onClick = {AlertDialog} color="secondary">LOGOUT</Button>
            </div>
        </div>
    )
}
export default Manage;