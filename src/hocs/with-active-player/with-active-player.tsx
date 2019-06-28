import React, {PureComponent} from 'react';

import AudioPlayer from '../../components/audio-player/audio-player';

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };

      this._getWrappedAudioPlayer = this._getWrappedAudioPlayer.bind(this);
    }

    render() {
      return <Component
        {...this.props}
        renderPlayer={(item, index) => this._getWrappedAudioPlayer(item, index)}
      />;
    }

    _getWrappedAudioPlayer(item, index) {
      const {activePlayer} = this.state;

      return <AudioPlayer
        src={item.src}
        isPlaying={index === activePlayer}
        onPlayButtonClick={() => this.setState({
          activePlayer: activePlayer === index ? -1 : index,
        })}
      />;
    }
  }

  return WithActivePlayer;
};

export default withActivePlayer;
