import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef, useEffect } from "react";
import { useEntryStore } from "../hooks/useEntryStore";
import { injectCode, showPreview } from "../config/event";

const Home: NextPage = () => {
  const router = useRouter();
  const { entry, updateIsSubmitted } = useEntryStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const doc = iframeRef?.current?.contentDocument;
    doc?.open();
    doc?.write(injectCode + entry?.html || "");
    doc?.close();
    const comInterval = setInterval(() => window.location.reload(), 4000); //This will refresh the data at regularIntervals of refreshTime
    return () => clearInterval(comInterval) //Clear interval on 
  }, []);


  return (
    <div style={{ textAlign: "center" }}>
      <h1>{entry?.fullName}</h1>
      <iframe ref={iframeRef} />
      <div
        onClick={() => {
          updateIsSubmitted(false);
          router.push("/editor");
        }}
      >
        &nbsp;
      </div>
    </div>
  );
};

export default Home;
