import BassDrum from "./BassDrum";
import SnareDrum from "./SnareDrum";

function DrumMachine(props) {
  return (
    <div className="drumMachine">
      <div className="drumRow">
        <h2>{props.bassName}</h2>
        {Array.from({ length: 4 }).map((_, index) => (
          <BassDrum key={index} name="bassDrum" />
        ))}
      </div>
      <div className="drumRow">
        <h2>{props.snareName}</h2>
        {Array.from({ length: 4 }).map((_, index) => (
          <SnareDrum key={index} name="snareDrum" />
        ))}
      </div>
    </div>
  );
}

export default DrumMachine;
