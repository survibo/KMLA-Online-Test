import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (id) => {
      const { data } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      setUser(data);
      setLoading(false);
    };

    // onAuthStateChange가 초기 세션(INITIAL_SESSION)도 처리해줌
    // getSession() 따로 호출 불필요
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      if (session) {
        fetchUser(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const logout = () => supabase.auth.signOut();

  return { session, user, loading, logout };
}