import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import useSound from "use-sound";
import bassSound from "../assets/sounds/snare-3.mp3";

const SnareSwitch = forwardRef((props, ref) => {
  const [play] = useSound(bassSound);
  const buttonRef = useRef(null);
  const [isOn, setIsOn] = useState(false);

  useImperativeHandle(ref, () => ({
    click: () => buttonRef.current?.click(),
    play: play,
    isOn: isOn,
  }), [isOn]);

  const handleClick = () => {
    setIsOn(!isOn);
    // play();
  };

  return (
    <label
      ref={buttonRef}
      id={`${props.name}-${props.index}`}
      className={`switchButton ${isOn ? 'on' : 'off'}`}
      onClick={handleClick}
    >
      <input type="checkbox" checked={isOn} readOnly />
    </label>
  );
});

export default SnareSwitch;

// button needs to switch on/off for PlayDrumSequence + visual of on/off
// if on, PlayDrumSequence plays it
// if off, nothing

// useState for ifChecked on form - play sound, else...