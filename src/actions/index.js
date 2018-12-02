export const ADD_REMINDER = 'ADD_REMINDER';
export const UPDATE_REMINDER = 'UPDATE_REMINDER';
export const DELETE_REMINDER = 'DELETE_REMINDER';
export const SELECT_REMINDER = 'SELECT_REMINDER';
export const CLOSE_INPUT = 'CLOSE_INPUT';
export const OPEN_INPUT = 'OPEN_INPUT';

export function addReminder(data) {
  return dispatch => {
    dispatch({
      type: ADD_REMINDER,
      payload: data
    })
  }
}

export function updateReminder(data) {
  return dispatch => {
    dispatch({
      type: UPDATE_REMINDER,
      payload: data
    })
  }
}

export function deleteReminder(id) {
  return dispatch => {
    dispatch({
      type: DELETE_REMINDER,
      payload: id
    })
  }
}

export function selectReminder(data) {
    console.log(data)
  return dispatch => {
    dispatch({
      type: SELECT_REMINDER,
      payload: data
    })
  }
}

// export function closeInput() {
//   return dispatch => {
//     dispatch({
//       type: CLOSE_INPUT
//     })
//   }
// }

export function openInput(date) {
    return dispatch => {
      dispatch({
        type: OPEN_INPUT,
        payload: date
      })
    }
  }