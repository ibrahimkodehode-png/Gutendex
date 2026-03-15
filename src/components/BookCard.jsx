import { Link } from "react-router-dom";
import { getBookCover } from "../utils/api";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import { useState } from "react";

function BookCard({ book }) {
  const [favorite, setFavorite] = useState(isFavorite(book.id));

  function handleFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book);
    setFavorite(!favorite);
  }

  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-cover-wrap">
        <img src={getBookCover(book)} alt={book.title} className="book-cover" />
        <button
          className={favorite ? "favorite-btn active" : "favorite-btn"}
          onClick={handleFavoriteClick}
          aria-label="Legg til i favoritter"
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>

      <div className="book-card-body">
        <h3>{book.title}</h3>
        <p>
          <strong>Forfatter:</strong>{" "}
          {book.authors?.map((author) => author.name).join(", ") || "Ukjent"}
        </p>
        <p>
          <strong>Språk:</strong> {book.languages?.join(", ") || "Ikke oppgitt"}
        </p>
        <p>
          <strong>Nedlastinger:</strong> {book.download_count}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;
