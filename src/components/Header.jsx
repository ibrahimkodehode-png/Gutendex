import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

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
        <NavLink to="/" className="brand brand-logo-only">
          <img src="/bookz.png" alt="Book-Z logo" className="brand-logo" />
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
