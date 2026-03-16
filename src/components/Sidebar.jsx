import { NavLink } from "react-router-dom";

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

function Sidebar() {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-card">
        <h2>Kategorier</h2>
        <p>Velg en sjanger for å utforske bøker.</p>

        <div className="side-category-links">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className={({ isActive }) =>
                isActive ? "nav-pill side-pill active" : "nav-pill side-pill"
              }
            >
              {category}
            </NavLink>
          ))}

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive
                ? "favorites-link side-favorites-link active"
                : "favorites-link side-favorites-link"
            }
          >
            Favoritter
          </NavLink>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
