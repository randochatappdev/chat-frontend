import './Settings.css';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { useEffect } from 'react';
import actions from '../../actions';

function mapStateToProps(state) {
    const { currentUser } = state;
    return { currentUser };
}



function Settings(props) {
    useEffect(() => {
        props.dispatch(actions.SET_NAV_VIS(true))
    }, [])

    return (
        // Show components when currentUser is fetched. Otherwise, render loading screen

        props.currentUser

            ?
            <div className="settings-container">

                <div className="settings-header">
                    <Avatar id="settings-avatar" alt={props.currentUser.alias} src={props.currentUser.displayPicture} />
                    <h1 className="settings-header-text">Settings</h1>

                </div>


                <h2 className="account">ACCOUNT</h2>

                <p className="property-header">Name</p>
                <p className="property-value">{`${props.currentUser.firstName} ${props.currentUser.lastName}`}</p>

                <p className="property-header">Alias</p>
                <p className="property-value">{props.currentUser.alias}</p>

                {/*<p className="property-header">Birthday</p>
                    <p className="property-value">{props.currentUser.</p>*/}

                <p className="property-header">Gender</p>
                <p className="property-value">{props.currentUser.gender}</p>


                <Buttons />



            </div>

            :
            <div className="loading-container">
                <CircularProgress className="loading" />
                <Buttons />
            </div>

    )
}

function Buttons(props) {
    let history = useHistory();

    function handleLogOut() {
        const localStorage = window.localStorage;

        // Remove stored data in local storage
        localStorage.removeItem('jwt');
        localStorage.removeItem('sessionToken');

        // Redirect to login page
        history.push('/login')

        // Reload page
        window.location.reload();
    }

    function handleClickTopicPref() {
        history.push('/topics/edit')

    }

    return (
        <div className="buttons">
            <Button color="secondary" onClick={handleLogOut}>Logout</Button>
            <Button color="primary" onClick={handleClickTopicPref}>Manage Topic Preferences</Button>
        </div>
    )


}
export default connect(mapStateToProps)(Settings);