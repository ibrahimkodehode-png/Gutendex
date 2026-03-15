import { useEffect, useState } from "react";
import { getFavorites } from "../utils/favorites";
import BookCard from "../components/BookCard";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  return (
    <section className="page-section">
      <div className="page-heading">
        <h2>Favorittbøker</h2>
        <p>Bøker du har lagret lokalt i nettleseren.</p>
      </div>

      {favorites.length === 0 ? (
        <p className="status-message">Du har ingen favoritter ennå.</p>
      ) : (
        <div className="book-grid">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesPage;
