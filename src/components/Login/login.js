import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.css';
function Login() {
    return (
        <div className="login-container">
            <h1 className="logo">rando</h1>
            <form autoComplete="off">

                <div className="text-fields">
                    <TextField id="outlined-basic" label="Email" variant="outlined" className="text-field" />
                    <TextField id="outlined-basic" label="Password" variant="outlined" className="text-field" />
                </div>

                <div className="buttons">
                    <Button variant="contained" color="primary" className="button">
                        Log in</Button>

                    <p>OR</p>
                    <Button variant="outlined" color="secondary" className="button">
                        Register</Button>
                </div>


            </form>
        </div>


    )
}

export default Login;