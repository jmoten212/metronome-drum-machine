import useSound from "use-sound";
import snareSound from "../assets/sounds/snare.mp3"

function SnareDrum(props) {
  const [play] = useSound(snareSound);

  return (
    <button id={props.name} className="drumButton" onClick={play}></button>
  );
}

export default SnareDrum;
