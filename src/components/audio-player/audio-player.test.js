import React from 'react';
import renderer from 'react-test-renderer';
import {AudioPlayer} from '../audio-player/audio-player';

describe(`AudioPlayer`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<AudioPlayer
      src={`https://upload.wikimedia.org/wikipedia/commons/0/06/United_States_Navy_Band_-_Der_er_et_yndigt_land.ogg`}
      isPlaying={false}
      isLoading={true}
      onPlayButtonClick={jest.fn()}
      renderAudio={jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
