import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookPage.css'

// Import your images
import redQueenImage from './images/Red queen.jpg'
import nightSlayerImage from './images/night.jpg'
import primaryThreatImage from './images/primary.jpg';
import dragonRunImage from './images/Dragon.jpg';
import theRitualImage from './images/The ritual.jpg';
import skeletonCrewImage from './images/Skeleton.jpg';
import lostCityImage from './images/lost city.jpg';
import theRoadImage from './images/cormac.jpg';
import treasureIslandImage from './images/treasure island.jpg';
import euphoriaImage from './images/euphoria.jpg';
import deepShadowImage from './images/Deep shadow.jpg';
import storyThievesImage from './images/Story thieves.jpg';
import healerWitchImage from './images/Healer and Witch (Paperback).jpg'; 
import snowQueenImage from './images/The Snow Queen 2 (2nd part).jpg'; 
import seasonMustUnfairImage from './images/download (8).jpg'; 

// BookCard Component
const BookCard = ({ title, author, rating, description, image, onRead }) => (
  <div className="book-card">
    <img src={image} alt={title} className="img-book" />
    <div className="element-book">
      <h3>{title}</h3>
      <p style={{ marginTop: '-13px' }}>by {author}</p>
      <p style={{ marginTop: '-13px' }}>Rating: {rating}</p>
      <button className="read-btn" onClick={onRead}>Read</button>
    </div>
  </div>
);

// PopularBooks Component
const PopularBooks = ({ onReadClick, searchTerm, selectedGenre }) => {
  const popularBooks = [
    { id: 1, title: 'Red Queen', author: 'Victoria Aveyard', rating: '★★★★☆', image: redQueenImage, description: 'In a world divided by blood—those with silver blood wielding supernatural powers and those with red blood being commoners—Mare Barrow, a Red, discovers she has a unique power of her own. She is thrust into the dangerous world of the Silver elite, where she must navigate deadly politics, rebellion, and the truth about her own abilities. As the story unfolds, Mare must decide where her loyalty lies and how to fight for her people.', genre: 'Fantasy' },
    { id: 2, title: 'Night Slayer', author: 'William Masa', rating: '★★★★★', image: nightSlayerImage, description: 'A fast-paced action-adventure story filled with thrilling battles and dangerous missions. The protagonist, a skilled fighter, battles evil forces in a dark and mysterious world where supernatural creatures and perilous challenges await at every turn. The story focuses on overcoming challenges and surviving in a brutal, hostile environment.', genre: 'Adventure' },
    { id: 3, title: 'Primary Threat', author: 'Jack Mars', rating: '★★★☆☆', image: primaryThreatImage, description: 'In this gripping thriller, a highly skilled investigator is pulled into a high-stakes situation when a deadly and dangerous threat emerges. With time running out, the investigator must use their expertise to unravel a complex conspiracy while navigating political intrigue, deception, and personal danger. As the stakes grow higher, it becomes a race against time to prevent disaster.', genre: 'Thriller' },
    { id: 4, title: 'A Season Must Unfair', author: 'Anderson Coats', rating: '★★★★☆', image: seasonMustUnfairImage, description: '"A Season Must Unfair" is a contemporary tale that explores themes of injustice, resilience, and the fight for equality. The story follows a diverse group of characters living in a society marked by systemic inequality and discrimination. Each character faces their own struggles, whether it be due to race, gender, or socioeconomic status.', genre: 'Anime' },
    { id: 5, title: 'Dragon Run', author: 'Patrick Matthews', rating: '★★★☆☆', image: dragonRunImage, description: 'In this fantasy epic, a young hero embarks on an adventurous journey to uncover ancient secrets and battle powerful forces. Set in a world where dragons and mythical creatures roam, the protagonist faces impossible odds, magical threats, and dark forces. Along the way, they must confront their fears and make difficult choices that will shape their destiny.', genre: 'Fantasy' },
    { id: 6, title: 'The Ritual', author: 'Adam Nevill', rating: '★★★★☆', image: theRitualImage, description: 'A group of friends, on a hiking trip in the remote Scandinavian wilderness, becomes trapped in an ancient and eerie forest. As they try to find their way out, they encounter terrifying supernatural forces and sinister forces that seem to be guiding them toward a dark and unknown fate. As the group tries to survive, they are forced to confront their deepest fears and darkest secrets.', genre: 'Horror' },
    { id: 7, title: 'Skeleton Crew', author: 'Stephen King', rating: '★★★★★', image: skeletonCrewImage, description: 'A collection of short stories by the master of horror, Stephen King. Each tale explores different aspects of fear, the supernatural, and the human condition. From haunted objects to eerie encounters with mysterious beings, the collection takes readers through a range of unsettling and chilling experiences. The stories in "Skeleton Crew" are as varied as they are spine-tingling.', genre: 'Horror' },
    { id: 8, title: 'Lost City', author: 'Topher Kaler', rating: '★★★☆☆', image: lostCityImage, description: 'An adventure story set in the depths of the jungle, where an intrepid explorer sets out to find the fabled Lost City, a place believed to hold untold treasures and ancient secrets. Along the way, they face deadly animals, hostile forces, and the unforgiving environment. As they uncover clues and secrets about the Lost City, the explorer learns that survival is just as important as finding the treasure.', genre: 'Adventure' },
    { id: 9, title: 'The Road', author: 'Cormac McCarthy', rating: '★★★☆☆', image: theRoadImage, description: 'A haunting and emotional post-apocalyptic tale about a father and his young son as they journey through a desolate and ruined world. The pair must navigate the remnants of society, avoiding dangerous survivors and struggling to find food, shelter, and safety. As they travel toward an uncertain future, their bond grows even more essential for survival.', genre: 'Drama' },
    { id: 10, title: 'Treasure Island', author: 'Dustin Long', rating: '★★★★☆', image: treasureIslandImage, description: 'A modern reimagining of Robert Louis Stevenson’s classic adventure novel. A young boy, Jim Hawkins, discovers a treasure map and embarks on a dangerous journey to find the buried treasure on a remote island. Along the way, he faces treacherous pirates, betrayal, and perilous challenges. This thrilling adventure story is filled with danger, excitement, and the pursuit of hidden treasure.', genre: 'Adventure' },
    { id: 11, title: 'Euphoria', author: 'Lily King', rating: '★★★★★', image: euphoriaImage, description: 'Set in the 1930s, this novel follows the life of an anthropologist named Nell who is working with a colleague, Fen, in a remote part of New Guinea. Amid their fieldwork and exploration of a fascinating culture, complex relationships and intense emotions develop between the three main characters. At its core, the novel is about love, obsession, and the delicate balance between passion and academic pursuit.', genre: 'Drama' },
    { id: 12, title: 'Deep Shadow', author: 'George Guidall', rating: '★★★☆☆', image: deepShadowImage, description: 'A gripping mystery where the protagonist, a seasoned detective, is drawn into a case that involves deep secrets, unexpected twists, and an elusive villain. As the investigation unfolds, the detective must navigate through a web of lies and uncover the truth hidden beneath the surface. The story combines suspense, intrigue, and the challenge of solving a complex crime.', genre: 'Mystery' },
    { id: 13, title: 'Story Thieves', author: 'James Riley', rating: '★★★★★', image: storyThievesImage, description: 'A magical adventure about a girl who can jump into books and bring characters to life. Together with her friend, they explore a world where anything can happen, but soon realize their meddling has dangerous consequences. This thrilling story is a blend of humor, adventure, and mystery, with surprising twists and turns.', genre: 'Fantasy' },
    { id: 14, title: 'Healer & Witch', author: 'Nancy Werlin', rating: '★★★★☆', image: healerWitchImage, description: 'In a world where magic is both revered and feared, Healer and Witch follows the story of Elara, a gifted healer with the ability to mend wounds and cure ailments using her magical powers. However, her abilities come with a heavy burden; the society she lives in is deeply suspicious of magic, associating it with dark forces and witchcraft.', genre: 'Anime' },
    { id: 15, title: 'The Snow Queen', author: 'Wizart Baz', rating: '★★★★★', image: snowQueenImage, description: 'The Snow Queen is a classic fairy tale that tells the story of Gerda, a brave young girl whose best friend, Kai, is taken by the enigmatic and powerful Snow Queen. The story begins with a magical mirror that distorts the beauty of the world, causing those who look into it to see only the ugly and the flawed. When Kai is struck by a shard of this mirror, he becomes cold and distant, eventually falling under the Snow Queen\'s spell.', genre: 'Anime' },
  ];

  const filteredBooks = popularBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre === selectedGenre : true; 
    return matchesSearch && matchesGenre;
  });

  const [visibleBooks, setVisibleBooks] = useState(4);

  const loadMoreBooks = () => {
    setVisibleBooks((prev) => prev + 4);
  };

  return (
    <div className="popular-books">
      <h2 className="h2-pop">Popular Books</h2>
      <div className="book-list">
        {filteredBooks.slice(0, visibleBooks).map((book) => (
          <div key={book.id} className="book">
            <BookCard
              title={book.title}
              author={book.author}
              rating={book.rating}
              image={book.image}
              description={book.description}
              onRead={() => onReadClick(book)}
            />
          </div>
        ))}
      </div>
      {visibleBooks < filteredBooks.length && (
        <button className="load-more" onClick={loadMoreBooks}>Load More</button>
      )}
    </div>
  );
};

// App Component
const BookPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleReadClick = (book) => {
    navigate(`/library/${book.id}`, {
      state: {
        book: { ...book }
      }
    });
  };

  return (
    <div className="app">
      <h1>Library</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSelectedGenre(e.target.value)} value={selectedGenre}>
          <option value="">All Genres</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Thriller">Thriller</option>
          <option value="Adventure">Adventure</option>
          <option value="Mystery">Mystery</option>
          <option value="Horror">Horror</option>
          <option value="Drama">Drama</option>
          <option value="Anime">Anime</option>
        </select>
      </div>
      <div className="new-releases">
        <h2>New Releases</h2>
        <div className="NewBooks">
          <BookCard
            title="Healer & Witch"
            author="Nancy Werlin"
            rating="★★★★☆"
            image={healerWitchImage}
            description="In a world where magic is both revered and feared, Healer and Witch follows the story of Elara, a gifted healer with the ability to mend wounds and cure ailments using her magical powers. However, her abilities come with a heavy burden; the society she lives in is deeply suspicious of magic, associating it with dark forces and witchcraft."
            onRead={() => handleReadClick({ id: 14, title: "Healer & Witch", author: "Nancy Werlin", description: "In a world where magic is both revered and feared, Healer and Witch follows the story of Elara, a gifted healer with the ability to mend wounds and cure ailments using her magical powers. However, her abilities come with a heavy burden; the society she lives in is deeply suspicious of magic, associating it with dark forces and witchcraft.", image: healerWitchImage })}
          />
          <BookCard
            title="The Snow Queen"
            author="Wizart Baz"
            rating="★★★★★"
            image={snowQueenImage}
            description="The Snow Queen is a classic fairy tale that tells the story of Gerda, a brave young girl whose best friend, Kai, is taken by the enigmatic and powerful Snow Queen. The story begins with a magical mirror that distorts the beauty of the world, causing those who look into it to see only the ugly and the flawed. When Kai is struck by a shard of this mirror, he becomes cold and distant, eventually falling under the Snow Queen's spell."
            onRead={() => handleReadClick({ id: 15, title: "The Snow Queen", author: "Wizart Baz", description: "The Snow Queen is a classic fairy tale that tells the story of Gerda, a brave young girl whose best friend, Kai, is taken by the enigmatic and powerful Snow Queen. The story begins with a magical mirror that distorts the beauty of the world, causing those who look into it to see only the ugly and the flawed. When Kai is struck by a shard of this mirror, he becomes cold and distant, eventually falling under the Snow Queen's spell.", image: snowQueenImage })}
          />
          <BookCard
            title="Story Thieves"
            author="James Riley"
            rating="★★★★★"
            image={storyThievesImage}
            description="A magical adventure about a girl who can jump into books and bring characters to life. Together with her friend, they explore a world where anything can happen, but soon realize their meddling has dangerous consequences. This thrilling story is a blend of humor, adventure, and mystery, with surprising twists and turns."
            onRead={() => handleReadClick({ id: 13, title: 'Story Thieves', author: 'James Riley', rating: '★★★★★', image: storyThievesImage, description: 'A magical adventure about a girl who can jump into books and bring characters to life. Together with her friend, they explore a world where anything can happen, but soon realize their meddling has dangerous consequences. This thrilling story is a blend of humor, adventure, and mystery, with surprising twists and turns.', genre: 'Fantasy' })}
          />

          <BookCard
            title="Deep Shadow"
            author="George Guidall"
            rating="★★★☆☆"
            image={deepShadowImage}
            description="A gripping mystery where the protagonist, a seasoned detective, is drawn into a case that involves deep secrets, unexpected twists, and an elusive villain. As the investigation unfolds, the detective must navigate through a web of lies and uncover the truth hidden beneath the surface. The story combines suspense, intrigue, and the challenge of solving a complex crime."
            onRead={() => handleReadClick({ id: 12, title: 'Deep Shadow', author: 'George Guidall', rating: '★★★☆☆', image: deepShadowImage, description: 'A gripping mystery where the protagonist, a seasoned detective, is drawn into a case that involves deep secrets, unexpected twists, and an elusive villain. As the investigation unfolds, the detective must navigate through a web of lies and uncover the truth hidden beneath the surface. The story combines suspense, intrigue, and the challenge of solving a complex crime.', genre: 'Mystery' })}
          />
        </div>
      </div>
      <PopularBooks onReadClick={handleReadClick} searchTerm={searchTerm} selectedGenre={selectedGenre} />
    </div>
  );
};

export default BookPage;