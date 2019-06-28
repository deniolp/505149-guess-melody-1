import * as React from 'react';
import {Subtract} from 'utility-types';

import AudioPlayer from '../../components/audio-player/audio-player';

interface State {
  activePlayer: number,
}
interface InjectedProps {
  renderPlayer: (song: {src: string}, id: number) => typeof AudioPlayer,
}

const withActivePlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;
  class WithActivePlayer extends React.PureComponent<T, State> {
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
