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
                    <ArrowBackIosIcon />
                    <AccountCircleIcon />
                    <h2>Henry VIII</h2>
                    <SettingsIcon />
                </div>

                <div className="content">
                    <h3 class="send">That's dope haha</h3>
                    <h3 class="reply">Nope. That's weird</h3>
                    <h3 class="send">Well, you're right hahaha</h3>
                    <h3 class="reply">Here, another one</h3>
                    <h3 class="send">Now, that's a weird one</h3>

                </div>
    
       

                <div className="text">
                    <CallIcon />
                    <form noValidate autoComplete="off">
                    <TextField id="outlined" label="Type your message here" variant="outlined" />
                    </form>
                    <SendIcon />
                    </div>
                
        </div>
    )
  }


  export default Chat;
