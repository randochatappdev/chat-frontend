import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CallIcon from '@material-ui/icons/Call';
import SendIcon from '@material-ui/icons/Send';
import './chat.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { connect } from 'react-redux';
import socket from '../../socket';
import { useState, useEffect } from 'react';
import actions from '../../actions';
import { SettingsInputAntenna } from '@material-ui/icons';
import { useParams, useHistory } from 'react-router-dom';
import { DropzoneDialog } from 'material-ui-dropzone';
import React from "react";

const useStyles = makeStyles((theme) => ({

    textField: {
        width: '65vw',
    },
}));

function mapStateToProps(state) {
    const { selectedUser } = state;
    const { users } = state;
    const { rooms } = state;
    const { currentUser } = state;
    return { selectedUser, users, rooms, currentUser }
}



function Chat(props) {
    const [textInput, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [userIndex, setIndex] = useState(-1);
    const [hasFetched, setHasFetched] = useState(false);
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {

        //console.log(props.currentUser)
        //console.log("selected", props.selectedUser)

        // Determine if there is a selected user 
        if (!props.selectedUser || props.selectedUser == null) {
            //console.log("not selected boo")
            //console.log(props.selectedUser === null)
            if (props.users.length > 0) {
                props.dispatch(actions.CHANGE_USER(findUser()))



            }




        }

        if (props.selectedUser && !hasFetched) {
            //console.log("Now you're in")
            fetchMessages();

        }



    })

    function handleTextInputChange(event) {
        setText(event.target.value)
    }

    function handleBack(event) {
        history.goBack();
    }

    async function fetchMessages() {
        setHasFetched(true);
        //console.log("id", props.selectedUser._id)
        const data = await fetch('http://localhost:4000/api/retrieveMessage/' + props.selectedUser._id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('jwt')


            },
        });

        //try {
        const newData = await data.json();
        //console.log(newData)

        // Create shallow copy of rooms
        const rooms = [...props.users];
        const roomCopy = { ...props.selectedUser }
        //console.log(roomCopy)

        // Push each fetched message to the room's message store
        newData.forEach((message) => {
            roomCopy.messages.push(message)
        })
        rooms[userIndex] = roomCopy;
        //console.log(rooms[userIndex])

        // Set new messages to state
        props.dispatch(actions.POPULATE_USERS(rooms))



        /* } catch (err) {
             console.log(err)
         }*/
        //}
    }









    function determineIndex() {

        console.log("determining")
        const newRooms = [...props.users];
        const findRoom = (room) => room._id === props.selectedUser._id
        const newUserIndex = newRooms.findIndex(findRoom);
        return newUserIndex;

    }

    function findUser() {
        console.log(props.users)
        const newRooms = [...props.users];
        //const findUser = (user) => user.userID === id
        const newRoom = newRooms.find((user) => user._id == id);
        const findRoom = (room) => room._id === id
        const newUserIndex = newRooms.findIndex(findRoom);


        if (userIndex < 0)
            setIndex(newUserIndex)
        console.log(newRoom);
        return newRoom;
        //props.dispatch(actions.CHANGE_USER(newRoom))
    }
    function onMessage(event) {
        event.preventDefault();
        //console.log(textInput)
        console.log("Sent once")

        if (props.selectedUser) {
            socket.emit("room message", {
                content: textInput,
                to: props.selectedUser._id,

            });
            //console.log("emit")
            /*this.selectedUser.messages.push({
                content,
                fromSelf: true,
             });*/
        }

        // Part 1 Localized

        // 

        // Part 2 Use map/for to create new Array with messages (match the user id)
        const newRooms = [...props.users];
        const findRoom = (room) => room._id === id;
        const newRoomIndex = newRooms.findIndex(findRoom);
        const newRoom = newRooms.find(room => room._id === id);
        //console.log(newUser)
        newRoom.messages.push({ sender: props.currentUser.alias, content: { contentType: "String", body: textInput } })
        newRooms[newRoomIndex] = newRoom;
        setIndex(newRoomIndex);


        props.dispatch(actions.POPULATE_USERS(newRooms))
        setText("");
    }


    const classes = useStyles();
    //console.log(props.users)
    //console.log('selected', props.selectedUser)
    //console.log(props.users.length)
    //console.log("index", userIndex)

    const [open, setOpen] = React.useState(false);
    return (

        <div>
            <div className="chat-wrapper">
                <div className="chat-name">
                    <ArrowBackIosIcon className="back-icon" button onClick={handleBack} />
                    <AccountCircleIcon className="avatar-icon" />
                    {props.selectedUser &&
                        <h2>{props.selectedUser.name}</h2>

                    }
                    <SettingsIcon className="setting-icon" />
                </div>






                {
                    props.selectedUser && userIndex > -1 && props.users[userIndex].messages.length > 0 && props.currentUser &&
                    < span className="helo">
                        {props.users[userIndex].messages.map((message, index) => (
                            //console.log(message.content.body),
                            //console.log(message.sender, props.currentUser.alias),

                            message.sender == props.currentUser.alias
                                ? <p className="send" key={index}>{message.content.body}</p>
                                : <p className="reply" key={index}>{message.content.body}</p>
                        ))}

                    </span>
                }




                < div className="chat-text">
                    <CallIcon className="call-icons" />
                    <AttachFileIcon className="attach-icons" onClick={() => setOpen(true)} />

                    <form onSubmit={onMessage}>
                        <TextField className={clsx(classes.textField)} id="outlined-basic" value={textInput} onChange={handleTextInputChange} label="Type your message here" variant="outlined" />

                    </form>

                    <DropzoneDialog
                        acceptedFiles={['image/*']}
                        cancelButtonText={"cancel"}
                        submitButtonText={"submit"}
                        maxFileSize={5000000}
                        open={open}
                        onClose={() => setOpen(false)}
                        onSave={(files) => {
                            console.log('Files:', files);
                            setOpen(false);
                        }}
                        showPreviews={true}
                        showFileNamesInPreview={true}
                    />



                    <SendIcon button className="send-icons" onClick={onMessage} />


                </ div>
            </div>
        </div>






    )
}


export default connect(mapStateToProps)(Chat);