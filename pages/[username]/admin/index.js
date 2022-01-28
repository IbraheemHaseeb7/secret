import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useState } from "react";
import ShowMessages from "../../../components/ShowMessages";
import Link from "next/link";

export default function Admin() {
  const [div, setDiv] = useState();
  const router = useRouter();

  function copy() {
    toast.success("Successfully Copied the link!");
    navigator.clipboard.writeText(
      `secretmsgme.vercel.app/${router.query.username}/public`
    );
  }
  return (
    <div className="admin-container">
      <ShowMessages setDiv={setDiv} />
      <button onClick={copy} className="btn">
        Click to copy link and Share with friends
      </button>
      <Link href="/">
        <button className="btn">Go Home</button>
      </Link>
    </div>
  );
}
