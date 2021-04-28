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
                <ArrowBackIosIcon className="back-icon" />
                <AccountCircleIcon className="avatar-icon" />
                <h2>Henry VIII</h2>
                <SettingsIcon className="setting-icon" />
                </div>

                <span className="hi">
                    <p className="send">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p className="reply">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <p className="send">Well, you're right hahaha</p>
                    <p className="reply">Here, another one hahahah</p>
                    <p className="send">Now, that's a weird one</p>
                </span>
    
       

                <div className="join-room">
                    <div className="notif-join">
                        <NotificationsActiveIcon className="notif"/>
                        <p>Do you want to join this room?</p>
                    </div>
                    <div className="join-button">
                    <Button variant="contained" color="secondary">NO</Button>
                    <Button className="join" variant="contained" color="primary">YES, JOIN</Button>
                    </div>

                </div>
                
        </div>
    )
  }


  export default Join;
