"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";

import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import {
  onAuthStateChanged,
} from "firebase/auth";

import toast from "react-hot-toast";

import AuthGuard from "@/components/AuthGuard";


type Profile = {
  email: string;
  verification_id: string;
  verified: boolean;
  display_name?: string;
  username?: string;
  bio?: string;
  photo_url?: string;
};


export default function ProfilePage() {

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [displayName, setDisplayName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [oldUsername, setOldUsername] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [photoUrl, setPhotoUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (user) => {

          if (!user) return;

          const profileSnap =
            await getDoc(
              doc(
                db,
                "profiles",
                user.uid
              )
            );


          if (profileSnap.exists()) {

            const data =
              profileSnap.data() as Profile;

            setProfile(data);

            setDisplayName(data.display_name || "");
            setUsername(data.username || "");
            setOldUsername(data.username || "");
            setBio(data.bio || "");
            setPhotoUrl(data.photo_url || "");

          }

        }
      );


    return () => unsubscribe();

  }, []);



  async function saveProfile() {

    if (loading) return;

    const user = auth.currentUser;

    if (!user) return;

    setLoading(true);


    try {

      const cleanUsername =
        username
          .trim()
          .toLowerCase();


      if (!/^[a-z0-9_]{3,20}$/.test(cleanUsername)) {

        toast.error(
          "Username must be 3–20 characters."
        );

        return;

      }


      if (cleanUsername !== oldUsername) {

        const usernameSnap =
          await getDoc(
            doc(
              db,
              "usernames",
              cleanUsername
            )
          );


        if (usernameSnap.exists()) {

          toast.error(
            "Username is already taken."
          );

          return;

        }


        if (oldUsername) {

          await deleteDoc(
            doc(
              db,
              "usernames",
              oldUsername
            )
          );

        }


        await setDoc(
          doc(
            db,
            "usernames",
            cleanUsername
          ),
          {
            uid: user.uid,
          }
        );

      }


      await updateDoc(
        doc(
          db,
          "profiles",
          user.uid
        ),
        {
          display_name: displayName,
          username: cleanUsername,
          bio: bio,
          photo_url: photoUrl,
        }
      );


      setOldUsername(cleanUsername);


      toast.success(
        "Profile updated."
      );


    } catch (error:any) {

      console.error(error);

      toast.error(
        error.message ||
        "Profile update failed."
      );


    } finally {

      setLoading(false);

    }

  }



  if (!profile) {

    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading...
      </main>
    );

  }



  return (

    <AuthGuard>

      <main className="min-h-screen bg-gray-50 p-8">

        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 shadow">


          <h1 className="text-3xl font-bold">
            My Profile
          </h1>


          {photoUrl && (

            <img
              src={photoUrl}
              alt="Avatar"
              className="mt-6 h-24 w-24 rounded-full object-cover"
            />

          )}


          <label className="mt-6 block font-semibold">
            Avatar URL
          </label>

          <input
            value={photoUrl}
            disabled={loading}
            onChange={(e) =>
              setPhotoUrl(e.target.value)
            }
            className="mt-2 w-full rounded border p-3"
            placeholder="https://example.com/avatar.jpg"
          />


          <label className="mt-5 block font-semibold">
            Display Name
          </label>

          <input
            value={displayName}
            disabled={loading}
            onChange={(e) =>
              setDisplayName(e.target.value)
            }
            className="mt-2 w-full rounded border p-3"
          />


          <label className="mt-5 block font-semibold">
            Username
          </label>

          <input
            value={username}
            disabled={loading}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="mt-2 w-full rounded border p-3"
          />


          <label className="mt-5 block font-semibold">
            Bio
          </label>

          <textarea
            value={bio}
            disabled={loading}
            onChange={(e) =>
              setBio(e.target.value)
            }
            rows={4}
            className="mt-2 w-full rounded border p-3"
          />


          <button
            onClick={saveProfile}
            disabled={loading}
            className="mt-6 rounded-lg bg-black px-5 py-3 text-white disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>


        </div>

      </main>

    </AuthGuard>

  );

}
