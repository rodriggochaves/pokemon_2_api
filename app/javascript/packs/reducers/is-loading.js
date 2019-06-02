import types from "packs/actions/types";

const isLoading = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_LOADING:
      return true;

    case types.HIDE_LOADING:
      return false;

    default:
      return state;
  }
};

export default isLoading;
