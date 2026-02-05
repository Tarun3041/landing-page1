import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { logoutUserApi } from "../Service";
import { toast } from "react-toastify";

const tabs = [
  { label: "Home", path: "/" },
  { label: "Plans", path: "/plans" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
  { label: "Login", path: "/login" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

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
    ? tabs.filter((t) => t.label !== "Login")
    : tabs;

  const logoutHandler = () => {
    const logoutData = { email: user.email };

    logoutUserApi(logoutData).then((response: any) => {
      if (response.status === 200) {
        localStorage.clear();
        toast.success(response.data.message);
        setShowPopover(false);
        navigate("/login");
      } else {
        toast.error(response.response.data.message);
      }
    });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="navbar desktop-nav">
        {visibleTabs.map((tab) => (
          <NavLink
            key={tab.label}
            to={tab.path}
            className={({ isActive }) =>
              isActive ? "nav-btn active" : "nav-btn"
            }
            style={{ textDecoration: "none" }}
          >
            {tab.label}
          </NavLink>
        ))}

        {isUserLoggedIn && (
          <div className="user-avatar" ref={popoverRef}>
            <div
              className="avatar-circle"
              onClick={() => setShowPopover((prev) => !prev)}
            >
              {userInitial}
            </div>

            {showPopover && (
              <div className="user-popover">
                     <p className="user-name">
                  <span className="icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="7" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </span>
                  {user.userId}
                </p>
                <p className="user-name">
                  <span className="icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="7" r="4" />
                      <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                  </span>
                  {user.name}
                </p>

                <p className="user-email">
                  <span className="icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <polyline points="3 7 12 13 21 7" />
                    </svg>
                  </span>
                  {user.emailID}
                </p>

                <p className="user-phone">
                  <span className="icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="7" y="4" width="10" height="16" rx="2" />
                      <line x1="11" y1="5" x2="13" y2="5" />
                      <line x1="12" y1="17" x2="12" y2="17.01" />
                    </svg>
                  </span>
                  {user.mobileNumber}
                </p>

                <hr />
                <button className="logout-btn" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <button className="hamburger" onClick={() => setOpen(!open)}>
          ☰
        </button>

        {open && (
          <div className="mobile-menu">
            {visibleTabs.map((tab) => (
              <NavLink
                key={tab.label}
                to={tab.path}
                className={({ isActive }) =>
                  isActive ? "mobile-btn active" : "mobile-btn"
                }
                onClick={() => setOpen(false)}
              >
                {tab.label}
              </NavLink>
            ))}

            {isUserLoggedIn && (
              <button
                className="mobile-btn"
                onClick={() => {
                  localStorage.clear();
                  setOpen(false);
                  navigate("/");
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
