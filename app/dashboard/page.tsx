"use client";

import { useEffect, useRef, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import AuthGuard from "@/components/AuthGuard";

type Profile = {
  email: string;
  verification_id: string;
  verified: boolean;
  created_at?: any;
};

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const profileRef = doc(db, "profiles", user.uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        setProfile(profileSnap.data() as Profile);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );
  }

  const verificationUrl =
    `${window.location.origin}/verify/${profile.verification_id}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(verificationUrl);
    alert("Verification link copied!");
  };

  const shareLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "iAmHuman Verification",
        text: "Verify my iAmHuman profile",
        url: verificationUrl,
      });
    } else {
      copyLink();
    }
  };

  const downloadCard = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current);

    const link = document.createElement("a");
    link.download = "iAmHuman-verification-card.png";
    link.href = canvas.toDataURL();

    link.click();
  };

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-3xl">

          <h1 className="text-3xl font-bold">
            iAmHuman Dashboard
          </h1>

          <div
            ref={cardRef}
            className="mt-8 rounded-2xl bg-black p-8 text-white shadow-xl"
          >
            <h2 className="text-3xl font-bold">
              iAmHuman
            </h2>

            <p className="mt-2 text-gray-300">
              Verified Human Identity
            </p>

            <div className="mt-6">
              <p>Email:</p>
              <p className="font-bold">
                {profile.email}
              </p>

              <p className="mt-4">
                Verification ID:
              </p>

              <p className="font-bold">
                {profile.verification_id}
              </p>

              <p className="mt-4">
                Status:
              </p>

              <p className="font-bold">
                {profile.verified ? "VERIFIED" : "PENDING"}
              </p>
            </div>

            <div className="mt-6 w-fit rounded-xl bg-white p-4">
              <QRCodeSVG
                value={verificationUrl}
                size={150}
              />
            </div>
          </div>

          <button
            onClick={downloadCard}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Download Verification Card
          </button>

          <div className="mt-8 rounded-xl bg-white p-6 shadow">
            <h2 className="font-bold">
              Public Verification Link
            </h2>

            <a
              href={verificationUrl}
              className="mt-2 block break-all text-blue-600 underline"
            >
              {verificationUrl}
            </a>

            <div className="mt-4 flex gap-3 flex-wrap">
              <button
                onClick={copyLink}
                className="rounded-lg bg-black px-4 py-2 text-white"
              >
                Copy Link
              </button>

              <button
                onClick={shareLink}
                className="rounded-lg bg-green-600 px-4 py-2 text-white"
              >
                Share
              </button>
            </div>
          </div>

        </div>
      </main>
    </AuthGuard>
  );
}
