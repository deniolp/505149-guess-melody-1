import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArtistQuestionScreen from './artist-question-screen';

configure({adapter: new Adapter()});

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
    ]
  },
};
let artistQuestion;
let onAnswer;

beforeEach(() => {
  const {question} = mocks;
  onAnswer = jest.fn();

  artistQuestion = mount(
      <ArtistQuestionScreen
        question={question}
        gameTime={2}
        errorCount={3}
        onAnswer={onAnswer}
      />
  );
});

describe(`When user clicked`, () => {
  it(`first option, onAnswer should be called`, () => {

    artistQuestion.find(`.game__artist`).simulate(`change`, {
      target: {value: `artist-0`},
    });
    expect(onAnswer).toHaveBeenCalledTimes(1);
  });

  it(`second option, onAnswer should be called`, () => {

    artistQuestion.find(`.game__artist`).simulate(`change`, {
      target: {value: `artist-1`},
    });
    expect(onAnswer).toHaveBeenCalledTimes(1);
  });
});
