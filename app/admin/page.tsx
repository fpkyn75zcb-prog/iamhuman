"use client";

import AuthGuard from "@/components/AuthGuard";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const user = auth.currentUser;

      if (!user) return;

      const adminUID =
        process.env.NEXT_PUBLIC_ADMIN_UID;

      if (user.uid === adminUID) {
        setAuthorized(true);
      }
    };

    checkAdmin();
  }, []);

  return (
    <AuthGuard>
      <main className="min-h-screen p-6">
        {authorized ? (
          <div>
            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="mt-4">
              Admin access granted.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold">
              Access Denied
            </h1>

            <p className="mt-4">
              You do not have permission to view this page.
            </p>
          </div>
        )}
      </main>
    </AuthGuard>
  );
}
