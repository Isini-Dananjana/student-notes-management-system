
import './App.css';
import Login from "./components/Login/login";
import Signup from "./components/Signup/signup";
import UserProfile from "./components/userProfile/userProfile";
import EmailVerify from "./components/EmailVerify/emailverfiy";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>

			<Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/profile" exact element={<UserProfile />} />
      <Route path="/login/user/:id/verify/:token" element={<EmailVerify />} />
		</Routes>
  );
}

export default App;
