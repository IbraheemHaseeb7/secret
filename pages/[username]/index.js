import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth } from "../../lib/firebase";

export default function Username() {
  const [context, setContext] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const data = {
    username: "@ibraheem_703",
    followers: 971,
    following: 900,
  };
  useEffect(() => {
    onAuthStateChanged(auth, (data) => {
      if (data) {
        setContext(auth);
        setIsLoading(false);
      } else {
        setIsLoading(true);
      }
    });
  }, [router.query?.message]);
  return (
    <div className="username-main-container">
      {!isLoading ? (
        <div className="username-container">
          <div className="user-img-container">
            <img
              src={context?.currentUser?.photoURL}
              alt={data.username}
              className="user-img"
            />
          </div>
          <div className="information-container">
            <h1>{context?.currentUser?.displayName}</h1>
            <a href="#" className="username-link">
              <h3>{data.username}</h3>
            </a>
            <div className="follow-container">
              <h3>Following: {data.following}</h3>
              <h3>Followers: {data.followers}</h3>
            </div>
            <Link href={`/${router.query?.username}/public`}>
              <button className="btn">Send Annonymous Messages</button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
