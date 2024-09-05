import { io } from "socket.io-client";

// Initialize the socket connection
const socket = io("http://localhost:3000",
    {
        transports: ['websocket'],
        upgrade: false
    }
); // Replace with your backend URL

socket.on("connect", () => {
    

    console.log("Connected to the server");
});
// Export the socket instance to use it in other components
export default socket;
