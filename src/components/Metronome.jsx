import { useState, useRef, useCallback, useEffect } from "react";
import useSound from "use-sound";
import metronomeClick from "../assets/sounds/metronome-click.wav"

const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [bpm, setBpm] = useState(120);
  const beatsPerMeasure = 4;

  const [playClickSound] = useSound(metronomeClick);
  const timerRef = useRef(null);

  const playClick = useCallback(() => {
    playClickSound();
    setCount((prev) => (prev + 1) % beatsPerMeasure);
  }, [playClickSound, beatsPerMeasure]);

  const handleInputChange = useCallback(
    (event) => {
      const newBpm = event.target.value;
      setBpm(newBpm);
      if (isPlaying) {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(playClick, (60 / newBpm) * 1000);
        setCount(0);        
      }
    },
    [isPlaying, playClick]
  );

  const startStop = useCallback(() => {
    if (isPlaying) {
      clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      timerRef.current = setInterval(playClick, (60 / bpm) * 1000);
      setCount(0);
      setIsPlaying(true);
      playClick();
    }
  }, [isPlaying, bpm, playClick]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="metronome">
      <p>{bpm} BPM</p>
      <div className="bpm-slider">
        <p>40</p>
        <input
          type="range"
          min="40"
          max="208"
          value={bpm}
          onChange={handleInputChange}
        />
        <p>208</p>
      </div>
      <button className="start-button" onClick={startStop}>
        {isPlaying ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Metronome;
