import { useState, useEffect, useRef } from "react";
import "../styles/navbar.css";

const tabs = ["Home", "Plans", "Services", "Contact", "Login"];

export default function Navbar({ activePage, setActivePage }: any) {
  const [open, setOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn") === "true";
  const user = isUserLoggedIn
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;

  const userInitial = user?.name?.charAt(0)?.toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowPopover(false);
      }
    };
    if (showPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover]);

  const visibleTabs = isUserLoggedIn
    ? tabs.filter((tab) => tab !== "Login")
    : tabs;

  return (
    <>
      <nav className="navbar desktop-nav">
        {visibleTabs.map((tab) => (
          <button
            key={tab}
            className={activePage === tab ? "nav-btn active" : "nav-btn"}
            onClick={() => setActivePage(tab)}
          >
            {tab}
          </button>
        ))}
        {isUserLoggedIn && (
          <div
            className="user-avatar"
            style={{
              marginLeft: "auto",
              position: "relative",
            }}
            ref={popoverRef}
          >
            <div
              onClick={() => setShowPopover((prev) => !prev)}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#01627d",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {userInitial}
            </div>
            {showPopover && (
              <div
                className="user-popover"
                style={{
                  position: "absolute",
                  top: "45px",
                  right: 0,
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "10px",
                  minWidth: "180px",
                  zIndex: 1000,
                }}
              >
                <p style={{ margin: 0, fontWeight: 600 }}>
                  <svg
                    className="h-8 w-8 text-slate-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <circle cx="12" cy="7" r="4" />{" "}
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                  </svg>
                  {user.name}
                </p>
                <p style={{ margin: "4px 0", fontSize: "14px" }}>
                  <svg
                    className="h-8 w-8 text-slate-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="3" y="5" width="18" height="14" rx="2" />{" "}
                    <polyline points="3 7 12 13 21 7" />
                  </svg>
                  {user.email}
                </p>
                <p style={{ margin: "4px 0", fontSize: "14px" }}>
                  <svg
                    className="h-8 w-8 text-slate-500"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <rect x="7" y="4" width="10" height="16" rx="1" />{" "}
                    <line x1="11" y1="5" x2="13" y2="5" />{" "}
                    <line x1="12" y1="17" x2="12" y2="17.01" />
                  </svg>{" "}
                  {user.mobileNumber}
                </p>
                <hr />
                <button
                  className="nav-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onClick={() => {
                    localStorage.removeItem("isUserLoggedIn");
                    localStorage.removeItem("user");
                    setShowPopover(false);
                    setActivePage("Home");
                    window.location.reload();
                  }}
                >
                  <svg
                    className="h-8 w-8 text-slate-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      {/* Mobile Hamburger */}
      <div className="mobile-nav">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>
        {open && (
          <div className="mobile-menu">
            {visibleTabs.map((tab) => (
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
            {/* Mobile User */}
            {isUserLoggedIn && (
              <button
                className="mobile-btn"
                onClick={() => {
                  localStorage.removeItem("isUserLoggedIn");
                  localStorage.removeItem("user");
                  setOpen(false);
                  setActivePage("Home");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
