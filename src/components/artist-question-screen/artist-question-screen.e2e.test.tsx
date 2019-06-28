import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import {ArtistQuestionScreen} from './artist-question-screen';
import {Type} from "../../types";

Enzyme.configure({adapter: new Adapter()});

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
    ]
  },
};
let artistQuestion;
let onAnswer;
let inputs;

beforeEach(() => {
  const {question} = mocks;
  onAnswer = jest.fn();

  artistQuestion = Enzyme.mount(
      <ArtistQuestionScreen
        question={question}
        gameTime={2}
        onAnswer={onAnswer}
        mistakes={1}
        renderPlayer={jest.fn()}
      />
  );
  inputs = artistQuestion.find(`input`);
});

describe(`When user clicked`, () => {
  it(`first option, onAnswer should be called and right value should be thrown to the callback`, () => {

    inputs.at(0).simulate(`click`, {
      preventDefault() {}
    });
    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toBeCalledWith({
      picture: `path.jpg`,
      artist: `John`,
    });
  });

  it(`second option, onAnswer should be called and right value should be thrown to the callback`, () => {

    inputs.at(1).simulate(`click`, {
      preventDefault() {}
    });
    expect(onAnswer).toHaveBeenCalledTimes(1);
    expect(onAnswer).toBeCalledWith({
      picture: `path.jpg`,
      artist: `Jack`,
    });
  });
});
