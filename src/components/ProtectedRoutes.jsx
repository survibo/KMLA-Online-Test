// src/components/ProtectedRoutes.jsx
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/contexts/AuthContext"; // useAuth → useAuthContext로 교체
import { useEffect } from "react";

export default function ProtectedRoute() {
  const { session, user, loading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!session) {
      navigate("/login", { replace: true });
      return;
    }

    // status별 리다이렉트
    if (user?.status === "none")     navigate("/profile-set", { replace: true });
    if (user?.status === "pending")  navigate("/pending", { replace: true });
    if (user?.status === "rejected") navigate("/rejected", { replace: true }); // 필요하면
  }, [loading, session, user, navigate]);

  if (loading) return <p>로딩 중...</p>;
  return <Outlet />;
}