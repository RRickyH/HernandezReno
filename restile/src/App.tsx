import { SiteProvider } from "src/Context.tsx";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "src/pages/Home";
import About from "src/pages/About";
import Gallery from "src/pages/Gallery";
import Contact from "src/pages/Contact.tsx";
import Login from "src/pages/Login";
import Admin from "src/pages/Admin";

export default function App() {
  return (
    <SiteProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </HashRouter>
    </SiteProvider>
  );
}
