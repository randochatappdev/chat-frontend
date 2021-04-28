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
import { useState } from 'react';
import actions from '../../actions';
import { SettingsInputAntenna } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({

    textField: {
        width: '65vw',
    },
}));

function mapStateToProps(state) {
    const { selectedUser } = state;
    const { users } = state;
    const { rooms } = state;
    return { selectedUser, users, rooms }
}



function Chat(props) {
    const [textInput, setText] = useState("");
    const [messages, setMessages] = useState([]);
    const [userIndex, setIndex] = useState(determineIndex());

    function handleTextInputChange(event) {
        setText(event.target.value)
    }

    function determineIndex() {

        const newRooms = [...props.users];
        const findRoom = (room) => room._id === props.selectedUser._id
        const newUserIndex = newRooms.findIndex(findRoom);
        return newUserIndex;

    }

    function findUser() {
        const newRooms = [...props.users];
        //const findUser = (user) => user.userID === props.selectedUser.userID
        const newRoom = newRooms.find((user) => user.userID === props.selectedUser.userID);
        return newRoom;
    }
    function onMessage(event) {
        event.preventDefault();
        console.log(textInput)
        console.log("Sent once")

        if (props.selectedUser) {
            socket.emit("room message send", {
                content: textInput,
                to: props.selectedUser._id,

            });
            console.log("emit")
            console.log(textInput, props.selectedUser._id)
            /*this.selectedUser.messages.push({
                content,
                fromSelf: true,
             });*/
        }

        // Part 1 Localized

        // 

        // Part 2 Use map/for to create new Array with messages (match the user id)
        const newRooms = [...props.users];
        const findRoom = (room) => room._id === props.selectedUser._id;
        const newRoomIndex = newRooms.findIndex(findRoom);
        const newRoom = newRooms.find(room => room._id === props.selectedUser._id);
        //console.log(newUser)
        newRoom.messages.push({ content: textInput, self: true })
        newRooms[newRoomIndex] = newRoom;
        setIndex(newRoomIndex);


        props.dispatch(actions.POPULATE_USERS(newRooms))
        setText("");
    }


    const classes = useStyles();
    console.log(props.users)

    return (

        <div className="chat-wrapper">
            <div className="chat-name">
                <ArrowBackIosIcon className="back-icon" />
                <AccountCircleIcon className="avatar-icon" />
                <h2>{props.selectedUser.name}</h2>
                <SettingsIcon className="setting-icon" />
            </div>


            {console.log(props.users)}
            <span className="helo">
                {props.users[userIndex].messages.map((message, index) => (
                    console.log(message),
                    console.log(message.self),
                    message.self
                        ? <p className="send" key={index}>{message.content}</p>
                        : <p className="reply" key={index}>{message.content}</p>
                ))}

            </span>



            <div className="chat-text">
                <CallIcon className="call-icons" />
                <AttachFileIcon className="attach-icons" />
                <form onSubmit={onMessage}>
                    <TextField className={clsx(classes.textField)} id="outlined-basic" value={textInput} onChange={handleTextInputChange} label="Type your message here" variant="outlined" />

                </form>
                <SendIcon button className="send-icons" onClick={onMessage} />
            </div>

        </div>
    )
}


export default connect(mapStateToProps)(Chat);