import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoutes";

import AuthCallback from "./AuthCallback";
import Login from "./pages/Login";
import ProfileEdit from "./pages/ProfileEdit";
import Pending from "./pages/Pending";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      <Route path="/profile/edit" element={<ProfileEdit />} />
      
      <Route path="/pending" element={<Pending />} />

      <Route element={<ProtectedRoute />}>
      </Route>
    </Routes>
  );
}

export default App;
