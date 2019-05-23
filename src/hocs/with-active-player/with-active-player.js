import React, {PureComponent} from 'react';

import AudioPlayer from '../../components/audio-player/audio-player';
import withAudio from '../with-audio/with-audio';

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };
    }

    render() {
      const {activePlayer} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(item, index) => {
          return <AudioPlayerWrapped
            src={item.src}
            isPlaying={index === activePlayer}
            onPlayButtonClick={() => this.setState({
              activePlayer: activePlayer === index ? -1 : index,
            })}
          />;
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
