import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AuthCheck({ children }) {
  const [login, setLogin] = useState(false);
  const router = useRouter();
  onAuthStateChanged(auth, (data) => {
    if (data) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  });

  console.log(auth?.currentUser, router.query?.username);
  console.log(login);
  return (
    <div className="authcheck-main-container">
      {!login ? (
        children
      ) : (
        <div className="authcheck-container">
          <h1 className="permitted">You are not permitted to view this page</h1>
          <Link href="/">
            <button className="btn" type="button">
              Go Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
