import Home from './Page/Home/Home';
import './App.css';
import Login from './Page/Login/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App