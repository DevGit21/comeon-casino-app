import React from 'react';

const PlayVideo = ({ onBack }) => {
  return (
    <div className="ingame">
        <div className="ui grid centered">
            <div className="sixteen wide mobile three wide computer column">
            <div className="ui right floated secondary button inverted" onClick={onBack}>
                <i className="left chevron icon"></i>Back
            </div>
            </div>
            <div className="sixteen wide mobile ten wide computer column">
            <div id="game-launch"></div>
            </div>
            <div className="sixteen wide mobile three wide computer column"></div>
        </div>
        </div>
  );
};

export default PlayVideo;
