import { useRef, useState } from "react";
import BassSwitch from "./BassSwitch";
import SnareSwitch from "./SnareSwitch";
import HiHatSwitch from "./HiHatSwitch";

function DrumMachine(props) {
  const bassRefs = useRef([]);
  const snareRefs = useRef([]);
  const hiHatRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const TEMPO_MS = 250;
  const SEQUENCE_LENGTH = 16;

  const playLoop = async () => {
    if (!isPlayingRef.current) return;
    
    for (let index = 0; index < SEQUENCE_LENGTH; index += 1) {
      if (bassRefs.current[index]?.isOn) {
        bassRefs.current[index]?.play();
      }
      if (snareRefs.current[index]?.isOn) {
        snareRefs.current[index]?.play();
      }
      if (hiHatRefs.current[index]?.isOn) {
        hiHatRefs.current[index]?.play();
      }
      await new Promise((resolve) => setTimeout(resolve, TEMPO_MS));
    }
    
    if (isPlayingRef.current) {
      playLoop();
    }
  };

  const togglePlay = () => {
    isPlayingRef.current = !isPlayingRef.current;
    setIsPlaying(isPlayingRef.current);
    if (isPlayingRef.current) {
      playLoop();
    }
  };

  return (
    <div className="drumMachine">
      <button type="button" onClick={togglePlay} className="startButton">
        {isPlaying ? 'Stop' : 'Start'}
      </button>
      <div className="drumRow">
        <h2>{props.bassName}</h2>
        {Array.from({ length: 16 }).map((_, index) => (
          <BassSwitch
            key={index}
            name="bassSwitch"
            className="switchButton"
            index={index}
            ref={(el) => (bassRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className="drumRow">
        <h2>{props.snareName}</h2>
        {Array.from({ length: 16 }).map((_, index) => (
          <SnareSwitch
            key={index}
            name="snareSwitch"
            className="switchButton"
            index={index}
            ref={(el) => (snareRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className="drumRow">
        <h2>{props.hiHatName}</h2>
        {Array.from({ length: 16 }).map((_, index) => (
          <HiHatSwitch
            key={index}
            name="hiHatSwitch"
            className="switchButton"
            index={index}
            ref={(el) => (hiHatRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
}

export default DrumMachine;
