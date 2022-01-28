import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { firestore } from "../lib/firebase";
import { onSnapshot, orderBy, collection } from "firebase/firestore";

export default function ShowMessages({ setDiv }) {
  const router = useRouter();
  const reference = useRef();
  const [message, setMessage] = useState([]);

  useEffect(() => {
    setDiv(reference.current);
    let unsub = onSnapshot(
      collection(firestore, `users/${router.query.username}/messages`),
      orderBy("waqt", "desc"),
      (res) => {
        setMessage(
          res.docs.map((data) => {
            return data.data();
          })
        );
      }
    );
    return () => {
      unsub();
    };
  }, [router.query.username]);

  return (
    <div className="show-messages-container">
      <div className="public-title-container">
        <h2 className="annonymous-people">Kindly Spam se gurhez keren</h2>
      </div>
      <div className="messages-box" ref={reference}>
        <div className="inner-messages-box">
          {message.map((data) => {
            return (
              <div className="message-container" key={data.wqt}>
                <p className="message">{data.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
