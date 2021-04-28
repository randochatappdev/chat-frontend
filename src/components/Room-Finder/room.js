import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import Button from '@material-ui/core/Button';

import './room.css';



function Room() {
    return (
        
        <div className="room-wrapper">
                <div className="room-icon">
                <ArrowBackIosIcon className="icon"/>
                    <h2>Find Room</h2>
                </div>

                <div className="room-mid">
                    <h1>QUICK ACTIONS:</h1>
                    <div className="button-space">
                    <Button variant="contained" className="createButton-mid"> + create a new room </Button>
                    <Button variant="contained" className="createButton-mid"> + create a new room </Button>
                    </div>

                    <h1>STARRED:</h1>
                    <div className="midRoom-mid">
                        <AccountBoxIcon className="mid-icon"/>
                            <p>Windows Phone Bashers</p>
                    </div>
                    <div className="midRoom-mid">
                        <AccountBoxIcon className="mid-icon"/>
                            <p>Windows Phone Bashers</p>
                    </div>

                    <h1>BY TOPIC:</h1>
                    <div className="midRoom-mid">
                        <AccountBoxIcon className="mid-icon"/>
                            <p>Twerlies Fans</p>
                    </div>

                    <h1>GERMAN LANGUAGE:</h1>
                    <div className="midRoom-mid">
                        <AccountBoxIcon className="mid-icon"/>
                        <p>Ich Liebe Berlin</p>
                    </div>
                </div>

                <div className="room-room">
                    <div className="room-bottom">
                    <FavoriteIcon className="roomBottom-icon"/>
                    <p>Room</p>
                    </div>

                    <div className="room-bottom">
                    <SearchIcon className="roomBottom-icon"/>
                    <p>Room Find</p>
                    </div>
                    
                    <div className="room-bottom">
                    <SettingsIcon className="roomBottom-icon"/>
                    <p>Settings</p>
                    </div>
                </div>
                
        </div>
    )
  }


  export default Room;
