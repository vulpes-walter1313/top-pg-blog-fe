import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { registerUser } from "../libs/mutations";
import { useState } from "react";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

type RegisterFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function RegisterPage() {
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormInputs>();
  const registerUserMuta = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate({ to: "/login" });
    },
  });
  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log(data);
    if (data.password != data.confirmPassword) {
      setConfirmPasswordError("Password does not match confirm password");
      return;
    }
    setConfirmPasswordError(undefined);
    registerUserMuta.mutate(data);
  };
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-950">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 pt-8">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-mobh1 lg:text-deskh1">Register</h1>
          <p className="text-mobp text-zinc-800 lg:text-deskp">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-700 underline">
              Login here.
            </Link>
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md flex-col gap-4 rounded-lg border border-zinc-300 bg-white p-6 shadow-md"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="firstName"
              className="text-mobp font-medium lg:text-deskp lg:font-medium"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-mobp text-zinc-800 shadow-sm lg:text-deskp"
              {...register("firstName", {
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name should be 30 characters or less",
                },
              })}
            />
            {errors.firstName && (
              <p className="rounded-lg bg-red-100 px-3 py-2 text-red-800">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="lastName"
              className="text-mobp font-medium lg:text-deskp lg:font-medium"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-mobp text-zinc-800 shadow-sm lg:text-deskp"
              {...register("lastName", {
                minLength: {
                  value: 3,
                  message: "Name should be at least 3 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name should be 30 characters or less",
                },
              })}
            />
            {errors.lastName && (
              <p className="rounded-lg bg-red-100 px-3 py-2 text-red-800">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-mobp font-medium lg:text-deskp lg:font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-mobp text-zinc-800 shadow-sm lg:text-deskp"
              {...register("email", {
                maxLength: {
                  value: 356,
                  message: "Email should be 356 characters or less",
                },
              })}
            />
            {errors.email && (
              <p className="rounded-lg bg-red-100 px-3 py-2 text-red-800">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-mobp font-medium lg:text-deskp lg:font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-mobp text-zinc-800 shadow-sm lg:text-deskp"
              {...register("password", {
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long",
                },
                maxLength: {
                  value: 64,
                  message: "passwords should be 64 characters or less",
                },
              })}
            />
            {errors.password && (
              <p className="rounded-lg bg-red-100 px-3 py-2 text-red-800">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-mobp font-medium lg:text-deskp lg:font-medium"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-mobp text-zinc-800 shadow-sm lg:text-deskp"
              {...register("confirmPassword", {
                minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters long",
                },
                maxLength: {
                  value: 64,
                  message: "confirmPasswords should be 64 characters or less",
                },
              })}
            />
            {errors.confirmPassword && (
              <p className="rounded-lg bg-red-100 px-3 py-2 text-red-800">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {confirmPasswordError && (
            <p className="rounded-lg bg-red-100 px-3 py-2 text-red-800">
              {confirmPasswordError}
            </p>
          )}
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-6 py-2 text-mobp font-medium text-white shadow-md lg:text-deskp lg:font-medium"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
