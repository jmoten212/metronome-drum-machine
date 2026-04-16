import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import useSound from "use-sound";
import hiHatSound from "../assets/sounds/hi-hat.wav";

const HiHatSwitch = forwardRef((props, ref) => {
  const [play] = useSound(hiHatSound);
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

export default HiHatSwitch;