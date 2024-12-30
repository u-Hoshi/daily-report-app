import { signInWithGoogle } from "@/app/actions";

const SignInButton = () => {
  return (
    <button
      onClick={signInWithGoogle}
      className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
    >
      {false ? "Signing in..." : "Sign in with Google"}
    </button>
  );
};

export default SignInButton;
