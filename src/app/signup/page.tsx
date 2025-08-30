"use client";

import { SignUpField } from "@/types/signup-fields";
import { useForm, SubmitHandler } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<SignUpField>();

  const password = watch("password");

  const onSubmit: SubmitHandler<SignUpField> = (data) => {
    const { name, email, password } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("/dashboard");
      })
      .catch((error) => console.error(error.code, error.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Get Started
        </h2>

        {/* Name */}
        <div>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === password || "Passwords do not match",
            })}
            placeholder="Confirm Password"
            className="w-full p-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sign up button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Sign Up
        </button>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

