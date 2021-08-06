import userReducer from './userReducer'
import HomePageReducer from './homePageReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
    user: userReducer,
    homePage: HomePageReducer
})

export default reducers