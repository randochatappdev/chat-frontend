import './Settings.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


function Settings (props)  {
    return(
        <div className="container">
            
            <h1 className="header">Settings</h1>
            
            <div className="list">
                <h2 className="account">ACCOUNT</h2>

                <p className="property-header">Name</p>
                <p className="property-value">Helen Stevens</p>

                <p className="property-header">Alias</p>
                <p className="property-value">Karmachemeleon</p>

                <p className="property-header">Birthday</p>
                <p className="property-value">January 01,1991</p>

                <p className="property-header">Gender</p>
                <p className="property-value">Male</p>

            </div>
           

            <div className="button">
                <Button color="secondary">Logout</Button>
                <Button color="primary">Manage Topic Preferences</Button>
            </div>
        </div>
    )
}
export default Settings;