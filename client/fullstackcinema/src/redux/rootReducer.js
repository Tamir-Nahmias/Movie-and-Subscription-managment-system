// import { combineReducers } from "redux";

import { SET_CONNECTED_USER, SET_ROLE_ADMIN, SET_TOKEN } from "../utils/consts";

const initialState = {
  connectedUserDetails: {
    id: 0,
    permissions: [],
    firstname: "",
    lastname: "",
    createdDate: "",
    sessionTimeOut: 0,
  },
  token: "",
  role: "user",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONNECTED_USER:
      return {
        ...state,
        connectedUserDetails: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_ROLE_ADMIN:
      return {
        ...state,
        role: "admin",
      };
    default:
      return state;
  }
};

export default reducer;
