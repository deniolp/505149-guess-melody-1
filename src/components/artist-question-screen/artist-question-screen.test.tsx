import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {ArtistQuestionScreen} from './artist-question-screen';
import {Type} from "../../types";

const mocks = {
  question: {
    type: Type.ARTIST,
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
      renderPlayer={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
