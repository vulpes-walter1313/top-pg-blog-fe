import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../libs/mutations";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

type LoginInputs = {
  email: string;
  password: string;
};
function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate({ to: "/" });
    },
  });
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data);
    loginMutation.mutate({ email: data.email, password: data.password });
  };
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="flex flex-col gap-12 py-14">
        <h1 className="text-center text-mobh1 text-zinc-900 lg:text-deskh1">
          Login
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-lg border border-zinc-300 bg-zinc-50 p-4 shadow-md"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-mobp font-medium text-zinc-800 lg:text-deskp lg:font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-mobp text-zinc-600 shadow-sm lg:text-deskp"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="rounded-md bg-red-100 p-4 text-mobp text-red-800 lg:text-deskp">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-mobp font-medium text-zinc-800 lg:text-deskp lg:font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-mobp text-zinc-700 shadow-sm lg:text-deskp"
              placeholder="password"
            />
            {errors.password && (
              <p className="rounded-md bg-red-100 p-4 text-mobp text-red-800 lg:text-deskp">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-6 py-2 text-mobp font-medium text-white shadow-md lg:text-deskp lg:font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
