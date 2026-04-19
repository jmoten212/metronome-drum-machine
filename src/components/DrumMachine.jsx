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
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);
  const TEMPO_MS = 250;
  const SEQUENCE_LENGTH = 16;

  const resumeAudioContext = async () => {
    if (audioContextRef.current) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();

      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
    } catch (error) {
      console.warn('Audio context resumption failed:', error);
    }
  };

  const playLoop = () => {
    let index = 0;

    const step = () => {
      if (!isPlayingRef.current) return;

      if (bassRefs.current[index]?.isOn) {
        bassRefs.current[index]?.play();
      }
      if (snareRefs.current[index]?.isOn) {
        snareRefs.current[index]?.play();
      }
      if (hiHatRefs.current[index]?.isOn) {
        hiHatRefs.current[index]?.play();
      }

      index += 1;
      if (index >= SEQUENCE_LENGTH) {
        index = 0;
      }

      timerRef.current = setTimeout(step, TEMPO_MS);
    };

    step();
  };

  const togglePlay = async () => {
    if (isPlayingRef.current) {
      isPlayingRef.current = false;
      setIsPlaying(false);
      clearTimeout(timerRef.current);
      timerRef.current = null;
      return;
    }

    // Resume audio context on mobile browsers
    await resumeAudioContext();

    isPlayingRef.current = true;
    setIsPlaying(true);
    playLoop();
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
