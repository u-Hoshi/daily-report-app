import { signOutAction } from "@/app/actions";

const SignOutButton = () => {
  return (
    <button
      onClick={signOutAction}
      className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
