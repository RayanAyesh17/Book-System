import BookPage from './BookPages/BookPage';
import BookDetails from './BookPages/BookDetails';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import About from './About/About';
import Home from './Home/Home';
import Footer from './Footer/Footer';
import UserProfile from './UserProfile/UserProfile';
import BookChat from './BookLoverChat/BookLoverChat';
import { auth, signOut } from './firebase';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Navbar, Nav, Container } from 'react-bootstrap';
import Bookshelf from './BookShelf/BookShelf';

export default function App() {
  
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
      window.location.href = '/';  
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const [completedBooks, setCompletedBooks] = useState([]);
  const [currentlyReading, setCurrentlyReading] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const moveToCompleted = (book) => {
    setCurrentlyReading(prev => prev.filter(b => b.id !== book.id)); 
    setCompletedBooks(prev => [...prev, book]); 
  };
  
  const moveToReading = (book) => {
    setWishlist(prev => prev.filter(b => b.id !== book.id)); 
    setCurrentlyReading(prev => [...prev, book]); 
  };
  


  const addToBookshelf = (book, status) => {
    setCompletedBooks(prev => prev.filter(b => b.id !== book.id));
    setCurrentlyReading(prev => prev.filter(b => b.id !== book.id));
    setWishlist(prev => prev.filter(b => b.id !== book.id));
  
    if (status === 'completed') {
      setCompletedBooks(prev => [...prev, book]);
    } else if (status === 'reading') {
      setCurrentlyReading(prev => [...prev, book]);
    } else if (status === 'wishlist') {
      setWishlist(prev => [...prev, book]);
    }
  };

  return (
    <Router>
      <Navbar expand="lg" bg="white" className="shadow-sm Navbar">
        <Container className='yesin'>
          <Navbar.Brand as={Link} to="/" className="nav-img">
            <img src="../../images/Logo.png" width="100px" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center Nav-links">
              <Nav.Link as={Link} to="/about" className="me-3 navoa">About</Nav.Link>

              {isAuthenticated && (
                <>
                  <Nav.Link as={Link} to="/library" className="me-3 navoa">Library</Nav.Link>
                  <Nav.Link as={Link} to="/chatapp" className="me-3 navoa">ChatApp</Nav.Link>
                </>
              )}

              {!isAuthenticated ? (
                <Nav.Link as={Link} to="/login" className="me-3 navoa">Login</Nav.Link>
              ) : (
                <Dropdown className="Nav-links">
                  <Dropdown.Toggle variant="link" id="dropdown-custom-components">
                    <img
                      src={user?.photoURL || '../../images/default.jpg'}
                      alt="Profile"
                      className="profile-img"
                      width="50px"
                      height="50px"
                      style={{ cursor: 'pointer', borderRadius: '50%' }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="drop">
                    <Dropdown.Item className="dropitem" as={Link} to="/UserProfile">Profile settings</Dropdown.Item>
                    <Dropdown.Item className="dropitem" as={Link} to="/bookshelf">Your Bookshelf</Dropdown.Item>
                    <Dropdown.Item className="dropitem" as="button" onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/library" element={isAuthenticated ? <BookPage /> : <Login />} />
        <Route path="/library/:id" element={isAuthenticated ? <BookDetails addToBookshelf={addToBookshelf} /> : <Login />} />
        <Route path="/UserProfile" element={isAuthenticated ? <UserProfile user={user} /> : <Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/chatapp" element={isAuthenticated ? <BookChat /> : <Login />} />
        <Route path="/bookshelf" element={isAuthenticated ? <Bookshelf  
         completedBooks={completedBooks}
         currentlyReading={currentlyReading}
         wishlist={wishlist}
         onMoveToCompleted={moveToCompleted}
         onMoveToReading={moveToReading}
        /> : <Login />} />
      </Routes>
      <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </Router>
  );
}
