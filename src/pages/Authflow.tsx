import { useState } from "react";
import Register from "./Registration";
import Login from "./Login";
import "../styles/registration.css";

interface AuthFlowProps {
  initialView?: "register" | "login";
  selectedPlan?: string;
  onClose?: () => void;
  onAuthComplete?: () => void;
}

export default function AuthFlow({
  initialView = "login",
  selectedPlan = "",
  onClose,
  onAuthComplete,
}: AuthFlowProps) {
  const [currentView, setCurrentView] = useState<"register" | "login">(
    initialView,
  );

  const handleSwitchToLogin = () => {
    setCurrentView("login");
  };

  const handleSwitchToRegister = () => {
    setCurrentView("register");
  };

  return (
    <div className="auth-flow-container">
      {currentView === "login" ? (
        <Login
          onClose={onClose}
          onSuccess={onAuthComplete}
          onSwitchToRegister={handleSwitchToRegister}
        />
      ) : (
        <Register
          onClose={onClose}
          onComplete={onAuthComplete}
          selectedPlan={selectedPlan}
          onSwitchToLogin={handleSwitchToLogin}
        />
      )}
    </div>
  );
}
