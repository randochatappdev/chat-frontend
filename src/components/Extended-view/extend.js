import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';

import './extend.css';

function Extend() {
    return (
        
        <div className="extend-wrapper">
                <div className="extend-icon">
                <ArrowBackIosIcon className="icon"/>
                    <h2>French Fries</h2>
                </div>

                <div className="extend-mid">
                    <AccountBoxIcon className="mid-icon"/>
                    <h1>Windows Phone Bashers</h1>
                </div>
                <div className="extend-mids">
                    <AccountBoxIcon className="mid-icon"/>
                    <h1>Windows Phone Bashers</h1>
                </div>
                <div className="extend-mids">
                    <AccountBoxIcon className="mid-icon"/>
                    <h1>Windows Phone Bashers</h1>
                </div>
                <div className="extend-mids">
                    <AccountBoxIcon className="mid-icon"/>
                    <h1>Windows Phone Bashers</h1>
                </div>
                <div className="extend-mids">
                    <AccountBoxIcon className="mid-icon"/>
                    <h1>Windows Phone Bashers</h1>
                </div>

                <div className="extend-room">
                    <div className="extend-bottom">
                    <FavoriteIcon className="bottom-icon"/>
                    <p>Room</p>
                    </div>

                    <div className="extend-bottom">
                    <SearchIcon className="bottom-icon"/>
                    <p>Room Find</p>
                    </div>
                    
                    <div className="extend-bottom">
                    <SettingsIcon className="bottom-icon"/>
                    <p>Settings</p>
                    </div>
                </div>
                
        </div>
    )
  }


  export default Extend;
