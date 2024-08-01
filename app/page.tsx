"use client";

import React, { useState } from "react";
import styles from "./styles/home.module.css";
import RadioButtons from "./components/RadioButtons";
import Recorder from "./home/Recorder";

const Home: React.FC = () => {
  const [responseMode, setResponseMode] = useState("text");
  const [assistantResponse, setAssistantResponse] =
    useState<JSX.Element | null>();

  const options = [
    { value: "text", label: "Text" },
    { value: "audio", label: "Audio" },
  ];

  return (
    <div className={styles.container}>
      <h1>Voice Assistant Simulator</h1>
      <RadioButtons
        options={options}
        selectedValue={responseMode}
        setSelectedValue={setResponseMode}
      />
      <Recorder
        responseMode={responseMode}
        setAssistantResponse={setAssistantResponse}
      />
      <div className={styles.responseContainer}>{assistantResponse}</div>
    </div>
  );
};

export default Home;
