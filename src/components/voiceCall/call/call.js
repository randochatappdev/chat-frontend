import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicOffIcon from '@material-ui/icons/MicOff';
import './call.css';

function Call() {
    return (
        
        <div className="wrapper">
            <h1>Call ui</h1>
                <div className="icon">
                    <AccountCircleIcon className="icon"/>
                    <h2>Henry VIII</h2>
                </div>

                <div className="mid-content">
                    <h1>Connected</h1>
                    <p>07:24</p>
                </div>
    
       

                <div className="bot-content">
                    <CallEndIcon className="end"/>
                    <MicOffIcon className="off"/>
                    </div>
                
        </div>
    )
  }


  export default Call;
