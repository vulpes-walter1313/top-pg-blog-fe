import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getAuthCheck } from "../libs/queries";

function Navbar() {
  const { data, isSuccess } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthCheck,
  });
  return (
    <nav className="w-full bg-zinc-50 py-2">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between">
        <p className="text-3xl font-bold">Cool Blog</p>
        <div className="flex items-center gap-4">
          {isSuccess && data && data.user != undefined ? (
            <>
              <p>Hello, {data.user.firstName}</p>
              <button>Logout</button>
            </>
          ) : (
            <>
              <Link className="text-mobp lg:text-deskp" to="/">
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
