import * as actions from '../actions/types'

const initialState = {
  expenseEditData: {},
  expenseList: [],
  items : []
}

export default function expenseReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_EXPENSE_FULFILLED:
      return state = {...state, expenseList: action.payload.data,items:action.payload.data}
    case actions.GET_EXPENSE_FULFILLED:
      return state = {...state, expenseEditData: action.payload.data}
    case actions.SEARCH_EXPENSE_FULFILLED:
      return state = {...state, expenseList: action.payload.data}
    case actions.MYSEARCHOPTION:
        return state = {...state, expenseList: action.payload.data}
    default:
      return state
  }
}
