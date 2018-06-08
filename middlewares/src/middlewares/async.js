export default ({ dispatch }) => next => action => {

  if (!action.payload || !action.payload.then) {
    debugger
    return next(action)
  }

  action.payload.then((response) => {
    debugger
    const newAction = { ...action, payload: response }
    dispatch(newAction)
  })
}