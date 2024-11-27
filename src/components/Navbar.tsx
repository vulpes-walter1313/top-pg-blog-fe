import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { getAuthCheck } from "../libs/queries";
import { logout } from "../libs/mutations";

function Navbar() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthCheck,
  });
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate({ to: "/" });
    },
  });
  return (
    <nav className="w-full bg-zinc-50 py-2">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
        <p className="text-3xl font-bold">Cool Blog</p>
        <div className="flex items-center gap-4">
          {isSuccess && data && data.user != undefined ? (
            <>
              <p className="text-mobp text-zinc-600 lg:text-deskp">
                Hello, {data.user.firstName}
              </p>
              <Link
                to="/"
                className="text-mobp text-zinc-600 hover:text-zinc-800 hover:underline lg:text-deskp"
              >
                Home
              </Link>
              <button
                onClick={() => logoutMutation.mutate()}
                className="rounded-lg bg-emerald-600 px-6 py-2 text-mobp font-medium text-white lg:text-deskp lg:font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-mobp text-zinc-600 hover:text-zinc-800 hover:underline lg:text-deskp"
                to="/"
              >
                Home
              </Link>
              <Link
                className="rounded-lg bg-emerald-600 px-6 py-2 text-mobp font-medium text-white lg:text-deskp lg:font-medium"
                to="/login"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
