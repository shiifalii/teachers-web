import { call, put } from 'redux-saga/effects';
import { logoutAndRedirectOnSessionExpiry } from './comman.helper';

const defaultExtractor = (data: any) => data.data.list;

export default function createSaga(reducerName: string) {
  return function*(
    apiFunction: (...args: any[]) => {},
    apiParams: any,
    extractor: any = defaultExtractor,
    customAction?: any,
  ) {
    try {
      yield put({
        type: `${reducerName}/${reducerName}Loading`,
        payload: null,
      });
      const response = yield call(apiFunction, apiParams);
      if (response.data.code === 200) {
        yield put({
          type: `${reducerName}/${reducerName}Loaded`,
          payload: extractor(response.data),
        });
        if (customAction) {
          yield put({
            type: `${customAction.type}`,
            payload: extractor(customAction.payload),
          });

          // customAction.type(customAction.payload)
        }
      } else {
        yield put({
          type: `${reducerName}/${reducerName}Error`,
          payload: response.data.message,
        });
      }
    } catch (e) {
      // check is user authorized?
      if (e && e.response && e.response.data.code === 401) {
        logoutAndRedirectOnSessionExpiry(e.response.data.message);
        return '';
      } else {
        yield put({
          type: `${reducerName}/${reducerName}Failed`,
          payload: e.message,
        });
      }
    }
  };
}
