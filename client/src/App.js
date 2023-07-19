import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Welcome from "./pages/Welcome Page/Welcome";
import About from "./pages/About Page/About";
import Contact from "./pages/Contact Page/Contact";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

const App = () => {
    return (
        <Router>
            <Navigation />
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Welcome />} />
            </Routes>
            <Footer />
      </Router>
    );
};

export default App;
