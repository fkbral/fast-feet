import { produce } from 'immer';

const INITIAL_STATE = {
  profile: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        const names = action.payload.profile.name.split(' ');
        const initials =
          names && names[0] && names[1] ? names[0][0] + names[1][0] : '';

        draft.profile = action.payload.profile;
        draft.profile.initials = initials;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
        return state;
    }
  });
}
