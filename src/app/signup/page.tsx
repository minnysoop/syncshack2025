"use client";

import { SignUpField } from "@/types/signup-fields"
import { useForm, SubmitHandler } from "react-hook-form"

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config"

import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch
    } = useForm<SignUpField>()

    const onSubmit: SubmitHandler<SignUpField> = (data) => {
        const { name, role, email, password } = data
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            router.push("/dashboard");
            // Update role, name, email, in the database and name API ROUTE
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    const password = watch("password")

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div>
                Sign Up
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6 text-white border p-6">
                <input
                    {...register("name", { required: true })}
                    placeholder="Name"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
                <input
                    {...register("role", { required: true })}
                    placeholder="Role"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
                <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
                <input
                    type="password"
                    {...register("confirmPassword", {
                        required: true,
                        validate: (value) => value === password || "Passwords do not match",
                    })}
                    placeholder="Confirm Password"
                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
                />
                <button type="submit" className="w-full p-2 bg-blue-500 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
