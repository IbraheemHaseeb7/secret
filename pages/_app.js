import "../styles/globals.css";
import { useData } from "../lib/hook";
import { UserData } from "../components/Context";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import Head from "next/head";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  const { hello } = useData();
  const [mute, setMute] = useState(true);

  function muter() {
    reference.current.muted = !reference.current.muted;
    setMute(!mute);
  }

  const reference = useRef();
  useEffect(() => {
    reference.current.play();
  }, []);
  return (
    <UserData.Provider value={hello}>
      <video
        controls={false}
        muted
        autoPlay
        loop={true}
        ref={reference}
        src="../video/video.mp4"
      />
      <Component {...pageProps} />;
      <Head>
        <title>Send Secret Messages</title>
        <meta
          name="description"
          content="Create an account using twitter or google and receive annonymous messages from people with whom you share the link"
        />
        <meta
          name="keywords"
          content="Secret Messages, Secrets, Viralsachxd, viralsachxd"
        />
        <meta name="author" content="Ibraheem Bin Haseeb" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Send Secret Messages" />
        <meta property="og:url" content="https://secretmsgme.vercel.app" />
        <meta
          property="og:image"
          content="https://t3.ftcdn.net/jpg/01/43/44/90/360_F_143449039_BIJaOitahmKDzQbX969cCESmVfXSzeN1.jpg"
        />
      </Head>
      <Toaster />
      <Footer />
      {mute ? (
        <button className="mute" onClick={muter}>
          🔇
        </button>
      ) : (
        <button className="mute" onClick={muter}>
          🔊
        </button>
      )}
    </UserData.Provider>
  );
}

export default MyApp;
