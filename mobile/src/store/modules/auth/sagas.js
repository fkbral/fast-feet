import { takeLatest, all, call, put } from 'redux-saga/effects';
import { signInFailure, signInSuccess } from './actions';
import { Alert } from 'react-native';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, `/deliverymen/${id}`);

    if (response) {
      yield put(signInSuccess(response.data));
    }
  } catch (error) {
    Alert.alert('Nenhum entregador foi encontrado com este ID');
    yield put(signInFailure());
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
