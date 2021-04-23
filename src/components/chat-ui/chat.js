import TextField from '@material-ui/core/TextField';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import CallIcon from '@material-ui/icons/Call';
import SendIcon from '@material-ui/icons/Send';
import './chat.css';



function Chat() {
    return (
        
        <div className="chat-wrapper">
                <div className="chat-name">
                    <ArrowBackIosIcon className="up-icon"/>
                    <AccountCircleIcon className="up-icon"/>
                    <h2>Henry VIII</h2>
                    <SettingsIcon className="up-icon"/>
                </div>

                <span className="helo">
                    <p className="send">That's dope haha Only by cutting off the connection would she be able to free herself from the beckoning of the Chaos Abyss.Only by cutting off the connection would she be able to free herself from the beckoning of the Chaos Abyss.</p>
                    <p className="reply">Nope. That's weird Only by cutting off the connection would she be able to free herself from the beckoning of the Chaos Abyss.Only by cutting off the connection would she be able to free herself from the beckoning of the Chaos Abyss.</p>
                    <p className="send">Well, you're right hahaha</p>
                    <p className="reply">Here, another one hahahah</p>
                    <p className="send">Now, that's a weird one</p>
                </span>
                
                <div className="chat-text">
                    <CallIcon className="call-icons"/>
                    <form>
                    <TextField id="outlined-basic" label="Type your message here" variant="outlined" />
                    </form>
                    <SendIcon className="send-icons"/>
                    </div>
                
        </div>
    )
  }


  export default Chat;
