import { useState } from "react";
import ShowMessages from "../../../components/ShowMessages";
import { setDoc, doc } from "firebase/firestore";
import { firestore } from "../../../lib/firebase";
import { useRouter } from "next/router";
import AuthCheck from "../../../components/AuthCheck";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Public() {
  const [input, setInput] = useState("");
  const [div, setDiv] = useState({ scrollHeight: 0, clientHeight: 0 });
  const data = useRouter();
  function handleChange(e) {
    setInput(e.target.value);
  }
  setTimeout(() => {
    div.scrollTop = div.scrollHeight - div.clientHeight;
  }, 3000);
  async function handleSubmit(e) {
    e.preventDefault();
    const date = new Date().getTime().toString();
    setInput("");
    div.scrollTop = div.scrollHeight - div.clientHeight;
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
        <ShowMessages setDiv={setDiv} />
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
