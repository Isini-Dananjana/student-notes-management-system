
import './App.css';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import UserProfile from "./components/UserProfile/UserProfile";
import EmailVerify from "./components/EmailVerify/EmailVerfiy";
import CreateNote from "./components/Notes/CreateNote";
import EditNote from "./components/Notes/EditNote";
import AllNotes from "./components/Notes/AllNotes";
import { Route, Routes, Navigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

function App() {
  return (
    <Routes>

			<Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/profile" exact element={<UserProfile />} />
      <Route path="/createNote" exact element={<CreateNote />} />
      <Route path="/editNote/:id" exact element={<EditNote />} />
      <Route path="/allNotes" exact element={<AllNotes />} />
      <Route path="/login/user/:id/verify/:token" element={<EmailVerify />} />
		</Routes>
  );
}

export default App;
