import { useState, useRef } from "react";
import { ConvertToTextUrl } from "../lib/api";
import { fetchData } from "../utils/common.util";
import Loading from "../components/Loading";

type RecorderType = {
  responseMode: string;
  setAssistantResponse: (response: JSX.Element | null) => void;
};

const Recorder: React.FC<RecorderType> = ({
  responseMode,
  setAssistantResponse,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleStartStopRecording = () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          mediaRecorderRef.current = new MediaRecorder(stream);
          mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
          };
          mediaRecorderRef.current.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: "audio/wav",
            });
            audioChunksRef.current = [];
            if (responseMode === "audio") {
              setAssistantResponse(<Loading />);
              setTimeout(() => {
                const audioUrl = URL.createObjectURL(audioBlob);
                setAssistantResponse(
                  <audio src={audioUrl} controls autoPlay />
                );
              }, 3000);
            } else {
              setAssistantResponse(<Loading />);
              const data = await fetchData<{ message: string }>(
                ConvertToTextUrl()
              );
              setAssistantResponse(<p>{data.message}</p>);
            }
          };
          mediaRecorderRef.current.start();
          setIsRecording(true);
          setAssistantResponse(null);
        })
        .catch((error) => console.error("Error accessing microphone:", error));
    }
  };

  return (
    <div>
      <button className="button" onClick={handleStartStopRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      {isRecording && (
        <div className="recording-indicator">
          <p style={{ color: "red", fontWeight: "bold" }}>Recording</p>
          <div className="blink"></div>
        </div>
      )}
    </div>
  );
};

export default Recorder;
