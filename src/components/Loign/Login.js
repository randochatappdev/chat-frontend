import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import './login.css';

  
function Login(){
    return (
        <div className="container">
            <h1 className='head'>rando</h1> 
            <form noValidate autoComplete="off">
            <FormControl className='outline1'  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle email visibility"
                  edge="end"
                >
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <FormControl className='outline' variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                >
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
            </form>
            <div className='buttons'>
            <Button className='login' variant="contained" color="primary"> Login </Button>
            <h2>or</h2>
            <Button className='signup' variant="contained" color="primary"> Signup </Button>
            </div>

        </div>
    )
}
export default Login;