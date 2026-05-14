
import Metronome from './components/Metronome';
import DrumMachine from './components/DrumMachine';
import { Tooltip } from 'react-tooltip';
import './App.css';

function App() {
  return (
    <div>
      <h1>Drum Machine 🎛️</h1>
      <Metronome />
      <DrumMachine bassName="BASS DRUM" snareName="SNARE DRUM" hiHatName="HI HAT" />

      {/* <div className="repo-link">
        <a href="https://github.com/jmoten212/metronome-drum-machine" data-tooltip-id="gh-repo-link" data-tooltip-place="right"> 
          <img src="https://www.svgrepo.com/show/303548/git-icon-logo.svg" alt="Git icon" className="git-icon"/>
        </a>
      </div>
      <Tooltip id="gh-repo-link">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="tooltip-text">Link to GitHub Repository</span>
        </div>
      </Tooltip> */}

    </div>
  )
}

export default App;