import useSound from "use-sound";
import bassSound from "../assets/sounds/kick-bass-2.wav"

function BassDrum(props) {
  const [play] = useSound(bassSound);

  return (
    <button id={props.name} className="drumButton" onClick={play}></button>
  );
}

export default BassDrum;

// Decided to go with use-sound hook over Audio() constructor due to issues with the constructor not playing overlapping sounds
// Audio() example:
//   let audio = new Audio("../assets/sounds/kick-bass-2.wav");

//   const start = () => {
//     audio.play();
//   };