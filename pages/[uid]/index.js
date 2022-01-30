import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, firestore } from "../../lib/firebase";
import Loader from "../../components/Loader";

export async function getStaticProps(context) {
  let user = null;
  let isLoading = true;
  await getDoc(doc(firestore, `users`, context.params.uid)).then((res) => {
    user = res.data();
    isLoading = false;
  });
  return {
    props: { user, isLoading },
    revalidate: 10000,
  };
}

export async function getStaticPaths() {
  let paths = null;
  await getDocs(collection(firestore, "users"))
    .then((res) => {
      paths = res.docs.map((data) => {
        const { uid } = data.data();
        return {
          params: { uid },
        };
      });
    })
    .catch((err) => {});
  return {
    paths,
    fallback: false,
  };
}
export default function Username({ user, isLoading }) {
  const router = useRouter();
  return (
    <div className="username-main-container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="username-container">
          <div className="user-img-container">
            <img
              src={user?.photoURL}
              alt={user?.displayName}
              className="user-img"
            />
          </div>
          <div className="information-container">
            <h1>{user.displayName}</h1>
            <Link href={`/${user?.uid}/public`}>
              <button className="btn">Send Annonymous Messages</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
