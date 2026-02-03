import Navbar from "./Navbar";
import "../styles/header.css";
import logo from "../assets/anvayaa.svg"

export default function Header({ activePage, setActivePage }: any) {
  return (
    <header className="app-header">
      <div className="logo">
        <img
            src={logo}
          alt="Enviro × Anvayaa"
          className="h-8 w-auto object-contain"
        />
      </div>

      <Navbar activePage={activePage} setActivePage={setActivePage} />
    </header>
  );
}
