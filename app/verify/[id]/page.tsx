"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [verification, setVerification] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVerification() {
      try {
        const { id } = await params;

        if (!id) {
          setError("Invalid verification ID");
          return;
        }

        const verificationSnap = await getDoc(
          doc(db, "public_verifications", id)
        );

        if (!verificationSnap.exists()) {
          setError("Verification record not found");
          return;
        }

        const verificationData = verificationSnap.data();

        setVerification(verificationData);

        if (verificationData.uid) {
          const profileSnap = await getDoc(
            doc(db, "profiles", verificationData.uid)
          );

          if (profileSnap.exists()) {
            setProfile(profileSnap.data());
          }
        }
      } catch {
        setError("Unable to load verification");
      } finally {
        setLoading(false);
      }
    }

    loadVerification();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading verification...
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="rounded-xl bg-white p-6 shadow">
          <h1 className="text-xl font-bold">
            Verification Error
          </h1>
          <p className="mt-2">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-md rounded-xl bg-white p-6 shadow">

        <h1 className="text-2xl font-bold">
          iAmHuman Verification
        </h1>

        <div className="mt-5 space-y-3">
          <p>
            Username: {profile?.username || "Unknown"}
          </p>

          <p>
            Status:{" "}
            {verification?.verified
              ? "Verified"
              : "Pending"}
          </p>

          <p className="break-all">
            Verification ID:{" "}
            {verification?.verification_id}
          </p>
        </div>

        {!verification?.uid && (
          <p className="mt-4 text-sm text-gray-500">
            Legacy verification record.
          </p>
        )}

      </div>
    </main>
  );
}
