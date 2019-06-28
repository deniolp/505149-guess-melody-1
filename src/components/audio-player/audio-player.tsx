import * as React from 'react';

import withAudio from '../../hocs/with-audio/with-audio';

interface Props {
  isLoading: boolean,
  isPlaying: boolean,
  onPlayButtonClick: () => void,
  renderAudio: () => React.ReactElement,
  src: string,
}

class AudioPlayer extends React.PureComponent<Props, null> {
  render() {
    const {isLoading, isPlaying, renderAudio, onPlayButtonClick} = this.props;

    return (
      <React.Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          {renderAudio()}
        </div>
      </React.Fragment>
    );
  }
}

export {AudioPlayer};

export default withAudio(AudioPlayer);
