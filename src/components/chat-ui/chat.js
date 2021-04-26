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
import { DropzoneDialog } from 'material-ui-dropzone';
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({

    textField: {
        width: '65vw',
    },
}));




function Chat() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    return (

        <div className="chat-wrapper">
            <div className="chat-name">
                <ArrowBackIosIcon className="back-icon" />
                <AccountCircleIcon className="avatar-icon" />
                <h2>Henry VIII</h2>
                <SettingsIcon className="setting-icon" />
            </div>

            <span className="helo">
                <p className="send">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <p className="reply">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <p className="send">Well, you're right hahaha</p>
                <p className="reply">Here, another one hahahah</p>
                <p className="send">Now, that's a weird one</p>
            </span>

            <div className="chat-text">
                <CallIcon className="call-icons" />

                <div>
                <AttachFileIcon className="attach-icons" onClick={() => setOpen(true)} />
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
                </div>

                <form>
                    <TextField className={clsx(classes.textField)} id="outlined-basic" label="Type your message here" variant="outlined" />
                </form>
                <SendIcon className="send-icons" />
            </div>
        </div>
        
    )
}


export default Chat;