import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';

import './end.css';

function End() {
    return (
        
        <div className="wrapper">
            <h1>EndCall ui</h1>
                <div className="icon">
                    <AccountCircleIcon className="icon"/>
                    <h2>Henry VIII</h2>
                </div>

                <div className="mid-content">
                    <h1>The Call has ended</h1>
                    <p>07:24</p>
                </div>

                <div className="end-off">
                <Button variant="contained" color="primary">GO TO ROOM</Button>
                    </div>
                
        </div>
    )
  }


  export default End;
