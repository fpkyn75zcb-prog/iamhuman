"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.push("/login");
  }

  return (
    <nav className="w-full border-b bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-black"
        >
          iAmHuman
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/dashboard"
            className="hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className="hover:text-blue-600"
          >
            Profile
          </Link>

          <Link
            href="/settings"
            className="hover:text-blue-600"
          >
            Settings
          </Link>

          <button
            onClick={handleLogout}
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
