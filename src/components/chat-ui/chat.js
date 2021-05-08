import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CallIcon from '@material-ui/icons/Call';
import SendIcon from '@material-ui/icons/Send';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import './chat.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { connect } from 'react-redux';
import socket from '../../socket';
import { useState, useEffect, useRef } from 'react';
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
    const [backIsClicked, setBackClicked] = useState(false);
    const [warningMessage, setWarningMessage] = useState(1)
    let { id } = useParams();
    let history = useHistory();

    useEffect(() => {

        scrollToBottom();

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




    })

    useEffect(() => {
        return function cleanup() {
            props.dispatch(actions.CHANGE_USER(null))

        }
    }, [backIsClicked])

    useEffect(() => {
        scrollToBottom();
        props.dispatch(actions.SET_NAV_VIS(false))
        if (props.selectedUser && props.selectedUser.messages.length < 1) {
            //console.log("Now you're in")
            fetchMessages();

        }
    }, [])

    useEffect(() => {
        if (props.selectedUser && props.selectedUser.messages.length < 1) {
            //console.log("Now you're in")
            fetchMessages();

        }
    }, [props.selectedUser])


    function handleTextInputChange(event) {
        setText(event.target.value)
    }

    function handleBack(event) {
        history.goBack();
        setBackClicked(true);
    }

    const scrollToBottom = () => {
        messagesEnd.current?.scrollIntoView({ behavior: "smooth" })

    }

    async function fetchMessages() {
        setHasFetched(true);
        //console.log("id", props.selectedUser._id)
        const data = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/api/retrieveMessage/' + props.selectedUser._id, {
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

    // Attempts to join room by sending a request to the server. Once server request succeeds, the message box appears
    async function handleJoin(event) {
        const body = { _id: id }
        const response = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/api/room', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('jwt')
            },
            body: JSON.stringify(body)
        });

        try {
            let serverResponse = await response.json();
            console.log("hello", props)
            console.log(serverResponse)
            if (serverResponse.status === "Success") {
                // Add current user to the selected room in state
                const room = { ...props.selectedUser };
                room.participants.push(props.currentUser._id);
                props.dispatch(actions.CHANGE_USER(room))

                // Add room to set of rooms to appear in the homescreen
                const newRooms = [...props.rooms];
                newRooms.push(room);
                props.dispatch(actions.POPULATE_ROOMS(newRooms));
                socket.emit('join-rooms', [props.selectedUser])
            } else {
                // Send a dialog saying join attempt failed
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Changes the message in the alert box
    function handleNo() {
        setWarningMessage(2)
    }


    const classes = useStyles();
    //console.log(props.users)
    //console.log('selected', props.selectedUser)
    //console.log(props.users.length)
    //console.log("index", userIndex)

    const [open, setOpen] = React.useState(false);
    const messagesEnd = useRef(null)

    return (

        <div className="chat-container">
            <div className="chat-wrapper">
                <div className="chat-name">
                    <ArrowBackIosIcon className="back-icon" button onClick={handleBack} />
                    {props.selectedUser &&
                        <Avatar className="avatar-icon" alt={props.selectedUser.name} src={props.selectedUser.groupDisplayPictureLink}></Avatar>
                    }

                    {props.selectedUser &&
                        <h2>{props.selectedUser.name}</h2>

                    }
                    <SettingsIcon className="setting-icon" />
                </div>






                {
                    props.selectedUser && userIndex > -1 && props.users[userIndex].messages.length > 0 && props.currentUser
                        ?
                        < span className="helo">
                            {props.users[userIndex].messages.map((message, index) => (
                                //console.log(message.content.body),
                                //console.log(message.sender, props.currentUser.alias),

                                message.sender == props.currentUser.alias
                                    ? <p className="send" key={index}>{message.content.body}</p>
                                    :
                                    <span key={index}>
                                        <p className="reply-alias">{message.sender}</p>
                                        <p className="reply" >{message.content.body}</p>
                                    </span>

                            ))}
                            <div ref={messagesEnd}></div>
                        </span>

                        :
                        < span className="helo">

                        </span>


                }




                {props.selectedUser && props.selectedUser.participants.includes(props.currentUser._id)

                    ?
                    <div>
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
                        </div>
                    </div>

                    :
                    warningMessage === 1

                        ?
                        <div className="join-room">
                            <div className="notif-join">
                                <NotificationsActiveIcon className="notif" />
                                <p>Do you want to join this room?</p>
                            </div>
                            <div className="join-button">
                                <Button variant="contained" color="secondary" onClick={handleNo}>NO</Button>
                                <Button className="join" variant="contained" color="primary" onClick={handleJoin}>YES, JOIN</Button>
                            </div>

                        </div>

                        :

                        <div className="join-room">
                            <div className="notif-join">
                                <NotificationsActiveIcon className="notif" />
                                <p>You will not be able to send messages to this room if you are not a participant.</p>
                            </div>


                        </div>


                }





            </div>
        </div>






    )
}




export default connect(mapStateToProps)(Chat);