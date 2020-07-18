import {combineReducers} from 'redux'
import UserAuthReducer from '../reducers/User/Auth/AuthReducer'
import UserProfileReducer  from '../reducers/User/ProfileReducer'

const RootReducer = combineReducers({
  userAuth:UserAuthReducer,
  userProfile: UserProfileReducer,
})

export default RootReducer

