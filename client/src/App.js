import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import UserProfile from "./components/userProfile/UserProfile";
import EmailVerify from "./components/EmailVerify/Emailverfiy";
import CreateNote from "./components/Notes/CreateNote";
import EditNote from "./components/Notes/EditNote";
import AllNotes from "./components/Notes/AllNotes";
import AdminHome from "./components/Admin/home";
import { Route, Routes, Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/profile/:id" exact element={<UserProfile />} />
      <Route path="/createNote" exact element={<CreateNote />} />
      <Route path="/editNote/:id" exact element={<EditNote />} />
      <Route path="/allNotes" exact element={<AllNotes />} />
      <Route path="/admin" exact element={<AdminHome />} />
      <Route path="/login/user/:id/verify/:token" element={<EmailVerify />} />
    </Routes>
  );
}

export default App;
