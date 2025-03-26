import './Login.css'; 
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react'; 
import { auth, db,facebookProvider, googleProvider  } from "..//firebase";
import { signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate("../");
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="main">
      <div className="allmain">
        <form action="" method="POST">
          <h1>Login</h1>
          <div className='emails'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="submit">
            <button type="submit" onClick={handleLogin}>Login</button>
          </div>
          <div className="check">
            <p>Don't have an account? <a href="#" onClick={() => navigate('/SignUp')}>SignUp</a></p>
          </div>
        </form>
        
      </div>
      <div className="imageLo">
        <img src="../../images/flowimage.png" id="imgo" alt="Flow image" />
      </div>
    </div>
  );
}
