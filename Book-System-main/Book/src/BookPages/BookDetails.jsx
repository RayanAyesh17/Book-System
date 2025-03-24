import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StarRating from './StarRating';  
import './BookDetails.css';

const BookDetails = () => {
  const location = useLocation();
  const { book } = location.state;  

  const [rating, setRating] = useState(book.rating); 

  const handleRatingChange = (newRating) => {
    setRating(newRating);
<<<<<<< HEAD
   
    console.log(`New Rating: ${newRating}`);
  };

=======
    console.log(`New Rating: ${newRating}`);
  };

  const handleReadNowClick = () => {
    // Open the PDF in a new tab
    window.open(book.pdfUrl, '_blank');
  };

>>>>>>> 0722b33c5e4224974ece5e0377affbda7903e0a1
  return (
    <div className="book-details">
      <div className="img-con">
        <img src={book.image} alt={book.title} className="book-cover" />
        <div>
<<<<<<< HEAD
          <button className="btn-read-now">Read Now</button>
=======
          <button className="btn-read-now" onClick={handleReadNowClick}>Read Now</button>
>>>>>>> 0722b33c5e4224974ece5e0377affbda7903e0a1
        </div>
      </div>
      
      <div className="element-detail">
        <h1 className="h1-detail">{book.title}</h1>
        <h2 className="h2-detail">by {book.author}</h2>
        <StarRating className='rate' rating={rating} onRatingChange={handleRatingChange} />
        <p className='describe-design'>{book.description}</p>
        <div className="buttons">
          <button className="btn-completed btn-book">Completed</button>
          <button className="btn-reading btn-book">Reading</button>
          <button className="btn-wishlist btn-book">Add to Wishlist</button>
        </div>
        
        <div className="ratings-review">
          <textarea placeholder="Leave a review..." className="comment-box" ></textarea>
          <button className="btn-submit-review">Submit Review</button>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default BookDetails;
=======
export default BookDetails;
>>>>>>> 0722b33c5e4224974ece5e0377affbda7903e0a1
