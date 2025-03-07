import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./BookLoverChat.css";

const firebaseConfig = {
  apiKey: "AIzaSyBSFX1S6z_jQSj_gUO9iNGqdRQFkLvUTW0",
  authDomain: "booksystem-47cca.firebaseapp.com",
  projectId: "booksystem-47cca",
  storageBucket: "booksystem-47cca.firebasestorage.app",
  messagingSenderId: "904473865953",
  appId: "1:904473865953:web:b34ad94175d0437f9a51a0",
  measurementId: "G-73KRKXZQ8N",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const BookChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [username, setUsername] = useState("User" + Math.floor(Math.random() * 1000));
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        user: username,
        timestamp: new Date(),
      });
      setNewMessage("");
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`chat-container ${isDarkMode ? "dark" : "light"}`}>
      <div className="chat-card">
        <h1 className="chat-title">
          Book Chat
          <img src="/Images/Book.png" alt="Book Chat Logo" className="chat-logo" />
        </h1>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.user === username ? "chat-bubble-user" : "chat-bubble-other"}`}
            >
              <strong>{msg.user}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-message-input"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="chat-send-button" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default BookChat;
