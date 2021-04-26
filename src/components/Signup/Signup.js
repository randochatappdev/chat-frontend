import React from 'react';
import TextField from '@material-ui/core/TextField';
import './signup.css';

const currencies = [
    {
      value: '1',
      label: 'Male',
    },
    {
      value: '2',
      label: 'Female',
    },
  ];


function signup(){
    return (
        <form noValidate autoComplete="off">
        <div className='container'>
            <h1>rando</h1>
            <h2>Signup for an account</h2>
            <TextField Email
          id="outlined-Email"
          label="Email"
          defaultValue="Enter email address"
          helperText="Require"
          variant="outlined"
        />
         <TextField Alias
          id="outlined-Alias"
          label="Alisa"
          defaultValue="Enter an alias"
          helperText="Require"
          variant="outlined"
        />
            <TextField Password
          id="outlined-password-input"
          label="Password"
          type="password"
          defaultValue="Enter Password"
          autoComplete="current-password"
          helperText="Require"
          variant="outlined"
        />
        <TextField
          id="outlined-select-Gender"
          select
          label="Gender"
          value={currencies}
          SelectProps={{
            native: true,
          }}
          helperText="Require"  
          variant="outlined"
        >
           <option aria-label="" value="" />
          <option value={1}>Male</option>
          <option value={2}>Female</option>

          ))
        </TextField>
        </div>
    </form>
    )
}
export default signup;