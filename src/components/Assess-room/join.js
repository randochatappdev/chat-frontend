import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Button from '@material-ui/core/Button';
import './join.css';

function Join() {
    return (
        
        <div className="wrapper">
            <h1>Join ui</h1>
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
