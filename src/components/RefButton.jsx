import { useRef, useEffect, useState } from "react";
import useSound from "use-sound";

function RefButton() {
  const [play] = useSound("/sounds/kick-bass-2.wav");

  const buttonRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);

    if (!prevValue) {
      buttonRef.current.click();
    } else {
      //   buttonRef.current.click();
    }
  };

  const handleManualClick = () => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!isPlaying) {
  //       // if (buttonRef.current)
  //       buttonRef.current.click();
  //       console.log("click - effect");
  //     }
  //   }, 1000); // 1 second

  //   // Cleanup: Clear interval on unmount
  //   return () => clearInterval(interval);
  // }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div>
      <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
      <button ref={buttonRef} onClick={play}>
        Target Button
      </button>
    </div>
  );
}

export default RefButton;
