import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { firestore } from "../lib/firebase";
import { onSnapshot, orderBy, collection } from "firebase/firestore";
import Loader from "./Loader";

const randomMessages = [
  "Pyar karen ghusay nai 💖💖",
  "Website achi lagi to neeche developer ko hi keh do👉👈",
  "Hello Cutie 👉👈💖💖",
  "How are you cutie? 💖💖",
  "Bore ho rahay ho to share hi kr do😔",
  "Be a simp not a pimp 😌😌",
];

export default function ShowMessages({ setDiv, div }) {
  const router = useRouter();
  const reference = useRef();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState([]);
  let randomNum = Math.round((Math.random() * 10000) % 5);

  useEffect(() => {
    setDiv({ scrollHeight: 0, clientHeight: 0 });
    let unsub = onSnapshot(
      collection(firestore, `users/${router.query.uid}/messages`),
      orderBy("waqt", "desc"),
      (res) => {
        setMessage(
          res.docs.map((data) => {
            return data.data();
          })
        );
        setLoading(false);
        setDiv(reference.current);
      }
    );
    return () => {
      unsub();
    };
  }, [router.query.uid]);

  return (
    <div className="show-messages-container">
      <div className="public-title-container">
        <h2 className="annonymous-people">{randomMessages[randomNum]}</h2>
      </div>
      <>
        <div className="messages-box" ref={reference}>
          <div className="inner-messages-box">
            {loading ? (
              <Loader />
            ) : (
              message.map((data) => {
                return (
                  <div className="message-container" key={data.wqt}>
                    <p className="message">{data.message}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </>
    </div>
  );
}
