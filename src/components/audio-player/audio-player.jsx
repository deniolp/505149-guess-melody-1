import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audio = new Audio(this.props.src);
    this.state = {
      progress: this._audio.currentTime,
      isLoading: true,
      isPlaying: false,
    };

    this._audio.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    this._audio.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    this._audio.onpause = () => this.setState({
      isPlaying: false,
    });

    this._audio.ontimeupdate = () => this.setState({
      progress: this._audio.currentTime,
    });

    this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.shape.isRequired,
};

export default AudioPlayer;
