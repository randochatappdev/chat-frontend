import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './login.css';
function Login() {
    return (
        <div>
            <h1>rando</h1>
            <form validate autoComplete="off">

                <TextField id="outlined-basic" label="Email" variant="outlined" />
                <TextField id="outlined-basic" label="Password" variant="outlined" />
                <Button variant="contained" color="primary">
                    Primary</Button>

            </form>
        </div>


    )
}

export default Login;