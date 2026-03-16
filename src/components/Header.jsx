import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";

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
    </header>
  );
}

export default Header;
