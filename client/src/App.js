import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome Page/Welcome";
import About from "./pages/About Page/About";
import Contact from "./pages/Contact Page/Contact";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Galleries from "./pages/Galleries Page/Galleries";
import AlbumView from "./pages/Album Page/AlbumView";

const App = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/galleries" element={<Galleries />} />
                <Route path="/galleries/:albumId" element={<AlbumView />} />
                <Route path="*" element={<Welcome />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
