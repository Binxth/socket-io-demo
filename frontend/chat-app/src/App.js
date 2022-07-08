import "./App.css";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

//no dotenv
const socket = io("http://localhost:3001", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (data) => {
      setChat([...chat, data]);
    });
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Socket.io Chat</h1>

        {chat.map((item, index) => {
          return (
            <p style={{ margin: "0px 0px 10px 0px" }}>
              <b>{item.message}</b> :  {item.userName}
            </p>
          );
        })}

        <form onSubmit={sendChat}>
          <input
            type="text"
            placeholder="Enter message :D"
            name={chat}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
