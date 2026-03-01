import { supabase } from "../lib/supabase";

export default function Login() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <button onClick={() => loginWithGoogle("google")}>Google 로그인</button>
    </>
  );
}
