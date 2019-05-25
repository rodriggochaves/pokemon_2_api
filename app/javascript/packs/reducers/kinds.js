export default (state = [], action) => {
  switch (action.type) {
    case "LIST_KINDS":
      return action.kinds;

    default:
      return state;
  }
};
