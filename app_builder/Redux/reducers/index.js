import {combineReducers} from 'redux'

import clockReducer from './clockReducer'

const rootReducer = combineReducers({

    clock:clockReducer,

})

export default rootReducer