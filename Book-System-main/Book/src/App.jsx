import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile/UserProfile';
import BookLoverChat from './BookLoverChat/BookLoverChat';
import BookPage from './BookPages/BookPage';
import BookDetails from './BookPages/BookDetails';


const App = () => {
    return (
        <Router>
            <div>
                
                <UserProfile />
                <BookLoverChat />

                <Routes>
                    <Route path="/" element={<BookPage />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;