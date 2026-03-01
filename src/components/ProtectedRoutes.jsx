import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function ProtectedRoute() {
  const { session, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate("/login", { replace: true });
      return;
    }
    if (user?.status !== "accepted") navigate("/pending", { replace: true });
  }, [loading, session, user, navigate]);

  if (loading) return <p>로딩 중...</p>;
  return <Outlet />;
}
