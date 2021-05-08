import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import './signup.css';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory } from 'react-router-dom';

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


function Signup() {
  const initialValues = {
    email: "",
    alias: "",
    firstName: "",
    lastName: "",
    password: "",
    gender: ""
  }
  const [values, setValues] = useState(initialValues);
  const [open, setOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    const data = {
      alias: values.alias,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      displayPicture: `https://picsum.photos/id/${Math.trunc(Math.random() * 1000)}/200`
    }
    const response = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'

      }
    });
    try {
      const formattedData = await response.json();
      if (formattedData.status === "Success") {
        return formattedData.status;
      }


    } catch (error) {
      return { status: "Error" }
    }


  }




  return (
    <div className="signup-container">

      <form noValidate autoComplete="off" >
        <h1 className="signup-header">rando</h1>
        <h2>Signup for an account</h2>

        <TextField
          id="outlined-Alias"
          label="Enter a unique alias"
          helperText="Required"
          variant="outlined"
          name="alias"
          value={values.alias}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <TextField
          id="outlined-Alias"
          label="Enter your first name"
          helperText="Required"
          variant="outlined"
          name="firstName"
          value={values.firstName}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <TextField
          id="outlined-Alias"
          label="Enter your last name"
          helperText="Required"
          variant="outlined"
          name="lastName"
          value={values.lastName}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <TextField
          id="outlined-password-input"
          label="Enter your password"
          type="password"
          helperText="Required"
          variant="outlined"
          name="password"
          value={values.password}
          onChange={handleInputChange}
          autoComplete="off"
        />
        <TextField
          id="outlined-select-Gender"
          select
          label="Gender"
          name="gender"
          defaultValue="Unstated"
          value={values.gender}
          onChange={handleInputChange}
          SelectProps={{
            native: true,
          }}
          helperText="Required"
          variant="outlined"
        >
          <option value="Unstated">Rather not say</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          ))
        </TextField>

        <Button onClick={handleClickOpen} color="secondary">Register</Button>




        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Register account?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirm to register your account.
</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              CANCEL
</Button>
            <ConfirmButton handleConfirm={handleConfirm} />
          </DialogActions>
        </Dialog>

      </form>
    </div>

  )
}


function ConfirmButton(props) {
  let history = useHistory();

  function handleClick() {
    props.handleConfirm().
      then((data) => {
        console.log(data)
        if (data == "Success") {
          alert("Account has successfully been created.")
          history.push('/login')
          window.location.reload();
          return
        } else {
          alert("Account creation failed. Please fill out all fields or please try again in a few moments or refresh this page.")
        }
      })



  }

  return (
    <Button onClick={handleClick} color="primary" autoFocus>
      CONFIRM
    </Button>
  )
}
export default Signup;