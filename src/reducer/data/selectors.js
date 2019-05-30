import {createSelector} from 'reselect';
import NameSpace from '../name-spaces';

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => questions.filter((it) => it.type === `genre`)
);

export const getArtistQuestions = createSelector(
    getQuestions,
    (questions) => questions.filter((it) => it.type === `artist`)
);
