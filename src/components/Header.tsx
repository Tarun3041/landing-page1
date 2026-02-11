import Navbar from "./Navbar";
import "../styles/header.css";
import logo from "../assets/anvayaa.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="app-header">
      <div className="logo">
        <img
          src={logo}
          alt="Enviro × Anvayaa"
          className="h-8 w-auto object-conrin cursor-pointer"
          onClick={handleLogoClick}
          style={{cursor:"pointer"}}
        />
      </div>
      <Navbar />
    </header>
  );
}
