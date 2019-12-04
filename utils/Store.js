import { createStore, combineReducers } from 'redux'
import ConfigReducer from './../reducers/ConfigReducer'
import CurrentCardReducer from './../reducers/CurrentCardReducer'
import UserInfoReducer from './../reducers/UserInfoReducer'

const store = createStore(
    combineReducers({
      config: ConfigReducer,
      currentCard: CurrentCardReducer,
      userInfo: UserInfoReducer
    })
  )

export default store;