import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../../../lib/firebase";
import { useRouter } from "next/router";
import AuthCheck from "../../../components/AuthCheck";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Public() {
  const [input, setInput] = useState("");
  const data = useRouter();
  function handleChange(e) {
    setInput(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const date = new Date().getTime().toString();
    setInput("");
    await setDoc(
      doc(firestore, `users/${data.query.username}/messages`, date),
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
        <h3 className="public-message">
          You can send this user as many
          <br />
          messages as you want but please
          <br /> do not use any FOUL Language or <br /> do not disrespect
          anyone.
          <br />
          Khush reya kero khushk na reya kero👉👈
        </h3>
        <form>
          <textarea
            placeholder="Type your message here"
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
