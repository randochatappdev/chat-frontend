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

        const newUsers = [...props.users];
        const findUser = (user) => user.userID === props.selectedUser.userID
        const newUserIndex = newUsers.findIndex(findUser);
        return newUserIndex;

    }
    function onMessage(event) {
        event.preventDefault();
        console.log(textInput)
        if (props.selectedUser) {
            socket.emit("private message", {
                content: textInput,
                to: props.selectedUser.userID,
            });
            console.log(textInput, props.selectedUser.userID)
            /*this.selectedUser.messages.push({
                content,
                fromSelf: true,
             });*/
        }

        // Part 1 Localized


        // Part 2 Use map/for to create new Array with messages (match the user id)
        const newUsers = [...props.users];
        const findUser = (user) => user.userID === props.selectedUser.userID
        const newUserIndex = newUsers.findIndex(findUser);
        const newUser = newUsers.find(user => user.userID === props.selectedUser.userID);
        //console.log(newUser)
        newUser.messages.push({ content: textInput, self: true })
        newUsers[newUserIndex] = newUser;
        setIndex(newUserIndex);


        props.dispatch(actions.POPULATE_USERS(newUsers))
    }


    const classes = useStyles();
    console.log(props.users)
    console.log(props.users[userIndex].messages)

    return (

        <div className="chat-wrapper">
            <div className="chat-name">
                <ArrowBackIosIcon className="back-icon" />
                <AccountCircleIcon className="avatar-icon" />
                <h2>{props.selectedUser.alias}</h2>
                <SettingsIcon className="setting-icon" />
            </div>



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
                <SendIcon className="send-icons" />
            </div>

        </div>
    )
}


export default connect(mapStateToProps)(Chat);