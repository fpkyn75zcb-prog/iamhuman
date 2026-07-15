"use client";

import AuthGuard from "@/components/AuthGuard";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function SettingsPage() {

  const [profile, setProfile] =
    useState<any>(null);


  useEffect(() => {

    async function loadProfile() {

      const user =
        auth.currentUser;

      if (!user) return;


      const profileRef =
        doc(
          db,
          "profiles",
          user.uid
        );


      const snapshot =
        await getDoc(profileRef);


      if (snapshot.exists()) {

        setProfile(
          snapshot.data()
        );

      }

    }


    loadProfile();

  }, []);



  return (

    <AuthGuard>

      <main className="min-h-screen bg-gray-50 p-6">

        <div className="mx-auto max-w-xl rounded-xl bg-white border p-6 shadow">


          <h1 className="mb-6 text-3xl font-bold">
            Settings
          </h1>


          {profile ? (

            <div className="space-y-4">


              {profile.photo_url && (

                <img
                  src={profile.photo_url}
                  alt="Avatar"
                  className="h-24 w-24 rounded-full object-cover"
                />

              )}


              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p>
                  {profile.email}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Display Name
                </p>

                <p>
                  {profile.display_name || "Not set"}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Username
                </p>

                <p>
                  {profile.username || "Not set"}
                </p>
              </div>


              <div>
                <p className="text-sm text-gray-500">
                  Verification ID
                </p>

                <p>
                  {profile.verification_id}
                </p>
              </div>


            </div>

          ) : (

            <p>
              Loading settings...
            </p>

          )}


        </div>

      </main>

    </AuthGuard>

  );

}
