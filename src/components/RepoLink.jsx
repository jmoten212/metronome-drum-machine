import React from "react";
import { Tooltip } from 'react-tooltip';

function RepoLink () {
  return (
    <>
      <div className="repo-link">
        <a href="https://github.com/jmoten212/metronome-drum-machine" data-tooltip-id="gh-repo-link" data-tooltip-place="right" target="_blank"> 
          <img src="https://www.svgrepo.com/show/303548/git-icon-logo.svg" alt="Git icon" className="git-icon"/>
        </a>
      </div>
      <Tooltip id="gh-repo-link">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="tooltip-text">Link to GitHub Repository</span>
        </div>
      </Tooltip>
    </>    
  )
}

export default RepoLink;