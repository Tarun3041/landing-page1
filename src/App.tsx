import { useState } from "react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import AuthFlow from "./pages/Authflow";
import About from "./pages/About";

export default function App() {
  const [activePage, setActivePage] = useState("Home");

  const renderPage = () => {
    switch (activePage) {
      case "Plans":
        return <Plans />;
      case "Services":
        return <Services />;
      case "Contact":
        return <Contact />;
      case "About":
        return <About />;
      case "Login":
        return <AuthFlow />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {renderPage()}
    </Layout>
  );
}
