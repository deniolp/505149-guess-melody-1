import * as React from 'react';

interface Props {
  isPlaying: boolean,
  onPlayButtonClick: () => void,
  src: string,
}

interface State {
  progress: number,
  isLoading: boolean,
  isPlaying: boolean,
}

const withAudio = ((Component) => {
  class WithAudio extends React.PureComponent<Props, State> {
    private _audioRef: React.RefObject<HTMLAudioElement>;
    constructor(props) {
      super(props);

      this._audioRef = React.createRef();

      this.state = {
        progress: 0,
        isLoading: true,
        isPlaying: props.isPlaying,
      };

      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
      this._renderAudio = this._renderAudio.bind(this);
    }

    render() {
      const {isLoading, isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          renderAudio={this._renderAudio}
          onPlayButtonClick={this._onPlayButtonClick}
        />
      );
    }

    componentDidMount() {
      const {src} = this.props;
      const audio = this._audioRef.current;

      audio.src = src;
      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;
      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;
      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    _onPlayButtonClick() {
      this.props.onPlayButtonClick();
      this.setState({isPlaying: !this.state.isPlaying});
    }

    _renderAudio() {
      return <audio
        ref={this._audioRef}
      />;
    }
  }

  return WithAudio;
});

export default withAudio;
