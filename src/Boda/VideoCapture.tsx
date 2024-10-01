import { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

function VideoCapture() {
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  // Function to start video capture
  const startCapture = useCallback(() => {
    if (webcamRef.current && webcamRef.current.stream) {
      setCapturing(true);
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm",
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();

      // Automatically stop after 15 seconds
      setTimeout(() => {
        stopCapture();
      }, 15000);
    }
  }, [webcamRef, mediaRecorderRef]);

  // Function to handle data once recording is stopped
  const handleDataAvailable = useCallback(
    (event: BlobEvent) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    },
    [setRecordedChunks]
  );

  // Function to stop video capture
  const stopCapture = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
  }, [mediaRecorderRef]);

  // Function to download the captured video (you can upload it to S3 instead)
  const downloadVideo = useCallback(() => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [recordedChunks]);

  return (
    <>
      <Webcam audio={true} ref={webcamRef} />
      {capturing ? (
        <button onClick={stopCapture}>Stop Capture</button>
      ) : (
        <button onClick={startCapture}>Start 15s Capture</button>
      )}
      {recordedChunks.length > 0 && (
        <button onClick={downloadVideo}>Download Video</button>
      )}
    </>
  );
};

export default VideoCapture;
