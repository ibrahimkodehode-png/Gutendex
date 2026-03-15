import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

const categories = [
  "Fiction",
  "Mystery",
  "Thriller",
  "Romance",
  "Fantasy",
  "Morality",
  "Society",
  "Power",
  "Justice",
  "Adventure",
  "Tragedy",
  "War",
  "Philosophy",
];

function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      navigate("/");
      return;
    }

    navigate(`/?search=${encodeURIComponent(trimmedValue)}`);
  }

  return (
    <header className="site-header">
      <div className="header-top">
        <NavLink to="/" className="brand">
          <span className="brand-mark">G</span>
          <div>
            <h1>Gutendex Library</h1>
            <p>Utforsk klassiske bøker</p>
          </div>
        </NavLink>

        <form className="search-bar" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Søk etter boktittel..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button type="submit">Søk</button>
        </form>
      </div>

      <nav className="header-nav">
        <div className="category-links">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? "nav-pill active" : "nav-pill"
              }
            >
              {category}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive ? "favorites-link active" : "favorites-link"
          }
        >
          Favoritter
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
