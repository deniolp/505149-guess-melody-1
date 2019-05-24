import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AudioPlayer} from '../audio-player/audio-player';

Enzyme.configure({adapter: new Adapter()});

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/0/06/United_States_Navy_Band_-_Der_er_et_yndigt_land.ogg`,
};

let clickHandler;
let audioPlayer;
let playButton;

beforeEach(() => {
  clickHandler = jest.fn();
  audioPlayer = shallow(
      <AudioPlayer
        src={mock.src}
        isPlaying={false}
        isLoading={true}
        onPlayButtonClick={clickHandler}
        renderAudio={jest.fn()}
      />);
  playButton = audioPlayer.find(`.track__button`);
  window.HTMLMediaElement.prototype.pause = () => {};
});

it(`Click on button makes isPlaying changed`, () => {
  expect(playButton.hasClass(`track__button--play`)).toEqual(true);
  expect(clickHandler).toHaveBeenCalledTimes(0);

  playButton.simulate(`click`);
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
