import api from "@/Api/api";
import * as types from "./ActionTypes";

// Action Creators
export const getAssetById =
  ({ assetId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_ASSET_REQUEST });

    try {
      const response = await api.get(`/api/assets/${assetId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_ASSET_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: types.GET_ASSET_FAILURE,
        error: error.message,
      });
    }
  };

  export const getAssetDetails =
  ({ coinId, jwt }) =>
  async (dispatch) => {
    dispatch({ type: types.GET_ASSET_DETAILS_REQUEST });

    try {
      const response = await api.get(`/api/assets/coin/${coinId}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      dispatch({
        type: types.GET_ASSET_DETAILS_SUCCESS,
        payload: response.data,
      });
      console.log("asset details --- ",response.data)
    } catch (error) {
      dispatch({
        type: types.GET_ASSET_FAILURE,
        error: error.message,
      });
    }
  };

export const getUserAssets = (jwt) => async (dispatch) => {
  dispatch({ type: types.GET_USER_ASSETS_REQUEST });

  try {
    const response = await api.get("/api/assets", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    dispatch({
      type: types.GET_USER_ASSETS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_USER_ASSETS_FAILURE,
      error: error.message,
    });
  }
};
``;
