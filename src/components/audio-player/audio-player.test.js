import React from 'react';
import renderer from 'react-test-renderer';
import AudioPlayer from '../audio-player/audio-player';

describe(`AudioPlayer`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<AudioPlayer
      src={`path.mp3`}
      isPlaying={true}
      onPlayButtonClick={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
