import "./App.css";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Signup from "./components/screens/Signup";
import Navbar from "./components/Navbar";
import EditUser from "./components/screens/EditUser";
import { reducer, initialState } from "./reducer/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/signin");
    }
  }, []);
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/" element={<Navigate to="/signup" />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/edituser/:userId" element={<EditUser />}></Route>
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;

// return (
//   <Router>
//     <Navbar />
//     <Routes>
//       <Route path="/signup" element={<Signup />}></Route>
//       <Route path="/signin" element={<Signin />}></Route>
//       <Route path="/" element={<Navigate to="/signup" />}></Route>
//       <Route path="/home" element={<Home />}></Route>
//       <Route path="/edituser/:userId" element={<EditUser />}></Route>
//     </Routes>
//   </Router>
// );
