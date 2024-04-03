import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Home from "./components/Home";
import Notes from "./components/Notes";
import NoteState from "./Context/Notes/NoteState";
import CreateNote from "./components/CreateNote";
function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/createnote" element={<CreateNote />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
