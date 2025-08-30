"use client";

import { SignInField } from "@/types/signin-fields"
import { useForm, SubmitHandler } from "react-hook-form"

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config"
import { useRouter } from "next/navigation";

export default function SignIn() { 
    const router = useRouter();

    const {
        register,
        handleSubmit,
    } = useForm<SignInField>()

    const onSubmit: SubmitHandler<SignInField> = (data) => {
        const { email, password } = data
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            router.push("/dashboard");
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div>
                Sign In
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6 text-white border p-6">
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
                <button type="submit" className="w-full p-2 bg-blue-500 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );


}