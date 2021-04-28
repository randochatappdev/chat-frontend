import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.css';
import React from 'react';
import Hello from '../Hello/Hello';
import Homescreen from "../Homescreen/Homescreen"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { connect } from "react-redux";

import socket from '../../socket';
import actions from '../../actions';


function mapStateToProps(state) {
    const { currentUser } = state;
    const { jwt } = state;
    return { currentUser, jwt }
}


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoggedIn: false,
            token: "",
            logInError: false,
            props: props
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);

    }




    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }

    handleSubmission(event) {
        const data = { alias: this.state.email, password: this.state.password };
        console.log(this.state.email, this.state.password)



        async function postData() {

            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'

                }
            });
            try {
                return response.json();

            } catch (error) {
                console.log(error)
            }
        }






        return postData().then(data => {
            console.log(data)
            return data;
        }
        ).then(data => {
            if (data.status === "Success") {
                this.setState({ isLoggedIn: true, token: data.jwt });
                let localStorage = window.localStorage;
                localStorage.setItem('jwt', data.jwt)

                this.props.dispatch(actions.SET_JWT(data));



                // Connect to socket.io
                let alias = this.props.jwt.alias;
                let sessionToken = this.props.jwt.jwt.slice(7);
                console.log(sessionToken, alias)
                socket.auth = { sessionToken, alias }
                console.log("token", socket.auth.sessionToken)
                //socket.auth = { alias };
                socket.connect();


                return { message: "Success" }

            }
            else {
                this.setState({ logInError: data })
                return { message: "Failure" }
            }
        })



    }



    async fetchCurrentUser() {
        const response = await fetch('http://localhost:4000/api/user', {
            method: 'GET',
            headers: {
                'Authorization': this.state.token
            }

        });
        try {
            return response.json();

        } catch (error) {
            console.log(error)
        }
    }


    render() {


        if (!this.state.isLoggedIn) {

            return (
                <div className="login-container">
                    <h1 className="logo">rando</h1>
                    <form autoComplete="off">

                        <div className="text-fields">
                            <TextField id="outlined-basic" label="Email" variant="outlined" className="text-field" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            <TextField id="outlined-basic" type="password" label="Password" variant="outlined" className="text-field" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>

                        <div className="buttons">

                            <LoginButton token={this.state.token} handleSubmission={this.handleSubmission}></LoginButton>

                            <p>OR</p>
                            <Button variant="outlined" color="secondary" className="button">
                                Register</Button>
                        </div>


                    </form>
                </div>
            )
        }

        else {
            return (

                <Homescreen />
            )


        }


    }
}

function LoginButton(props) {
    let history = useHistory();

    function handleLinkClick() {
        props.handleSubmission().
            then((data) => {
                console.log(data)
                if (data.message == "Success") {
                    history.push('/home')
                    return
                }
            })


    }

    return (
        <Link>
            <Button variant="contained" color="primary" className="button" onClick={handleLinkClick}>
                Login

            </Button>
        </Link>
    );
}




export default connect(mapStateToProps)(Login);