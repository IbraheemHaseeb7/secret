import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { firestore, twitterAuth } from "../lib/firebase";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { setDoc, doc, getFirestore } from "firebase/firestore";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [google, setGoogle] = useState();
  const [loading, setLoading] = useState(true);
  async function signin() {
    await signInWithPopup(auth, twitterAuth);
    toast.success("Signed In using Twitter");
    setGoogle(false);
  }

  async function signinwithgoogle() {
    await signInWithPopup(auth, new GoogleAuthProvider());
    toast.success("Signed In using Google");
    setGoogle(true);
  }
  async function signout() {
    await signOut(auth);
  }
  const auth = getAuth();
  const db = getFirestore();
  onAuthStateChanged(auth, (data) => {
    if (data) {
      setLoading(false);
      if (data.providerData[0].providerId === "twitter.com") {
        setDoc(doc(db, "users", data.uid), {
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
        setGoogle(false);
      } else {
        console.log(data);
        setDoc(doc(db, "users", data.uid), {
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL,
        });
        setGoogle(true);
      }
      setSignedIn(true);
    } else {
      setLoading(false);
      setSignedIn(false);
    }
  });

  return (
    <div className="home-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {!signedIn ? (
            <>
              <h1 className="make-an-account">
                Make an account so people
                <br /> can send you messages
              </h1>
              <div className="signin-container">
                <img
                  src="/logo.png"
                  alt="twitter logo"
                  className="twitter-logo"
                />
                <button className="btn" type="button" onClick={signin}>
                  Sign In Using Twitter
                </button>
              </div>
              <div className="signin-container">
                <img
                  src="/googleLogo.png"
                  alt="twitter logo"
                  className="twitter-logo"
                />
                <button
                  className="btn"
                  type="button"
                  onClick={signinwithgoogle}
                >
                  Sign In Using Google
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="signout-message">
                Click on check messages and <br /> their click on copy link
                button
                <br />
                below and share that link with friends
                <br />
                so they can send you messages
              </h2>
              <div className="signout-container">
                {google ? (
                  <img
                    src="/googleLogo.png"
                    alt="google logo"
                    className="twitter-logo"
                  />
                ) : (
                  <img
                    src="/logo.png"
                    alt="twitter logo"
                    className="twitter-logo"
                  />
                )}
                <h3 className="signout-title">
                  Hello, {auth.currentUser?.displayName}
                </h3>
                <Link href={`/${auth.currentUser?.uid}/admin`}>
                  <button className="btn" type="button">
                    Check Your Secret Messages
                  </button>
                </Link>
                <button className="btn" type="button" onClick={signout}>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
