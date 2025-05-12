/* eslint-disable no-unused-vars */
import api from "@/Api/api";
import {
  CHAT_BOT_FAILURE,
  CHAT_BOT_REQUEST,
  CHAT_BOT_SUCCESS,
} from "./ActionTypes";

export const sendMessage = ({prompt,jwt}) => async (dispatch) => {
  dispatch({
    type: CHAT_BOT_REQUEST,
    payload:{prompt,role:"user"}
  });

  try {
    const { data } = await api.post("/chat/bot/coin", {prompt},{
      headers:{
        Authorization:`Bearer ${jwt}`
      }
    });
    dispatch({
      type: CHAT_BOT_SUCCESS,
      payload: {ans:data.message,role:"model"},
    });
    console.log("get success ans",data)
  } catch (error) {
    dispatch({ type: CHAT_BOT_FAILURE, payload: error });
    console.log(error);
  }
};
