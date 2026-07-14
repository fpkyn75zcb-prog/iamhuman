"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import toast from "react-hot-toast";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signup() {
    if (loading) return;

    setLoading(true);

    try {
      const cleanUsername = username.trim().toLowerCase();

      if (!/^[a-z0-9_]{3,20}$/.test(cleanUsername)) {
        toast.error(
          "Username must be 3–20 characters using letters, numbers, or underscores."
        );
        return;
      }

      const usernameRef = doc(db, "usernames", cleanUsername);
      const usernameSnap = await getDoc(usernameRef);

      if (usernameSnap.exists()) {
        toast.error("Username is already taken.");
        return;
      }

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = credential.user;

      const verificationId =
        "IH-" + Math.floor(100000 + Math.random() * 900000);

      await setDoc(usernameRef, {
        uid: user.uid,
        created_at: serverTimestamp(),
      });

      await setDoc(doc(db, "profiles", user.uid), {
        id: user.uid,
        email,
        username: cleanUsername,
        verification_id: verificationId,
        verified: false,
        created_at: serverTimestamp(),
      });

      await setDoc(
        doc(db, "public_verifications", verificationId),
        {
          verification_id: verificationId,
          verified: false,
          created_at: serverTimestamp(),
        }
      );

      toast.success("Account created successfully!");

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 p-8">

        <h1 className="text-3xl font-bold">
          Create your iAmHuman
        </h1>

        <p className="mt-3 text-gray-400">
          Start your human verification process.
        </p>

        <input
          className="mt-8 w-full rounded-xl bg-white/10 p-4 outline-none"
          type="email"
          placeholder="Email address"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="mt-4 w-full rounded-xl bg-white/10 p-4 outline-none"
          placeholder="Username"
          value={username}
          disabled={loading}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="mt-4 w-full rounded-xl bg-white/10 p-4 outline-none"
          type="password"
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          disabled={loading}
          className="mt-5 w-full rounded-xl bg-white py-4 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Continue"}
        </button>

      </div>
    </main>
  );
}
