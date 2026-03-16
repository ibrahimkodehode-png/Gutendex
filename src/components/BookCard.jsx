import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookCover } from "../utils/api";
import { isFavorite, toggleFavorite } from "../utils/favorites";

function BookCard({ book }) {
  const [favorite, setFavorite] = useState(isFavorite(book.id));

  useEffect(() => {
    function syncFavorites() {
      setFavorite(isFavorite(book.id));
    }

    window.addEventListener("favorites-updated", syncFavorites);
    return () => window.removeEventListener("favorites-updated", syncFavorites);
  }, [book.id]);

  function handleFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(book);
    setFavorite(isFavorite(book.id));
  }

  const authorNames =
    book.authors?.map((author) => author.name).join(", ") || "Ukjent";

  const languageNames = book.languages?.join(", ") || "Ikke oppgitt";

  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-cover-wrap">
        <img src={getBookCover(book)} alt={book.title} className="book-cover" />

        <button
          className={favorite ? "favorite-btn active" : "favorite-btn"}
          onClick={handleFavoriteClick}
          aria-label="Legg til i favoritter"
          title="Legg til i favoritter"
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>

      <div className="book-card-body">
        <h3>{book.title}</h3>
        <p>
          <strong>Forfatter:</strong> {authorNames}
        </p>
        <p>
          <strong>Språk:</strong> {languageNames}
        </p>
        <p>
          <strong>Nedlastinger:</strong> {book.download_count}
        </p>
      </div>
    </Link>
  );
}

export default BookCard;
