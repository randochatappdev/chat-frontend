import { io } from "socket.io-client";

const URL = "ec2-54-254-216-137.ap-southeast-1.compute.amazonaws.com:4000";
const socket = io(URL, { autoConnect: false });

socket.onAny((event, ...args) => {
    console.log(event, args);
});

export default socket;