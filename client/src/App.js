import "./App.css";
import Welcome from "./pages/Welcome Page/Welcome";
import About from "./pages/About Page/About";
import Contact from "./pages/Contact Page/Contact";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

const App = () => {
    return (
      <>
        <Navigation/>
            <Welcome />
            <About />
            <Contact />
            <Footer />
        </>
    );
};

export default App;
