import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Button from '@material-ui/core/Button';
import './join.css';

function Join() {
    return (
        
        <div className="join-wrapper">
                <div className="join-name">
                    <ArrowBackIosIcon className="up-icon"/>
                    <AccountCircleIcon className="up-icon"/>
                    <h2>Henry VIII</h2>
                    <SettingsIcon className="up-icon"/>
                </div>

                <span className="hi">
                    <p className="send">That's dope haha Only by cutting off the connection would she be able to free herself from the beckoning of the Chaos Abyss.Only by cutting off the connection would she be able to free herself from the beckoning of the Chaos Abyss.</p>
                    <p className="reply">Nope. That's weird Only by cutting off the connection would she be able to free herself from the beckoning of the Chaos Abyss.Only by cutting off the connection would she be able to free herself from the beckoning of the Chaos Abyss.</p>
                    <p className="send">Well, you're right hahaha</p>
                    <p className="reply">Here, another one hahahah</p>
                    <p className="send">Now, that's a weird one</p>
                </span>
    
       

                <div className="join-room">
                    <div className="notif-join">
                        <NotificationsActiveIcon className="notif"/>
                        <p>Do you want to join this room?</p>
                    </div>
                    <div className="button">
                    <Button variant="contained" color="secondary">NO</Button>
                    <Button className="join" variant="contained" color="primary">YES, JOIN</Button>
                    </div>

                </div>
                
        </div>
    )
  }


  export default Join;
