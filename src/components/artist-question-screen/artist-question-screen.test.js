import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen';

const mocks = {
  question: {
    type: `artist`,
    song: {
      artist: `Jim`,
      src: `path.mp3`,
    },
    answers: [
      {
        picture: `path.jpg`,
        artist: `John`,
      },
      {
        picture: `path.jpg`,
        artist: `Jack`,
      },
      {
        picture: `path.jpg`,
        artist: `Jim`,
      },
    ],
  }
};

describe(`ArtistQuestionScreen`, () => {
  it(`renders correctly`, () => {
    const {question} = mocks;
    const tree = renderer.create(<ArtistQuestionScreen
      question={question}
      gameTime={2}
      mistakes={2}
      onAnswer={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
