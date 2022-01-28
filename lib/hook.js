import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";

export function useData() {
  const [hello, setHello] = useState();
  const query = useRouter();
  useEffect(() => {
    setHello(auth);
  }, [query]);
  return { hello };
}
