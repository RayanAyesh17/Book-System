import './Login.css'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("../"), 1500);
    } catch (error) {
      console.error("Login error:", error.code, error.message);

      const errorMessages = {
        "auth/user-not-found": "The email address you entered is not registered.",
        "auth/wrong-password": "The password you entered is incorrect.",
        "auth/invalid-credential": "The email or password you entered is incorrect.",
        "auth/invalid-email": "The email address format is invalid.",
        "auth/user-disabled": "This user account has been disabled.",
      };

      setErrorMessage(errorMessages[error.code] || `Login failed. Please try again. [${error.code}]`);
    }
  };

  return (
    <div className="main">
      <div className="allmain">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <div className='emails'>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="submit">
            <button type="submit">Login</button>
          </div>

          <div className="check">
            <p>Don't have an account? <a href="#" onClick={() => navigate('/SignUp')}>SignUp</a></p>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>

      <div className="imageLo">
        <img src="../../images/flowimage.png" id="imgo" alt="Flow image" />
      </div>
    </div>
  );
}
