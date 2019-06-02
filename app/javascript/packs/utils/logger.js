export default store => next => action => {
  /* eslint-disable no-console */
  console.group(action.type);
  console.info("previous state", store.getState());
  console.info("dispatching", action);
  let result = next(action);
  console.log("next state", store.getState());
  console.groupEnd();
  return result;
};
