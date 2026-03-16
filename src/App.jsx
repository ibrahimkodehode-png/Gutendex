import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app-shell">
      <Header />

      <div className="app-layout">
        <Sidebar />

        <main className="page-content main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
