import { 
  LOGIN_USER, 
  CURRENT_STEP, 
  GAME_RESULT,
} from './action_type';

const defaultState = {
  login_user: [],
  current_home: 'Home',

}

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        login_user: [...state.login_user.concat(action.payload)]
      }
    case CURRENT_STEP:
      return {
        ...state,
        current_home: action.payload
      };

    case GAME_RESULT:
      return {
        ...state,
        event_setting_flag: action.payload
      };
  }
}