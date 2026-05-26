import { useRef, useState } from "react";
import BassSwitch from "./BassSwitch";
import SnareSwitch from "./SnareSwitch";
import HiHatSwitch from "./HiHatSwitch";

function DrumMachine(props) {
  const bassRefs = useRef([]);
  const snareRefs = useRef([]);
  const hiHatRefs = useRef([]);
  const drumDomRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const timerRef = useRef(null);
  const audioContextRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tempoMs, setTempoMs] = useState(250);
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

      setCurrentIndex(index);

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

      timerRef.current = setTimeout(step, tempoMs);
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

    // Resume audio context for mobile browsers
    await resumeAudioContext();

    isPlayingRef.current = true;
    setIsPlaying(true);
    playLoop();
  };

  return (
    <div className="drum-machine">
      <div className="start-button-tempo-select">
        <button type="button" onClick={togglePlay} className="start-button">
          {isPlaying ? 'Stop' : 'Start'}
        </button>
        <div className="tempo-control">
          <label htmlFor="tempo-select">Tempo: </label>
          <select 
            id="tempo-select"
            value={tempoMs} 
            onChange={(e) => setTempoMs(Number(e.target.value))}
            disabled={isPlaying}
          >
            <option value={125}>125ms</option>
            <option value={250}>250ms</option>
            <option value={500}>500ms</option>
          </select>
        </div>
      </div>
      <div className="drum-row">
        <div className="drum-row-title">
          <h2>{props.bassName}</h2>
        </div>
        {Array.from({ length: 16 }).map((_, index) => (
          <BassSwitch
            key={index}
            name="bassSwitch"
            className="switch-button"
            index={index}
            isActive={currentIndex === index && isPlaying}
            ref={(el) => (bassRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className="drum-row">
        <div className="drum-row-title">
          <h2>{props.snareName}</h2>
        </div>
        {Array.from({ length: 16 }).map((_, index) => (
          <SnareSwitch
            key={index}
            name="snareSwitch"
            className="switch-button"
            index={index}
            isActive={currentIndex === index && isPlaying}
            ref={(el) => (snareRefs.current[index] = el)}
          />
        ))}
      </div>
      <div className="drum-row">
        <div className="drum-row-title">
          <h2>{props.hiHatName}</h2>
        </div>
        {Array.from({ length: 16 }).map((_, index) => (
          <HiHatSwitch
            key={index}
            name="hiHatSwitch"
            className="switch-button"
            index={index}
            isActive={currentIndex === index && isPlaying}
            ref={(el) => (hiHatRefs.current[index] = el)}
          />
        ))}
      </div>
    </div>
  );
}

export default DrumMachine;
