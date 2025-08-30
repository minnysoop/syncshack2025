"use client";

import { useForm, SubmitHandler } from "react-hook-form"
import Link from 'next/link'
import { SignUpField } from "@/types/signup-fields"

export default function SignUp() {
    const {
        register,
        handleSubmit,
        watch
    } = useForm<SignUpField>()

    const onSubmit: SubmitHandler<SignUpField> = (data) => {
        console.log(data)
    }

    const password = watch("password")

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6 text-white border border-red-500 p-6">
                <input
                    {...register("name", { required: true })}
                    placeholder="Name"
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
