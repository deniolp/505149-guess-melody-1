import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AudioPlayer from '../audio-player/audio-player';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/f/f4/Irish_national_anthem%2C_performed_by_the_United_States_Navy_Band.wav`,
};

let clickHandler;
let audioPlayer;
let playButton;

beforeEach(() => {
  clickHandler = jest.fn();
  audioPlayer = mount(
      <AudioPlayer
        src={mock.src}
        isPlaying={false}
        onPlayButtonClick={clickHandler}
      />);
  playButton = audioPlayer.find(`.track__button`);
  window.HTMLMediaElement.prototype.pause = () => {};
});

it(`Click on button makes isPlaying changed`, () => {
  audioPlayer.setState({isLoading: false});

  playButton.simulate(`click`, {preventDefault() {}});
  audioPlayer.update();

  expect(audioPlayer.state(`isPlaying`)).toEqual(true);

  playButton.simulate(`click`, {preventDefault() {}});
  audioPlayer.update();
  expect(audioPlayer.state(`isPlaying`)).toEqual(false);
});
