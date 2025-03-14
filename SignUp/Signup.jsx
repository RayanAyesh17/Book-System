import './Signup.css'; 
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
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
            <input type="text" id="name" name="name" />
            
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
            
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          
          <div className="submit">
            <button type="submit">Sign up</button>
          </div>
          <div className="check">
            <p>Already have an account? <a href="#" onClick={()=>navigate('/Login')}>Log in</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
