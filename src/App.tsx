import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AuthFlow from "./pages/Authflow";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<AuthFlow />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop
        className="custom-toast-container"
      />
    </Router>
  );
}
