import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { QRCodeSVG } from "qrcode.react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function VerifyPage({ params }: Props) {
  const { id } = await params;

  const verificationRef = doc(
    db,
    "public_verifications",
    id
  );

  const verificationSnap = await getDoc(verificationRef);

  if (!verificationSnap.exists()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h1 className="text-3xl font-bold">
            Verification Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            This verification ID does not exist.
          </p>
        </div>
      </main>
    );
  }

  const verificationData = verificationSnap.data();

  const profileRef = doc(
    db,
    "profiles",
    verificationData.uid
  );

  const profileSnap = await getDoc(profileRef);

  const profile = profileSnap.exists()
    ? profileSnap.data()
    : null;


  const verificationUrl =
    `${process.env.NEXT_PUBLIC_SITE_URL || ""}/verify/${id}`;


  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">


      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">


        <div className="text-center">


          <h1 className="text-4xl font-bold">
            iAmHuman
          </h1>


          <p className="mt-2 text-gray-500">
            Verified Human Identity
          </p>



          {verificationData.verified ? (

            <div className="mt-8">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl text-green-600">
                ✓
              </div>


              <h2 className="mt-4 text-3xl font-bold">
                Human Verified
              </h2>


            </div>


          ) : (

            <div className="mt-8">

              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-5xl">
                !
              </div>


              <h2 className="mt-4 text-3xl font-bold">
                Pending Verification
              </h2>

            </div>

          )}

        </div>



        {profile && (

          <div className="mt-8 rounded-2xl bg-gray-100 p-5">


            <h3 className="text-xl font-bold">
              Profile
            </h3>


            <p className="mt-4">
              <strong>Name:</strong>{" "}
              {profile.display_name || "Not provided"}
            </p>


            <p className="mt-3">
              <strong>Username:</strong>{" "}
              {profile.username || "Not provided"}
            </p>


            <p className="mt-3">
              <strong>Bio:</strong>
            </p>


            <p className="mt-1 text-gray-700">
              {profile.bio || "No bio available"}
            </p>


          </div>

        )}



        <div className="mt-8 rounded-2xl border p-5">


          <p className="font-bold">
            Verification ID
          </p>


          <p className="break-all text-sm">
            {verificationData.verification_id}
          </p>



          <p className="mt-4">
            <strong>Status:</strong>{" "}
            {verificationData.verified
              ? "Verified"
              : "Pending"}
          </p>


          <p className="mt-4">
            <strong>Created:</strong>{" "}
            {verificationData.created_at?.toDate
              ? verificationData.created_at.toDate().toString()
              : "Unknown"}
          </p>


        </div>



        <div className="mt-8 flex justify-center rounded-2xl border p-5">

          <QRCodeSVG
            value={verificationUrl}
            size={180}
          />

        </div>


      </div>


    </main>
  );
}
