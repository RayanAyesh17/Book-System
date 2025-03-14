import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import About from './About/About';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import UserProfile from './UserProfile/UserProfile';
import BookChat from './BookLoverChat/BookLoverChat';
import Library from './Library/Library';
import { auth, signOut } from './firebase';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Navbar, Nav, Container } from 'react-bootstrap';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setIsAuthenticated(!!currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
      navigate('/');
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <Router>
      <Navbar expand="lg" bg="white" className="shadow-sm Navbar">
        <Container>
          <Navbar.Brand as={Link} to="/Home" className='nav-img'>
            <img src="../../images/Logo.png" width="100px" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center Nav-links">
              <Nav.Link as={Link} to="/about" className="me-3 navoa">About</Nav.Link>

              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/Library" className="me-3 navoa">Library</Nav.Link>
                  <Nav.Link as={Link} to="/ChatApp" className="me-3 navoa">ChatApp</Nav.Link>
                </>
              )}

              {!isAuthenticated ? (
                <Nav.Link as={Link} to="/" className="me-3 navoa">Login</Nav.Link>
              ) : (
                <Dropdown className='Nav-links'>
                  <Dropdown.Toggle variant="link" id="dropdown-custom-components" >
                    <img
                      src={user?.photoURL || '../../images/default.jpg'}
                      alt="Profile"
                      className="profile-img"
                      width="50px"
                      height="50px"
                      style={{ cursor: 'pointer', borderRadius: '50%' }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className='drop'> 
                    <Dropdown.Item className='dropitem' as={Link} to="/UserProfile" >Profile settings</Dropdown.Item>
                    <Dropdown.Item className='dropitem' as="button" onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/library" element={isAuthenticated ? <Library /> : <Login />} />
        <Route path="/UserProfile" element={isAuthenticated ? <UserProfile user={user} /> : <Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChatApp" element={isAuthenticated ? <BookChat /> : <Login />} />
      </Routes>

      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
}
