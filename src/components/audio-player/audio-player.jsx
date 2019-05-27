import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import withAudio from '../../hocs/with-audio/with-audio';

class AudioPlayer extends PureComponent {
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

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  src: PropTypes.string.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  renderAudio: PropTypes.func.isRequired,
};

export {AudioPlayer};

export default withAudio(AudioPlayer);
