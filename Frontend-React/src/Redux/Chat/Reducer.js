import { CHAT_BOT_FAILURE } from "./ActionTypes";
import { CHAT_BOT_SUCCESS } from "./ActionTypes";
import { CHAT_BOT_REQUEST } from "./ActionTypes";

const initialState = {
  message: null,
  messages: [],
  loading: false,
  error: null,
};

const chatBotReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_BOT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        messages:[...state.messages, action.payload]
      };
    case CHAT_BOT_SUCCESS:
      return {
        ...state,
        message: action.payload,
        messages:[...state.messages,action.payload],
        loading: false,
        error: null,
      };

    case CHAT_BOT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default chatBotReducer;
