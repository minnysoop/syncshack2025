"use client";

import { SignInField } from "@/types/signin-fields";
import { useForm, SubmitHandler } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignInField>();

  const onSubmit: SubmitHandler<SignInField> = (data) => {
    const { email, password } = data;
    signInWithEmailAndPassword(auth, email, password)
      .then(() => router.push("/dashboard"))
      .catch((error) => console.error(error.code, error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Sign in
        </h2>

        {/* Email */}
        <div className="mb-6">
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Forgot password */}
        <div className="text-right mb-6">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Sign in button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition mb-6"
        >
          Sign in
        </button>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-600">
          New here?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Join now
          </a>
        </p>
      </form>
    </div>
  );
}
