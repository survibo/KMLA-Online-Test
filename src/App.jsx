import { Routes, Route, Navigate } from "react-router-dom";

import AuthCallback from "./AuthCallback";
import Login from "./pages/Login";
import ProfileEdit from "./pages/ProfileEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />
      
      <Route path="/profile/edit" element={<ProfileEdit />} />
    </Routes>
  );
}

export default App;
