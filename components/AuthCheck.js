import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import Loader from "./Loader";

export default function AuthCheck({ children }) {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        if (data.uid === router.query.username) {
          setLogin(false);
        } else {
          setLogin(true);
        }
        setLoading(false);
      } else {
        setLogin(true);
        setLoading(false);
      }
    });
  }, [router.query.username]);
  return (
    <div className="authcheck-main-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {login ? (
            children
          ) : (
            <div className="authcheck-container">
              <h1 className="permitted">
                You are not permitted to view this page
              </h1>
              <Link href="/">
                <button className="btn" type="button">
                  Go Home
                </button>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
