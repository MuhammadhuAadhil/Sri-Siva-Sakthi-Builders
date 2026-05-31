import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import FloatingButtons from "./components/common/FloatingButtons";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/common/Footer";
import Login from "./components/Login"
import Signup from "./components/Signup"

function App() {
  return (
    <>
    
      <Navbar />

      <FloatingButtons />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Services />
              <Projects />
              <Testimonials />
              <Contact />
              <Footer />
            </>
          }
        />
      {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </>
  );
}

export default App;