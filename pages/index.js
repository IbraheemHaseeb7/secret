import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { twitterAuth } from "../lib/firebase";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [google, setGoogle] = useState();
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
  onAuthStateChanged(auth, (data) => {
    if (data) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <div className="home-container">
      <h1 className="make-an-account">
        Make an account so people
        <br /> can send you messages
      </h1>
      {!signedIn ? (
        <>
          <div className="signin-container">
            <img src="/logo.png" alt="twitter logo" className="twitter-logo" />
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
            <button className="btn" type="button" onClick={signinwithgoogle}>
              Sign In Using Google
            </button>
          </div>
        </>
      ) : (
        <div className="signout-container">
          {google ? (
            <img
              src="/googleLogo.png"
              alt="twitter logo"
              className="twitter-logo"
            />
          ) : (
            <img src="/logo.png" alt="twitter logo" className="twitter-logo" />
          )}
          <button className="btn" type="button" onClick={signout}>
            Sign Out
          </button>
          <Link href={`/${auth?.currentUser.uid}/admin`}>
            <button className="btn" type="button">
              Check Your Secret Messages
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
