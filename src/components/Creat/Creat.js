import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import './creat.css';


function Creat() { 
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    return (
        <form noValidate autoComplete="off">
            <div>
            <h1>Creat Topic</h1>
            <TextField 
                color="secondary"
                id="Name"
                label="Name"
                placeholder="Input Text"
                variant="filled"
                helperText="Required"
            />
            <TextField 
                color="secondary"
                id="Description"
                label="Description"
                placeholder="Input Text"
                variant="outlined"
                helperText="Required"
            />
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        CREATE TOPIC
      </Button>
     { open &&
      <Dialog open={open}
      onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <DialogContentText>
          CREATE TOPIC NAMED ""
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OKAY
        </Button>
        <Button onClick={handleClose} color="primary">
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
      }
      
            </div>
        </form>
    )
  }
  export default Creat;