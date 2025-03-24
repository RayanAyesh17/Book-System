import './Signup.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, facebookProvider, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  // 📌 Function to store user data in Firestore
  const saveUserData = async (user, additionalData = {}) => {
    try {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: additionalData.name || user.displayName || "No Name",
          email: user.email || "No Email",
          username: additionalData.username || user.email?.split("@")[0] || "user",
          profilePicture: additionalData.profilePicture || user.photoURL || "",
          createdAt: new Date()
        });
        console.log("✅ User data saved in Firestore");
      } else {
        console.log("🔄 User data already exists in Firestore");
      }
    } catch (error) {
      console.error("🔥 Firestore Error:", error.message);
    }
  };

  // 📌 Handle Email & Password Signup
  const handleSign = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await saveUserData(user, { name, username });

      navigate("/Home");
    } catch (error) {
      console.error("🔥 Error registering:", error.message);
    }
  };

  // 📌 Google Sign-Up
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await saveUserData(user);

      navigate("/Home");
    } catch (error) {
      console.error("🔥 Google Sign-In Error:", error.message);
    }
  };

  // 📌 Facebook Sign-Up
  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;

      await saveUserData(user, { profilePicture: user.photoURL });

      navigate("/Home");
    } catch (error) {
      console.error("🔥 Facebook Sign-In Error:", error.message);
    }
  };

  // 📌 Redirect if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/Home");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="main">
      <div className="imageop">
        <img src="../../images/flowimage.png" id="imgo" alt="Flow image" />
      </div>
      <div className="allmain">
        <form onSubmit={handleSign}>
          <h1>Create Account</h1>
          <div className="buttonsSig">
            <button type="button" onClick={handleGoogleSignIn}>Sign up with Google</button>
            <button type="button" id='facebookButton' onClick={handleFacebookSignIn}>Sign up with Facebook</button>
          </div>
          <div className='emails'>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <div className="submit">
            <button type="submit">Sign up</button>
          </div>
          <div className="check">
            <p>Already have an account? <a href="#" onClick={() => navigate('/')}>Log in</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
