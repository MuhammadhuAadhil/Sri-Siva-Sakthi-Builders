import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Blogs from "./components/Blogs";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* ONE PAGE PORTFOLIO */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <About />
              <Experience />
              <Blogs />
              <Skills />
              <Contact />
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
