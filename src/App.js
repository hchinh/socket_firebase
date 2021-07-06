import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
const host = "http://localhost:3000";

function App() {
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);

    socketRef.current.on("getId", (data) => {
      setId(data);
    });

    socketRef.current.on("sendDataServer", (dataGot) => {
      setMess((oldMsgs) => [...oldMsgs, dataGot.data]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message !== null) {
      const msg = {
        content: message,
        id: id,
      };
      socketRef.current.emit("sendDataClient", msg);
      setMessage("");
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div class="box-chat">
      <div class="box-chat_message">
        {mess.map((m, index) => (
          <div
            key={index}
            className={`${
              m.id === id ? "your-message" : "other-people"
            } chat-item`}
          >
            {m.content}
          </div>
        ))}
      </div>

      <div class="send-box">
        <textarea value={message} onChange={handleChange} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

// import React, { useEffect, useState } from "react";
// import "./App.css";
// import firebase from "./firebase";

// const App = () => {
//   const [mess, setMess] = useState([]);
//   const [message, setMessage] = useState();

//   useEffect(() => {
//     firebase
//       .database()
//       .ref()
//       .on("value", (snapshot) => {
//         setMess(snapshot.val());
//       });
//   }, []);

//   const handleChange = (e) => {
//     setMessage({ message: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     firebase.database().ref().push(message);
//     setMessage({ message: "" });
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="message"
//           onChange={handleChange}
//           value={message?.message}
//         />
//         <button type="submit">Send</button>
//       </form>
//       {mess && (
//         <ul>
//           {Object.keys(mess).map((id) => (
//             <li key={id}>{mess[id].message}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
// export default App;
