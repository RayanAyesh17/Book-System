import './Signup.css'; 
import {  useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {auth, db} from '../firebase';
import { createUserWithEmailAndPassword } from"firebase/auth";
import {collection, addDoc} from "firebase/firestore";


export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName]=useState("");
  const [username, setUsername] = useState("");
  const handleSign = async (e) => {
    e.preventDefault();
    try {
    const userCredential = await createUserWithEmailAndPassword(auth, email,password);
    await addDoc(collection(db, "Users"), { name,email });
    navigate(`../Home`);
    console.log("User registered successfully:", user);

    } catch (error) {
    console.error("Error registering:", error.message);
    }
    };
   
  return (
    <div className="main">
      <div className="image">
        <img src="../../images/flowimage.png" id="imgo" alt="Flow image" />
      </div>
      <div className="allmain">
        <form action="" method="POST">
          <h1>Create Account</h1>
          <div className="buttons">
            <button type="button">Sign up with Google</button>
            <button type="button">Sign up with Facebook</button>
          </div>
          <div className='emails'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" onChange={(e)=>setName(e.target.value)}/>
            
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
            
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" onChange={(e)=>setUsername(e.target.value)} />
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} />
          </div>
          
          <div className="submit">
            <button type="submit" onClick={handleSign}>Sign up</button>
          </div>
          <div className="check">
            <p>Already have an account? <a href="#" onClick={()=>navigate('/')}>Log in</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
