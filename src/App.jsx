
import Metronome from './components/Metronome';
import DrumMachine from './components/DrumMachine';
import RepoLink from './components/RepoLink';
import './App.css';

function App() {
  return (
    <div>
      <h1>Drum Machine 🎛️</h1>
      <Metronome />
      <DrumMachine bassName="BASS DRUM" snareName="SNARE DRUM" hiHatName="HI HAT" />
      <RepoLink />
    </div>
  )
}

export default App;