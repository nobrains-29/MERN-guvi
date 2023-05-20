import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Navbar from "./components/Navbar";
import EditUser from "./components/screens/EditUser";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/" element={<Navigate to="/signup" />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/edituser/:userId" element={<EditUser />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
