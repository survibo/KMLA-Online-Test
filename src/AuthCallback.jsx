import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        navigate("/login", { replace: true });
        return;
      }

      console.log("callback URL:", window.location.href);
      console.log("hash:", window.location.hash);
      console.log("search:", window.location.search);
      if (data.session) {
        navigate("/profile/set", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    run();
  }, [navigate]);

  return <div style={{ padding: 24 }}>Signing you in...</div>;
}
