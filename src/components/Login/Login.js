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
import { TimerSharp } from '@material-ui/icons';


function mapStateToProps(state) {
    const { currentUser } = state;
    const { jwt } = state;
    const { rooms } = state;
    const { users } = state
    return { currentUser, jwt, rooms, users }
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

    componentDidMount() {
        this.props.dispatch(actions.SET_NAV_VIS(false));
    }




    handleInputChange(event) {
        const name = event.target.name;
        this.setState({
            [name]: event.target.value
        })

    }

    async handleSubmission(event) {
        const data = { alias: this.state.email, password: this.state.password };
        console.log(this.state.email, this.state.password)





        async function postData() {

            const response = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/login', {
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






        const resData = await postData();

        if (resData.status === "Success") {
            this.setState({ isLoggedIn: true, token: resData.jwt });
            let localStorage = window.localStorage;
            localStorage.setItem('jwt', resData.jwt)

            this.props.dispatch(actions.SET_JWT(resData));

            const currentUserData = await this.fetchCurrentUser()
            console.log(currentUserData)

            this.props.dispatch(actions.SET_USER(currentUserData[0]))






            // Connect to socket.io
            let alias = this.props.jwt.alias;
            let session = this.props.jwt.jwt.slice(7);
            console.log(session, alias)
            socket.auth = { session, alias }
            console.log("token", socket.auth.session)
            //socket.auth = { alias };
            socket.connect();

            this.fetchUsers()


            return { message: "Success" }

        }
        else {
            this.setState({ logInError: data })
            return { message: "Failure" }
        }




    }

    async fetchUsers() {
        const usersData = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/retrieveRoom', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('jwt')


            }
        });

        const roomsData = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/api/rooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('jwt')


            }
        });

        try {
            const newData = await usersData.json();
            const newRoomsData = await roomsData.json();


            // Create shallow copy of data
            const newRooms = [...newData];
            //console.log(newRooms)

            // Attach a message property to each room
            newRooms.forEach((room) => {
                room.messages = [];
            })

            console.log(newRooms)
            console.log(newRoomsData)

            this.props.dispatch(actions.POPULATE_USERS(newRooms))
            //console.log(this.props.users)

            // Filter rooms to participated rooms only
            const participatedRooms = [];

            newRooms.forEach((room) => {
                newRoomsData.forEach((partRoom) => {
                    if (room._id === partRoom._id) {
                        participatedRooms.push(room)
                    }
                })
            })

            // Update rooms state
            this.props.dispatch(actions.POPULATE_ROOMS(participatedRooms));
            console.log("part", this.props.rooms)



            socket.emit('join-rooms', newRooms)


        } catch (error) {
            console.error(error)
        }
    }



    async fetchCurrentUser() {
        const response = await fetch('http://ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000/api/user', {
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
                            <TextField id="outlined-basic" label="Alias" variant="outlined" className="text-field" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            <TextField id="outlined-basic" type="password" label="Password" variant="outlined" className="text-field" name="password" value={this.state.password} onChange={this.handleInputChange} />
                        </div>

                        <div className="login-buttons">

                            <LoginButton token={this.state.token} handleSubmission={this.handleSubmission}></LoginButton>

                            <p>OR</p>
                            <Button variant="outlined" color="secondary" className="button" component={Link} to="/register">
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

        <Button variant="contained" color="primary" className="button" onClick={handleLinkClick}>
            Login

        </Button>

    );
}




export default connect(mapStateToProps)(Login);