"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function Login() {

  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  async function login() {

    if (loading) return;


    setLoading(true);


    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      toast.success(
        "Login successful."
      );


      router.push("/dashboard");


    } catch (error:any) {

      console.error(error);


      toast.error(
        error.message ||
        "Login failed."
      );


    } finally {

      setLoading(false);

    }

  }


  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">


      <div className="w-full max-w-md rounded-3xl border border-white/10 p-8">


        <h1 className="text-3xl font-bold">
          Welcome back
        </h1>


        <p className="mt-3 text-gray-400">
          Access your human verification dashboard.
        </p>


        <input
          className="mt-8 w-full rounded-xl bg-white/10 p-4 outline-none"
          placeholder="Email address"
          type="email"
          disabled={loading}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <input
          className="mt-4 w-full rounded-xl bg-white/10 p-4 outline-none"
          placeholder="Password"
          type="password"
          disabled={loading}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        <button
          onClick={login}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-white py-4 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >

          {loading
            ? "Logging in..."
            : "Login"}

        </button>


      </div>


    </main>

  );

}
