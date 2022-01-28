import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { twitterAuth, auth } from "../lib/firebase";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  async function signin() {
    await signInWithPopup(auth, twitterAuth);
  }
  async function signout() {
    await signOut(auth);
  }

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
        <div className="signin-container">
          <img
            src="https://p.kindpng.com/picc/s/0-1148_twitter-bird-png-twitter-logo-2017-png-transparent.png"
            alt="twitter logo"
            className="twitter-logo"
          />
          <button className="btn" type="button" onClick={signin}>
            Sign In Using Twitter
          </button>
        </div>
      ) : (
        <div className="signout-container">
          <img
            src="https://p.kindpng.com/picc/s/0-1148_twitter-bird-png-twitter-logo-2017-png-transparent.png"
            alt="twitter logo"
            className="twitter-logo"
          />
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
