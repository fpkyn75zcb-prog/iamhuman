"use client";

import AuthGuard from "@/components/AuthGuard";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { signOut } from "firebase/auth";

export default function DashboardPage() {
  const [profile, setProfile] = useState<any>(null);
  const [verificationId, setVerificationId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadDashboard() {
      const user = auth.currentUser;

      if (!user) return;

      const profileSnap = await getDoc(
        doc(db, "profiles", user.uid)
      );

      if (profileSnap.exists()) {
        setProfile(profileSnap.data());
      }

      const verificationSnap = await getDoc(
        doc(db, "user_verifications", user.uid)
      );

      if (verificationSnap.exists()) {
        const data = verificationSnap.data();

        setVerificationId(data.verification_id);

        const url = `${window.location.origin}/verify/${data.verification_id}`;

        const qr = await QRCode.toDataURL(url);

        setQrCode(qr);
      }

      setLoading(false);
    }

    loadDashboard();
  }, []);

  async function downloadQRCode() {
    if (!qrCode) return;

    const link = document.createElement("a");

    link.href = qrCode;
    link.download = "iamhuman-qr.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function downloadVerificationCard() {
    if (!cardRef.current) return;

    try {
      const element = cardRef.current;

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return;

      const rect = element.getBoundingClientRect();

      canvas.width = rect.width * 2;
      canvas.height = rect.height * 2;

      context.scale(2, 2);

      const background =
        window.getComputedStyle(element).backgroundColor;

      context.fillStyle = background || "#ffffff";

      context.fillRect(
        0,
        0,
        rect.width,
        rect.height
      );

      const text =
        element.innerText;

      context.fillStyle = "#000000";
      context.font = "16px Arial";

      const lines = text.split("\n");

      lines.forEach((line, index) => {
        context.fillText(
          line,
          20,
          40 + index * 25
        );
      });

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");

      link.href = image;
      link.download = "iamhuman-verification-card.png";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setMessage("Verification card downloaded");
    } catch {
      setMessage("Download failed");
    }
  }

  async function logout() {
    await signOut(auth);
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="p-10">
          Loading dashboard...
        </div>
      </AuthGuard>
    );
  }

  const verificationLink =
    typeof window !== "undefined" && verificationId
      ? `${window.location.origin}/verify/${verificationId}`
      : "";

  return (
    <AuthGuard>
      <main className="min-h-screen bg-gray-100 p-6">

        <div className="mx-auto max-w-3xl space-y-6">

          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">
              iAmHuman Dashboard
            </h1>

            <button
              onClick={logout}
              className="rounded bg-black px-4 py-2 text-white"
            >
              Logout
            </button>
          </div>


          <div
            ref={cardRef}
            className="rounded-xl bg-white p-6 shadow"
          >
            <h2 className="text-xl font-bold">
              Verification Card
            </h2>

            <p className="mt-3">
              Username: {profile?.username || "User"}
            </p>

            <p>
              Status:
              {" "}
              {profile?.verified
                ? "Verified"
                : "Pending Verification"}
            </p>

            <p>
              ID:
              {" "}
              {verificationId}
            </p>
          </div>


          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="text-xl font-bold mb-4">
              QR Verification
            </h2>

            {qrCode && (
              <img
                src={qrCode}
                alt="Verification QR Code"
                className="w-48"
              />
            )}

            <button
              onClick={downloadQRCode}
              className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
            >
              Download QR
            </button>

          </div>


          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="font-bold">
              Public Verification Link
            </h2>

            <p className="break-all mt-2">
              {verificationLink}
            </p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  verificationLink
                );
                setMessage("Link copied");
              }}
              className="mt-3 rounded bg-gray-900 px-4 py-2 text-white"
            >
              Copy Link
            </button>

          </div>


          <button
            onClick={downloadVerificationCard}
            className="rounded bg-green-600 px-4 py-3 text-white"
          >
            Download Verification Card
          </button>


          {message && (
            <p className="text-sm">
              {message}
            </p>
          )}

        </div>

      </main>
    </AuthGuard>
  );
}
