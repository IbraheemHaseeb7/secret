import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function AuthCheck({ children }) {
  const [login, setLogin] = useState(false);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setLogin(true);
      } else {
        setLogin(false);
      }
    });
  }, []);
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
