import MockAdapter from 'axios-mock-adapter';

import {Operation} from './data';
import {createAPI} from '../../api';

describe(`Reducer works correctly: `, () => {
  it(`should make correct API call to /questions`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadQuestions();

    apiMock.onGet(`/questions`).reply(200, [{a: true}]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: `LOAD_QUESTIONS`,
          payload: [{a: true}],
        });
      });
  });
});
