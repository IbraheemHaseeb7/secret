import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShowMessages from "../../components/ShowMessages";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase";
import Loader from "../../components/Loader";

export default function Admin() {
  const [div, setDiv] = useState({ scrollHeight: 0, clientHeight: 0 });
  const [loading, setLoading] = useState(true);
  const [allow, setAllow] = useState();
  const router = useRouter();
  setTimeout(() => {
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }, 1000);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid === router.query.uid) {
          setAllow(true);
        }
        setLoading(false);
      } else {
        setLoading(false);
        setAllow(false);
      }
    });
  }, [router.query.uid]);
  function copy() {
    toast.success("Successfully Copied the link!");
    navigator.clipboard.writeText(
      `secretmsgme.vercel.app/${router.query.uid}/public`
    );
  }

  return (
    <div className="admin-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {allow ? (
            <>
              <ShowMessages setDiv={setDiv} div={div} />
              <button onClick={copy} className="btn">
                Click to copy link and Share with friends
              </button>
              <Link href="/">
                <button className="btn">Go Home</button>
              </Link>
            </>
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
