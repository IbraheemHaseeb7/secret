import "../styles/globals.css";
import { useData } from "../lib/hook";
import { UserData } from "../components/Context";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

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
      <Toaster />
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
