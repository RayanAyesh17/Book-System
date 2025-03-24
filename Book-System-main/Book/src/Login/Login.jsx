import './Login.css'; 
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react'; 
import { auth } from "../firebase";  // Fixed import path
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // State to display errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      navigate("/Home");  // Fixed navigation path
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError(error.message);  // Display error to user
    }
  };

  return (
    <div className="main">
      <div className="allmain">
        <form onSubmit={handleLogin}>  {/* Changed to proper form handling */}
          <h1>Login</h1>
          
          {error && <p className="error-message">{error}</p>}  {/* Show error if exists */}
          
          <div className='emails'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required  // Prevents empty submissions
            />
            
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="submit">
            <button type="submit">Login</button>  {/* Removed inline onClick */}
          </div>

          <div className="check">
            <p>Don't have an account? <Link to="/SignUp">Sign Up</Link></p>  {/* Fixed navigation */}
          </div>
        </form>
      </div>

      <div className="imageLo">
        <img src="/images/flowimage.png" id="imgo" alt="Flow image" />  {/* Fixed image path */}
      </div>
    </div>
  );
}
