import { useState } from "react";
import { setDoc, doc, getDocs, collection } from "firebase/firestore";
import { auth, firestore } from "../../lib/firebase";
import { useRouter } from "next/router";
import AuthCheck from "../../components/AuthCheck";
import Link from "next/link";
import toast from "react-hot-toast";

const randomMessage = [
  "Tusi ja raye ho? πππ",
  "Peeche spooder man ke saath dance hi kr lo πΊπ",
  "Hello there CutiePie ππ",
  "Ganday messages na bhejna π",
  "Your secrets are safe with me ππ",
  "I love you, as a User of my app ππ",
  "Neeche scroll krke developer ko insta pe developer ko hi keh do ππ",
  "Khush reya kero khushk na reya keroππ",
];

export default function Public() {
  const [input, setInput] = useState("");
  const data = useRouter();
  function handleChange(e) {
    setInput(e.target.value);
  }
  const randomNum = Math.round((Math.random() * 10000) % 7);
  async function handleSubmit(e) {
    e.preventDefault();
    const date = new Date().getTime().toString();
    setInput("");
    await setDoc(
      doc(firestore, `users/${data.query.uid}/messages`, date),
      {
        message: input,
        waqt: date,
      }
    );
    toast.success("Message Sent");
  }
  return (
    <AuthCheck>
      <div className="public-container">
        <div className="public-message-container">
          <h3 className="public-message">
            You can send this user as many messages as you want but please do
            not use any FOUL Language or do not disrespect anyone. <br />
            <br />
            {randomMessage[randomNum]}
          </h3>
        </div>
        <form>
          <textarea
            placeholder={`Type your message here`}
            className="input"
            value={input}
            onChange={handleChange}
          />
          <button className="btn" onClick={handleSubmit} type="submit">
            Send Message
          </button>
        </form>
        <Link href={`/`}>
          <button className="btn" type="btn">
            Create your own Profile
          </button>
        </Link>
      </div>
    </AuthCheck>
  );
}
