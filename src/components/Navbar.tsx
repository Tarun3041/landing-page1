import { useState } from "react";
import "../styles/navbar.css";

const tabs = ["Home", "Plans", "Services", "Contact","Login"];

export default function Navbar({ activePage, setActivePage }: any) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="navbar desktop-nav">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={activePage === tab ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Mobile Hamburger */}
      <div className="mobile-nav">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {open && (
          <div className="mobile-menu">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={
                  activePage === tab ? "mobile-btn active" : "mobile-btn"
                }
                onClick={() => {
                  setActivePage(tab);
                  setOpen(false);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
