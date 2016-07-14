import {combineReducers} from 'redux'

import clockReducer from './clockReducer'
import pieReducer from './pieReducer'

const rootReducer = combineReducers({

    clockState:clockReducer,
    pieState:pieReducer
})

export default rootReducer