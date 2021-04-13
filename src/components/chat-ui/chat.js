import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CallIcon from '@material-ui/icons/Call';
import SendIcon from '@material-ui/icons/Send';
import './chat.css';

function Chat() {
    return (
        
        <div className="wrapper">
            <h1>Chat ui</h1>
                <div className="name">
                    <ArrowBackIosIcon className="up-icon"/>
                    <AccountCircleIcon className="up-icon"/>
                    <h2>Henry VIII</h2>
                    <SettingsIcon className="up-icon"/>
                </div>

                <div className="content">
                    <p className="send">That's dope haha</p>
                    <p className="reply">Nope. That's weird</p>
                    <p className="send">Well, you're right hahaha</p>
                    <p className="reply">Here, another one</p>
                    <p className="send">Now, that's a weird one</p>

                </div>
    
       

                <div className="text">
                    <CallIcon className="bot-icon"/>
                    <form noValidate autoComplete="off">
                    <TextField id="outlined" label="Type your message here" variant="outlined" />
                    </form>
                    <SendIcon className="bot-icon"/>
                    </div>
                
        </div>
    )
  }


  export default Chat;
