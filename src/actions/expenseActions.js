import * as actions from './types'
import API from '../api'
import {notify} from 'reapop';

export const getAllExpense = (id) => {
  return (dispatch) => {
    dispatch({type: actions.GET_ALL_EXPENSE_PENDING})
    API.get('/expense/all/')
      .then(res => dispatch({type: actions.GET_ALL_EXPENSE_FULFILLED, payload: res}))
      .catch(err => {
        dispatch({type: actions.GET_ALL_EXPENSE_REJECTED, payload: err})
        dispatch(notify({message: 'Error occurred while fetching data', status: 'error'}));
      })
  }
}

export const getExpense = (expenseId) => {
  return (dispatch) => {
    dispatch({type: actions.GET_EXPENSE_PENDING})
    API.get(`/expense/${expenseId}`)
      .then(res => dispatch({type: actions.GET_EXPENSE_FULFILLED, payload: res}))
      .catch(err => {
        dispatch({type: actions.GET_EXPENSE_REJECTED, payload: err})
        dispatch(notify({message: 'Error occurred while fetching data', status: 'error'}));
      })
  }
}

export const searchExpense = (expenseKey) => {
  return (dispatch) => {
    dispatch({type: actions.SEARCH_EXPENSE_PENDING})
    API.get(`/expense/search`)
      .then(res => dispatch({type: actions.SEARCH_EXPENSE_FULFILLED, payload: res}))
      .catch(err => {
        dispatch({type: actions.SEARCH_EXPENSE_REJECTED, payload: err})
        dispatch(notify({message: 'Error occurred while fetching data', status: 'error'}));
      })
  }
}
export const mySearchOption = (value) => {
    return { type: actions.MYSEARCHOPTION, payload: value };
}